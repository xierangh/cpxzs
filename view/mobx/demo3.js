

import {observable,computed,autorun} from 'mobx'

export default function demo() {
    const value = observable({
        foo:0,
        bar:0,
        get condition(){
            return this.foo<0;
        }
    });

    autorun(()=>{
        console.log(`value.foo is ${value.foo} }`)
    })

    autorun(()=>{
        console.log(`condition is ${value.condition} }`)
    })

    value.foo=(2);
    value.foo=(3);
    value.foo = (-8);

    value.bar = 1;
    value.bar = 2;
}