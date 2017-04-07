/**
 * 遗漏助手数据处理中心
 */

import Utils from './../../Utils'
import { observable,action,computed } from 'mobx';

var instance;

var result_empty={"todayAppearCount":0,"historyOmissionCount":0,"todayAppearPeriod":"","threeMonthAppearCount":0,"todayOmissionMaxCount":0,
    "lastTimeAppearPeriod":"","omissionDayCount":0,"averangeAppearPercent":"0","currentOmissionCount":0,"success":true}
class YilouModel{

    constructor() {
        if(!instance){
            instance = this;
        }
        return instance;
    }

    @observable
    omissonType={name:'单式遗漏',value:1,url:'omission/omissionHistoryQuery'}

    @observable
    subType={name:'前二遗漏',value:1,wei:'wanQian',abc:'a,b',type:2}

    //查询结果
    @observable
    result=result_empty

    @action
    setOmissonType(omissonType){
        this.omissonType = omissonType;
        this.result=result_empty;
    }

    @action
    setSubType(subType){
        this.subType = subType;
        this.result=result_empty;
    }

    @action
    setResultEmpty(){
        this.result=result_empty;
    }

    doquery(params){
        this.result=result_empty;
        Utils.getWithParams(this.omissonType.url,params)
            .then((data)=>{
                if(!data){
                    return;
                }
                console.log(JSON.stringify(data));
                this.result = data;
            })
    }
}

export default YilouModel