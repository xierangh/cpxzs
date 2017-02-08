
import React from 'react'
import Utils from './../Utils'

let instance = null;
var nextPeriodStr='';
var seconds=0;
var callbacks=[];

export default class NextPeriod extends React.Component{
  constructor() {
    super();
    if(!instance){
      instance = this;
      this.queryTime();
    }
    this.state={
      url:'192.168.0.211:9002',
    }
    return instance;
  }

  addCallback(view:object){
    var tmp = [];
    tmp.push(view);
    this.callbacks= tmp;
    // view.setNextPeroid(this.nextPeriodStr,this.seconds);
  }

  freshViews(){
    console.log(this.callbacks.length);
    for (var i in this.callbacks) {
      // console.log(i);
      this.callbacks[i].setNextPeroid(this.nextPeriodStr,this.seconds);
    }
  }

  queryTime(){
    if (!Utils.online) {
      return;
    }
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
          console.log("this.props.refresh");
        }
      },
      1000
    );
  }
}
