import R from 'ramda'
import { readFileLines } from '../fileUtils'

const parseLine = (str: string) =>
  // just split on first ':'
  R.pipe(R.split(/:(.+)/), R.take(2), R.map(R.trim))(str) as [string, string]

// put matched groups into an array
const matchWithGroups = (regexp: RegExp) => (str: string) =>
  R.pipe(
    (s: string) => s.matchAll(regexp),
    (m) => [...m],
    R.flatten,
    R.tail // dont want the whole matched string
  )(str) as string[]

export const countChar = (char: string) => (str: string) =>
  R.pipe(R.split(''), R.countBy(R.identity), R.prop(char), (c) => c ?? 0)(str)

type Predicate = (s: string) => boolean
type Rule = (a: number, b: number, c: string) => Predicate

const predicateFromDescription = (rule: Rule) => (description: string): Predicate => {
  const parseInts = ([pos1, pos2, char]: string[]) => [parseInt(pos1), parseInt(pos2), char] as const
  return R.pipe(
    matchWithGroups(/([0-9]+)-([0-9]+)\s([a-z,A-Z])/g),
    parseInts,
    ([n, n2, c]) => rule(n, n2, c)
  )(description)
}

export const lineIsValid = (rule: Rule) =>
  R.pipe(
    parseLine,
    ([description, pw]): [Predicate, string] => [
      predicateFromDescription(rule)(description),
      pw,
    ],
    ([pred, pw]) => pred(pw)
  )

export const rule1: Rule = (min, max, char) =>
  R.pipe(countChar(char), (n) => n <= max && n >= min)

export const rule2: Rule = (pos1, pos2, char) => (str: string) =>
  [R.propEq(pos1 - 1, char, str), R.propEq(pos2 - 1, char, str)].filter(Boolean).length === 1

export const countValid = (ls: boolean[]) => ls.filter(Boolean).length

export const main1 = (filepath: string) =>
  R.pipe(
    readFileLines,
    R.filter((l) => !!l),
    R.tap((l) => console.log('total leng', l.length)),
    R.map(lineIsValid(rule1)),
    countValid
  )(filepath)

export const main2 = (filepath: string) =>
  R.pipe(
    readFileLines,
    R.filter((l) => !!l),
    R.tap((l) => console.log('total leng', l.length)),
    R.map(lineIsValid(rule2)),
    countValid
  )(filepath)
