function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "e2eHelpersFactory", () => $882b6d93070905b3$export$fa61821cd4e1a50e);
const $160cba5b7de7cea7$export$ccfa95e9c29e6e31 = {
    customSelectorAttr: "data-test-id",
    customSelectorParamAttrPrefix: "data-test-",
    customSelectorPrefix: "%",
    pseudoSelectorPrefix: "%%",
    pseudoSelectorMap: {},
    _customSelectorPrefixEscaped: "",
    _pseudoSelectorPrefixEscaped: ""
};


function $0af46a6ce5205f66$export$c1fdfb880e73617c(config1, config2) {
    return Object.entries(config2).reduce(mergeReducer, {
        ...config1
    });
    ///
    function mergeReducer(config, [key, value]) {
        if (value !== undefined) config[key] = value;
        return config;
    }
}


const $692da5e1b30dd22f$var$charsToEscape = ".+*?^$()[]{}|\\";
function $692da5e1b30dd22f$export$4e7f196112fea3c5(rawStr) {
    return rawStr.replaceAll(new RegExp(`[${$692da5e1b30dd22f$var$charsToEscape}]`, "g"), "\\$&");
}


function $b150fc18e32cc05b$export$534b683f99f34047(fn, ctx) {
    return function wrapper(...args) {
        const [firstArg] = args;
        const isTagFunction = Array.isArray(firstArg) && "raw" in firstArg;
        if (isTagFunction) {
            const [parts, ...values] = args;
            const value = $b150fc18e32cc05b$var$compileTemplateString(parts, values);
            return fn.apply(ctx, [
                value
            ]);
        }
        return fn.apply(ctx, args);
    };
}
///
function $b150fc18e32cc05b$var$compileTemplateString(parts, values = []) {
    return parts.reduce(partsReducer, "");
    function partsReducer(res, part, index) {
        return res + part + (values[index] ?? "");
    }
}




function $df70b4ef265eea31$export$876ecb227286a9ba(urlPattern) {
    const patternStr = urlPattern.replace(/(^|\/)\*\*(\/|$)/g, "$1.+$2").replace("*", "[^/]+").replace(/:([a-z_]+)(?:<([^>]+)>)?/gi, paramsReplacer);
    return new RegExp(`^${patternStr}$`);
    ///
    function paramsReplacer(match, name, rule) {
        const defaultRule = "[^/]+";
        return `(?<${name}>${rule ?? defaultRule})`;
    }
}


function $c754ece22da35e24$export$c24a07e0eea944dc(rawQuery) {
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


function $882b6d93070905b3$export$fa61821cd4e1a50e(config) {
    const mergedCtx = (0, $0af46a6ce5205f66$export$c1fdfb880e73617c)((0, $160cba5b7de7cea7$export$ccfa95e9c29e6e31), {
        customSelectorAttr: config.customSelectorAttr,
        customSelectorParamAttrPrefix: config.customSelectorParamAttrPrefix,
        customSelectorPrefix: config.customSelectorPrefix,
        pseudoSelectorPrefix: config.pseudoSelectorPrefix,
        pseudoSelectorMap: config.pseudoSelectorMap
    });
    const ctx = {
        ...mergedCtx,
        _customSelectorPrefixEscaped: (0, $692da5e1b30dd22f$export$4e7f196112fea3c5)(mergedCtx.customSelectorPrefix),
        _pseudoSelectorPrefixEscaped: (0, $692da5e1b30dd22f$export$4e7f196112fea3c5)(mergedCtx.pseudoSelectorPrefix)
    };
    return {
        r: (0, $b150fc18e32cc05b$export$534b683f99f34047)((0, $df70b4ef265eea31$export$876ecb227286a9ba), ctx),
        q: (0, $b150fc18e32cc05b$export$534b683f99f34047)((0, $c754ece22da35e24$export$c24a07e0eea944dc), ctx)
    };
}


//# sourceMappingURL=main.js.map
