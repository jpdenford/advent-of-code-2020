
export const matchAllGroups = (regexp: RegExp) => (str: string): string[] =>  [...[...str.matchAll(regexp)][0]]