

import {observable,computed,autorun} from 'mobx'

export default function demo() {
    const value = observable(0);
    const condition = computed(()=>
        (value.get()>0)
    )
    autorun(()=>{
        console.log(`value is ${condition.get()} }`)
    })

    value.set(2);
    value.set(3);
    value.set(-8);
}