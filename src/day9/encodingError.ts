import R, { takeWhile } from 'ramda'
import { findAddends } from '../day1/reportRepair'
import { readFileLines, removeEmpty } from '../fileUtils'

const readIn = R.pipe(readFileLines, removeEmpty, R.map(parseInt))

const findAddendsInWindow = (windowSize: number) => (
  index: number,
  ns: number[]
) =>
  R.pipe(
    R.slice(R.max(index - windowSize, 0), index),
    findAddends(ns[index], 2)
  )(ns)

export const findNonXmasNumber = (windowPreambleSize: number) => (ns: number[]) =>
  ns.find((n, ind, all) => {
    if (ind < windowPreambleSize) return false // skip initial preamble
    return !findAddendsInWindow(windowPreambleSize)(ind, all)
  })

export const findSequentialAddends = (target: number) => (ns: number[]): number[] | undefined => {
  const expandWindowOver = (windowStart: number, windowEnd: number): number[] | undefined => {
    const window = R.slice(windowStart, windowEnd, ns)
    const sum = R.sum(window)
    if(sum === target) return window
    const incWindowEnd = windowEnd += 1
    if(sum < target &&  incWindowEnd <= ns.length) return expandWindowOver(windowStart, incWindowEnd)
  }
  for(const n of R.range(0, ns.length)){
    const addends = expandWindowOver(n, n + 2)
    if(addends) return addends
  }
}

export const main1 = R.pipe(
  readIn,
  findNonXmasNumber(25),
  JSON.stringify
)

export const sumFirstAndLast = (ns: number[]) =>  ns.length >= 2 ? R.head(ns)! + R.last(ns)! : undefined

export const main2 = R.pipe(
  readIn,
  (numbers: number[]): number[] => {
    const nonXmasNum = findNonXmasNumber(25)(numbers)
    return nonXmasNum ? (findSequentialAddends(nonXmasNum)(numbers) ?? []) : []
  },
  sumFirstAndLast
)
