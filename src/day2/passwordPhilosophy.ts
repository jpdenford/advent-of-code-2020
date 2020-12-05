import R from "ramda";
import { readFileLines } from "../fileUtils";

const parseLine = (str: string) =>
  // just split on first ':'
  R.pipe(R.split(/:(.+)/), R.take(2), R.map(R.trim))(str) as [string, string];

// put matched groups into an array
const matchWithGroups = (regexp: RegExp) => (str: string) =>
  R.pipe(
    (s: string) => s.matchAll(regexp),
    (m) => [...m],
    R.flatten,
    R.tail // dont want the whole matched string
  )(str) as string[];

export const countChar = (char: string) => (str: string) =>
  R.pipe(R.split(''), R.countBy(R.identity), R.prop(char))(str);

type predicate = (s: string) => boolean

const predicateFromCondition = (condition: string): predicate => {
  const parseInts = ([min, max, char]: string[]): [number, number, string] => [
    parseInt(min),
    parseInt(max),
    char,
  ];
  return R.pipe(
    matchWithGroups(/([0-9]+)-([0-9]+)\s([a-z,A-Z])/g),
    parseInts,
    ([min, max, char]: [number, number, string]) => R.pipe(countChar(char), (n) => n <= max && n >= min)
  )(condition);
}

const lineIsValid = R.pipe(
  parseLine,
  ([condition, pw]): [predicate, string] => [predicateFromCondition(condition), pw],
  ([pred, pw]) => pred(pw)
)

export const countValid = (lines: string[]) => {
  const valid = R.map(lineIsValid)(lines);      
  return R.filter(R.identity, valid).length
}

export const main1 = (filepath: string) => R.pipe(readFileLines, R.filter(l => !!l),countValid)(filepath);
