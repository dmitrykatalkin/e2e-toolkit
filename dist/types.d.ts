export interface E2EHelpersConfig {
    customSelectorAttr?: string;
    customSelectorParamAttrPrefix?: string;
    customSelectorPrefix?: string;
    pseudoSelectorPrefix?: string;
    pseudoSelectorMap?: Record<string, string>;
}
export function e2eHelpersFactory(config: E2EHelpersConfig): {
    r: ((parts: TemplateStringsArray, values?: any[] | undefined) => RegExp) & ((values: [urlPattern: string]) => RegExp);
    q: ((parts: TemplateStringsArray, values?: any[] | undefined) => string) & ((values: [rawQuery: any]) => string);
};

//# sourceMappingURL=types.d.ts.map
