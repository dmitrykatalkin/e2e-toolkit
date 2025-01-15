export type HelperFunction = (this: HelperContext, ...args: any[]) => any

export interface HelperContext {
    customSelectorAttr: string
    customSelectorParamAttrPrefix: string
    customSelectorPrefix: string
    pseudoSelectorPrefix: string
    pseudoSelectorMap: Record<string, string>
    readonly _customSelectorPrefixEscaped: string
    readonly _pseudoSelectorPrefixEscaped: string
}

export const defaultHelperContext: HelperContext = {
    customSelectorAttr: 'data-test-id',
    customSelectorParamAttrPrefix: 'data-test-',
    customSelectorPrefix: '%',
    pseudoSelectorPrefix: '%%',
    pseudoSelectorMap: {},
    _customSelectorPrefixEscaped: '',
    _pseudoSelectorPrefixEscaped: '',
}
