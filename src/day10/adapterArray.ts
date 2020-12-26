import R from 'ramda'
import { readFileLines, removeEmpty } from '../fileUtils'
import { splitWhenEvery } from '../listUtils'

const readIn = R.pipe(readFileLines, removeEmpty, R.map(parseInt))

// find the spaces between each number
export const calculateGaps = (adapters: number[]) => {
  const sorted = R.sort(R.ascend(R.identity), adapters)
  const combs = R.aperture(2, sorted)
  const diffs = R.map(([a, b]) => b - a, combs)
  return diffs
}

export const addBuiltInAdapterAndOutlet = (adpts: number[]) => {
  const highestAdpt = R.reduce(R.max, -Infinity, adpts) as number
  return [...adpts, 0, highestAdpt + 3]
}

export const multiplyCounts = (diffs: number[]): number => {
  const occurrences = R.countBy((x: number) => x)(diffs)
  const counts = Object.values(occurrences)
  return R.reduce(R.multiply as any, 1, counts)
}

const calculateDiffsWithPadding = R.pipe(addBuiltInAdapterAndOutlet, calculateGaps)

export const calculateProductOfCounts = R.pipe(
  calculateDiffsWithPadding,
  R.tap(console.log),
  multiplyCounts
)

export const main1 = R.pipe(readIn, calculateProductOfCounts, JSON.stringify)

const asString = (ns: number[]) => ns.join(',')

// find valid replacements for all possible ns except first and last
export const findRemovalsForRange = (numbers: number[]): string[] => {
  const gapsAreOkaySize = (sortedNums: number[]): boolean => {
    if(sortedNums.length <= 1) return true
    if(sortedNums[1] - sortedNums[0] > 3) return false
    return gapsAreOkaySize(R.tail(sortedNums))
  }
  const recurseSubstitutes = (ns: number[]): string[] => {
    if(!gapsAreOkaySize(ns)) return []
    const combs = ns.map((n, i, all): string[] => {
      // outer numbers can't be substituted
      if(i === 0 || i === all.length - 1) return []
      const removed = R.remove(i, 1, all)
      return recurseSubstitutes(removed)
    }).flat()
  // rather inefficient as combinations will be recalculated
    return Array.from(new Set(combs.concat(asString(ns))))
  }

  const sorted = R.sort(R.ascend(R.identity), numbers)
  if(sorted.length == 0) return []
  if(sorted.length <= 2) return [asString(sorted)]
  return recurseSubstitutes(sorted).filter(x => !!x)
}

export const validCombinations = (ns: number[]) => {
  const withFirstAndLast = addBuiltInAdapterAndOutlet(ns)
  const sorted = withFirstAndLast.sort(R.ascend(R.identity))
  const sequentialChunks = splitWhenEvery((a?: number, b?: number) => (b ?? 0) - (a ?? 0) >= 3)(sorted)
  const combs = sequentialChunks.map(R.pipe(
    findRemovalsForRange,
    R.length
  ))
  return R.reduce(R.multiply, 1, combs)
}

export const main2 = R.pipe(readIn, validCombinations, JSON.stringify)

// some examples of sequential chunk combinations

// 0 1 2
// 0 _ 2
//d 1 1
// combs 2

// 0 1 2 3
// 0 _ 2 3
// 0 - - 3
// 0 1 _ 3
//d 1 1 1
// combs 4

// 0 1 2 3 4
// 0 _ 2 3 4
// 0 _ _ 3 4
// 0 1 _ 3 4
// 0 1 _ _ 4
// 0 1 2 _ 4
// 0 _ 2 _ 4
//d 1 1 1 1
// combs 7