import { HelperContext } from '../helpers.context';

export function parseCustomQuery(this: HelperContext, rawQuery: any): string {
    const {
        customSelectorAttr, customSelectorParamAttrPrefix,
        customSelectorPrefix, _customSelectorPrefixEscaped,
        pseudoSelectorPrefix, _pseudoSelectorPrefixEscaped,
        pseudoSelectorMap
    } = this;

    if (typeof rawQuery !== 'string' ||
        !rawQuery.includes(customSelectorPrefix) && !rawQuery.includes(pseudoSelectorPrefix)) {
        return rawQuery;
    }

    const customSelectorRegExp = new RegExp(
        `${_customSelectorPrefixEscaped}([a-z0-9_\\-]+)`,
        'gi'
    );

    const customParamsRegExp = new RegExp(
        `${_customSelectorPrefixEscaped}\\(([^)]+)\\)`,
        'gi'
    );

    return (rawQuery.includes(pseudoSelectorPrefix) ? parsePseudoSelectors(rawQuery, pseudoSelectorMap) : rawQuery)
        .replace(customSelectorRegExp, `[${customSelectorAttr}="$1"]`)
        .replace(customParamsRegExp, paramsReplacer);

    ///

    function parsePseudoSelectors(rawQuery: string, pseudoSelectorMap: Record<string, string>) {
        const pseudoRegExp = new RegExp(
            `${_pseudoSelectorPrefixEscaped}(?<pseudoSelector>[a-z0-9_\-]+)(=(?<name>("[^"]+")|([a-z0-9_\-]+)))?`,
            'gi'
        );

        return rawQuery.replaceAll(pseudoRegExp, pseudoSelectorReplacer);

        ///

        function pseudoSelectorReplacer(...args: any[]) {
            const groups = args.at(-1);
            const {pseudoSelector, name} = groups;

            if (name) {
                const selector = pseudoSelectorMap[`${pseudoSelector}=$name`];
                if (!selector) throw `Unknown pseudo-selector ${pseudoSelector}=$name`;
                return selector.replace('$name', name);
            }

            const selector = pseudoSelectorMap[pseudoSelector];
            if (!selector) throw `Unknown pseudo-selector ${pseudoSelector}`;
            return pseudoSelectorMap[pseudoSelector];
        }
    }

    function paramsReplacer(substring: string, paramsStr: string): string {
        return paramsStr
            .split(',')
            .map(param => param.trim().split('='))
            .reduce(paramsReducer, '');

        ///

        function paramsReducer(result: string, paramsTuple: string[]): string {
            const [name, value] = paramsTuple;
            return result + `[${customSelectorParamAttrPrefix}${name}=${value}]`
        }
    }

}
