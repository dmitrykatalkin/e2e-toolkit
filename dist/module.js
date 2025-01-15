const $5321696df4239910$export$ccfa95e9c29e6e31 = {
    customSelectorAttr: "data-test-id",
    customSelectorParamAttrPrefix: "data-test-",
    customSelectorPrefix: "%",
    pseudoSelectorPrefix: "%%",
    pseudoSelectorMap: {},
    _customSelectorPrefixEscaped: "",
    _pseudoSelectorPrefixEscaped: ""
};


function $672b1d26538218f6$export$c1fdfb880e73617c(config1, config2) {
    return Object.entries(config2).reduce(mergeReducer, {
        ...config1
    });
    ///
    function mergeReducer(config, [key, value]) {
        if (value !== undefined) config[key] = value;
        return config;
    }
}


const $f438adac0ca168ae$var$charsToEscape = ".+*?^$()[]{}|\\";
function $f438adac0ca168ae$export$4e7f196112fea3c5(rawStr) {
    return rawStr.replaceAll(new RegExp(`[${$f438adac0ca168ae$var$charsToEscape}]`, "g"), "\\$&");
}


function $086f7bbd96a20819$export$534b683f99f34047(fn, ctx) {
    return function wrapper(...args) {
        const [firstArg] = args;
        const isTagFunction = Array.isArray(firstArg) && "raw" in firstArg;
        if (isTagFunction) {
            const [parts, ...values] = args;
            const value = $086f7bbd96a20819$var$compileTemplateString(parts, values);
            return fn.apply(ctx, [
                value
            ]);
        }
        return fn.apply(ctx, args);
    };
}
///
function $086f7bbd96a20819$var$compileTemplateString(parts, values = []) {
    return parts.reduce(partsReducer, "");
    function partsReducer(res, part, index) {
        return res + part + (values[index] ?? "");
    }
}




function $77e833c425b2c28b$export$876ecb227286a9ba(urlPattern) {
    const patternStr = urlPattern.replace(/(^|\/)\*\*(\/|$)/g, "$1.+$2").replace("*", "[^/]+").replace(/:([a-z_]+)(?:<([^>]+)>)?/gi, paramsReplacer);
    return new RegExp(`^${patternStr}$`);
    ///
    function paramsReplacer(match, name, rule) {
        const defaultRule = "[^/]+";
        return `(?<${name}>${rule ?? defaultRule})`;
    }
}


function $03e04040a8c30432$export$c24a07e0eea944dc(rawQuery) {
    const { customSelectorAttr: customSelectorAttr, customSelectorParamAttrPrefix: customSelectorParamAttrPrefix, customSelectorPrefix: customSelectorPrefix, _customSelectorPrefixEscaped: _customSelectorPrefixEscaped, pseudoSelectorPrefix: pseudoSelectorPrefix, _pseudoSelectorPrefixEscaped: _pseudoSelectorPrefixEscaped, pseudoSelectorMap: pseudoSelectorMap } = this;
    if (typeof rawQuery !== "string" || !rawQuery.includes(customSelectorPrefix) && !rawQuery.includes(pseudoSelectorPrefix)) return rawQuery;
    const customSelectorRegExp = new RegExp(`${_customSelectorPrefixEscaped}([a-z0-9_\\-]+)`, "gi");
    const customParamsRegExp = new RegExp(`${_customSelectorPrefixEscaped}\\(([^)]+)\\)`, "gi");
    return (rawQuery.includes(pseudoSelectorPrefix) ? parsePseudoSelectors(rawQuery, pseudoSelectorMap) : rawQuery).replace(customSelectorRegExp, `[${customSelectorAttr}="$1"]`).replace(customParamsRegExp, paramsReplacer);
    ///
    function parsePseudoSelectors(rawQuery, pseudoSelectorMap) {
        const pseudoRegExp = new RegExp(`${_pseudoSelectorPrefixEscaped}(?<pseudoSelector>[a-z0-9_\-]+)(=(?<name>("[^"]+")|([a-z0-9_\-]+)))?`, "gi");
        return rawQuery.replaceAll(pseudoRegExp, pseudoSelectorReplacer);
        ///
        function pseudoSelectorReplacer(...args) {
            const groups = args.at(-1);
            const { pseudoSelector: pseudoSelector, name: name } = groups;
            if (name) {
                const selector = pseudoSelectorMap[`${pseudoSelector}=$name`];
                if (!selector) throw `Unknown pseudo-selector ${pseudoSelector}=$name`;
                return selector.replace("$name", name);
            }
            const selector = pseudoSelectorMap[pseudoSelector];
            if (!selector) throw `Unknown pseudo-selector ${pseudoSelector}`;
            return pseudoSelectorMap[pseudoSelector];
        }
    }
    function paramsReplacer(substring, paramsStr) {
        return paramsStr.split(",").map((param)=>param.trim().split("=")).reduce(paramsReducer, "");
        ///
        function paramsReducer(result, paramsTuple) {
            const [name, value] = paramsTuple;
            return result + `[${customSelectorParamAttrPrefix}${name}=${value}]`;
        }
    }
}


function $149c1bd638913645$export$fa61821cd4e1a50e(config) {
    const mergedCtx = (0, $672b1d26538218f6$export$c1fdfb880e73617c)((0, $5321696df4239910$export$ccfa95e9c29e6e31), {
        customSelectorAttr: config.customSelectorAttr,
        customSelectorParamAttrPrefix: config.customSelectorParamAttrPrefix,
        customSelectorPrefix: config.customSelectorPrefix,
        pseudoSelectorPrefix: config.pseudoSelectorPrefix,
        pseudoSelectorMap: config.pseudoSelectorMap
    });
    const ctx = {
        ...mergedCtx,
        _customSelectorPrefixEscaped: (0, $f438adac0ca168ae$export$4e7f196112fea3c5)(mergedCtx.customSelectorPrefix),
        _pseudoSelectorPrefixEscaped: (0, $f438adac0ca168ae$export$4e7f196112fea3c5)(mergedCtx.pseudoSelectorPrefix)
    };
    return {
        r: (0, $086f7bbd96a20819$export$534b683f99f34047)((0, $77e833c425b2c28b$export$876ecb227286a9ba), ctx),
        q: (0, $086f7bbd96a20819$export$534b683f99f34047)((0, $03e04040a8c30432$export$c24a07e0eea944dc), ctx)
    };
}


export {$149c1bd638913645$export$fa61821cd4e1a50e as e2eHelpersFactory};
//# sourceMappingURL=module.js.map
