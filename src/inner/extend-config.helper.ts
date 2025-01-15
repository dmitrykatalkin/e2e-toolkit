export function extendConfig<
    T extends Record<keyof T, any>,
    U extends Partial<T>
>(config1: T, config2: U): T {
    type C2KeyValueTuplet = [keyof T, T[keyof T]];

    return (Object.entries(config2) as Array<C2KeyValueTuplet>)
        .reduce(mergeReducer, { ...config1 } as T);

    ///

    function mergeReducer(config: T, [key, value]: C2KeyValueTuplet): T {
        if (value !== undefined) {
            config[key] = value;
        }
        return config;
    }
}
