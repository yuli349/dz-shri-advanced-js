class MySet {
    [Symbol.toStringTag] = 'MySet';
    constructor(arr) {
        this.collection = [];
        this.size = 0;
        if (!arr) {
            return;
        }
        arr.forEach(element => this.add(element))
    }

    [Symbol.iterator]() {
        const size = this.size;
        const values = this.collection;
        return {
            current: 0,
            last: size - 1,
            next() {
                if (this.current <= this.last) {
                    return { done: false, value: values[this.current++] }
                } else {
                    return { done: true }
                }
            }
        }
    }

    has(element) {
        return this.collection.includes(element);
    }

    add(element) {
        if (!this.has(element)) {
            this.collection.push(element);
            this.size++;
        }
    }

    delete(element) {
        const index = this.collection.findIndex((el) => el === element)
        if (index !== -1) {
            this.collection.splice(index, 1);
            this.size--;
        }
        return;
    }

    keys() {
        return this.collection;
    }

    entries() {
        return this.collection.map((value) => [value, value]);
    }

    values() {
        return this.collection;
    }

    clear() {
        this.collection = [];
        this.size = 0;
    }

    toString() {
        return '[object MySet]';
    }

    valueOf() {
        return this;
    }

    toPrimitive() {
        return this.collection;
    }

    forEach(cb, context) {
        if (!context) {
            this.collection.forEach(cb);
        } else {
            this.collection.forEach(cb.bind(context))
        }
    }
}

// тесты
const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

// хранит только уникальные значения
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log(set.size); // 6

// работает в цикле for-of
for (const item of set) {
    console.log(item); // 4 8 15 16 23 42
}

// есть методы keys, values, entries
for (const item of set.entries()) {
    console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}

// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
    getValue () { return this.value }
}

const data = {
    value: 42
}

// есть метод add
set.add(object);
set.add(data);

// есть метод delete
set.delete(data);

// есть метод has
console.log(set.has({})); // false
console.log(set.has(object)); // true
console.log(set.has(data)); // false

// и кое-что еще
console.log(set === set.valueOf()) // true
console.log(String(set)) // [object MySet]
console.log(Object.prototype.toString.call(set)) // [object MySet]

// задание со звездочкой *
// есть forEach, который делает какие-то странные вещи...
set.forEach(function (item) {
    console.log(item.getValue.call(this)); // 42
}, data)