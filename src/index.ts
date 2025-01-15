import { HelperContext, defaultHelperContext } from './helpers.context';
import { tagDecorator, extendConfig, escape } from './inner';

import { urlMatcherHelper } from './outer/url-matcher.helper';
import { parseCustomQuery } from './outer/parse-custom-query.helper';

export interface E2EHelpersConfig {
    customSelectorPrefix?: string
    pseudoSelectorPrefix?: string
    pseudoSelectorMap?: Record<string, string>
}

export function e2eHelpersFactory(config: E2EHelpersConfig) {
    const mergedCtx: HelperContext = extendConfig(defaultHelperContext, {
        customSelectorPrefix: config.customSelectorPrefix,
        pseudoSelectorPrefix: config.pseudoSelectorPrefix,
        pseudoSelectorMap: config.pseudoSelectorMap
    });

    const ctx: HelperContext = {
        ...mergedCtx,
        _customSelectorPrefixEscaped: escape(mergedCtx.customSelectorPrefix),
        _pseudoSelectorPrefixEscaped: escape(mergedCtx.pseudoSelectorPrefix)
    }

    return {
        r: tagDecorator(urlMatcherHelper, ctx),
        q: tagDecorator(parseCustomQuery, ctx),
    }
}
