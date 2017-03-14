

import {ObservableMap,autorun} from 'mobx'

export default function demo() {
    const foo = new ObservableMap();

    autorun(() => {
        console.log(`map have  ${foo.size} keys `)
    })

    foo.set('foo', 1);
    foo.set('bar', 2);
    foo.set('boys', 4);

    foo.delete('foo');
}