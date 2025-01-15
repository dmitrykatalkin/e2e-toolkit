import { HelperContext } from '../helpers.context';

export function urlMatcherHelper(this: HelperContext, urlPattern: string): RegExp {
  const patternStr = urlPattern
    .replace(/(^|\/)\*\*(\/|$)/g, '$1.+$2')
    .replace('*', '[^/]+')
    .replace(/:([a-z_]+)(?:<([^>]+)>)?/gi, paramsReplacer);

  return new RegExp(`^${patternStr}$`);

  ///

  function paramsReplacer(match: string, name: string, rule: string): string {
    const defaultRule = '[^/]+';
    return `(?<${name}>${rule ?? defaultRule})`;
  }
}
