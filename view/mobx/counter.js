

import {observable,autorun} from 'mobx'

export default function demo1() {
    const value = observable(0);
    autorun(()=>{
        console.log(`value is ${value.get()} `+value.get())
    })

    value.set(2);
    value.set(3);
    value.set(-8);
}