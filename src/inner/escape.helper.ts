const charsToEscape = '.+*?^$()[]{}|\\';

export function escape(rawStr: string): string {
    return rawStr.replaceAll(
        new RegExp(`[${charsToEscape}]`, 'g'),
        '\\$&'
    )
}
