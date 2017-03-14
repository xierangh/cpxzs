
import Utils from './../Utils'
import { observable,action,computed } from 'mobx';

let instance = null;


var oldstate=false;

export default class NextPeriod {

  @observable
  nextPeriodStr='';

  @observable
  seconds=0;

  @observable
  shouldfresh=false;


  @computed
  get getshouldfresh(){
      if (oldstate != this.shouldfresh){
          oldstate = this.shouldfresh;
          return true;
      }
      return false;
  }

  constructor() {
    if(!instance){
      instance = this;
      this.queryTime();
    }
    return instance;
  }

  queryTime(){
    // if (!Utils.online) {
    //   return;
    // }
      console.log('next peroid querytime...');
     Utils.getWithParams('caipiaoNumber/queryNextPeriod')
     .then((data)=>{
           if(!data){
                return;
            }
            //  console.log(JSON.stringify(data))
            var seconds = parseInt(data.hour)*3600 + parseInt(data.minute)*60+parseInt(data.second);
            this.setNextPeroid(data.nextPeriodStr,seconds);
       })
  }

  @action
  setNextPeroid(nps:string,sec:number){
    //首先清空timer
    this.timer && clearTimeout(this.timer);

    this.nextPeriodStr = nps;
    this.seconds = sec;
    console.log(this.nextPeriodStr+"****"+this.seconds);

    this.timer = setInterval(
      () => {
        this.seconds= this.seconds-1;
        if(this.seconds <= 0){
          this.queryTime();
          this.shouldfresh = !this.shouldfresh;
          console.log("this.props.refresh");
        }
      },
      1000
    );
  }
}
