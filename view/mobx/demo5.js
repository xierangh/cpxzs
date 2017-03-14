

import {observable,computed,autorun,action,useStrict} from 'mobx'

// useStrict(true) //强制把操作写在action 里面
class Foo{
    @observable
    selected=0;

    @observable
    items=[];

    @computed
    get selectedItem(){
        if (this.selected >= this.items.length){
            return null;
        }
        return this.items[this.selected];
    }

    @action
    addItem(item){
        this.items.push(item)
    }

    @action
    removeAt(index){
        this.items.splice(index,1);
        if (this.selected>=index){
            this.selected--;
        }
    }

    @action
    removeSelected(){
        this.items.splice(this.selected,1);
    }
}

export default function demo() {

    const foo = new Foo();

    autorun(()=>{
        console.log(`foo selected is ${foo.selectedItem} `)
    })

    foo.addItem(1);
    foo.addItem(2);
    foo.addItem(3);
    foo.addItem(4);

    foo.selected=2;
    foo.removeAt(1);
    foo.removeSelected();
}