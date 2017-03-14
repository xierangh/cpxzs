

import {observable,computed,autorun} from 'mobx'

export default function demo() {
    const value = observable([0]);

    autorun(()=>{
        console.log(`value.length is ${value.length} }`)
    })

    //mobx 不能监听数据某个位置数据是否变化，所以数组进行全部操作都要执行
    // autorun(()=>{
    //     console.log(`value[0] is ${value[0]} }`)
    // })

    const condition = computed(()=>
        (value[0])
    )

    autorun(()=>{
        console.log(`first is ${condition.get()} }`)
    })

    value[0] = 1;
    value.push(2);
    value.push(3);

    //删除数组第一个元素
    value.splice(0,1);
}