import { HelperFunction, HelperContext } from '../helpers.context';

type TagFunction<F extends HelperFunction> = (parts: TemplateStringsArray, values?: any[]) => ReturnType<F>;
type PlainFunction<F extends HelperFunction> = (values: Parameters<F>) => ReturnType<F>;

export function tagDecorator<F extends HelperFunction>
  (fn: F, ctx: HelperContext): TagFunction<F> & PlainFunction<F> {
  return function wrapper(...args): ReturnType<F> {
    const [firstArg] = args;
    const isTagFunction = (
        Array.isArray(firstArg) &&
        'raw' in firstArg
    );

    if (isTagFunction) {
      const [parts, ...values] = args as [TemplateStringsArray, ...any[]];
      const value = compileTemplateString(parts, values);
      return fn.apply(ctx, [value]);
    }

    return fn.apply(ctx, args);
  }
}

///

function compileTemplateString(parts: TemplateStringsArray, values: any[] = []): string {
  return parts.reduce(partsReducer, '');

  function partsReducer(res: string, part: string, index: number) {
    return res + part + (values[index] ?? '');
  }
}
