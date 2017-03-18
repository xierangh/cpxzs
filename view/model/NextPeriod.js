
import Utils from './../Utils'
import { observable,action,computed } from 'mobx';

import TimerEnhance from 'react-native-smart-timer-enhance'

let instance = null;


var oldstate=false;

class NextPeriod {

  @observable
  nextPeriodStr='';

  @observable
  seconds=0;

  @observable
  shouldfresh=false;


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
  ontimer(){
      this.seconds= this.seconds-1;
      if(this.seconds <= 0){
          this.timer && clearInterval(this.timer);
          this.queryTime();
          this.shouldfresh = true;
          //100ms后修改回去
          setTimeout(()=>{
              this.shouldfresh = false;
          },100)
          console.log("this.props.refresh");
          Utils.showAlert('','this.props.refresh');
      }
  }

  @action
  setNextPeroid(nps:string,sec:number){
    //首先清空timer
    this.timer && clearInterval(this.timer);

    this.nextPeriodStr = nps;
    this.seconds = sec;
    console.log(this.nextPeriodStr+"****"+this.seconds);

    this.timer = setInterval(() => this.ontimer(), 1000);
  }
}

export default TimerEnhance(NextPeriod)
