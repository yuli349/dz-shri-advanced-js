function allKeysAndSymbols(object) {
    const keysAndSymbol = [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];

    let result = [...keysAndSymbol];
    let proto = Object.getPrototypeOf(object);

    while (proto) {
        result = [...result,
            ...Object.getOwnPropertyNames(proto),
            ...Object.getOwnPropertySymbols(proto)
        ];
        proto = Object.getPrototypeOf(proto);
    }
    return result;
}

allKeysAndSymbols({}) // ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", ... ]