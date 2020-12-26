import R, { split } from 'ramda'
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


const calculateDiffsWithExtra = R.pipe(addBuiltInAdapterAndOutlet, calculateGaps)

export const calculateProductOfCounts = R.pipe(
  calculateDiffsWithExtra,
  R.tap(console.log),
  multiplyCounts
)

const countSequences = (ns: number[]): { num: number; count: number }[] => {
  return ns
    .reduce((counts: { num: number; count: number }[], next: number) => {
      const previous = R.head(counts)!
      if (previous && previous.num === next)
        return [
          { num: previous.num, count: previous.count + 1 },
          ...R.tail(counts),
        ]
      else return [{ num: next, count: 1 }, ...counts]
    }, [])
    .reverse()
}

const asString = (ns: number[]) => ns.join(',')

export const findRemovalsForRange = (numbers: number[]): string[] => {
  const gapsAreOkaySize = (sortedNums: number[]): boolean => {
    if(sortedNums.length <= 1) return true
    if(sortedNums[1] - sortedNums[0] > 3) return false
    return gapsAreOkaySize(R.tail(sortedNums))
  }
  // rather inefficient as combinations will be recalculated
  const recurseSubstitutes = (ns: number[]): string[] => {
    if(!gapsAreOkaySize(ns)) return []
    const combs = ns.map((n, i, all): string[] => {
      // outer numbers can't be substituted
      if(i === 0 || i === all.length - 1) return []
      const removed = R.remove(i, 1, all)
      return [asString(removed), ...recurseSubstitutes(removed)]
    }).flat()
    return Array.from(new Set(combs))
  }

  const sorted = R.sort(R.ascend(R.identity), numbers)
  if(sorted.length == 0) return []
  if(sorted.length <= 2) return [asString(sorted)]
  return [asString(sorted), ...recurseSubstitutes(sorted)].filter(x => !!x)
}

export const main1 = R.pipe(readIn, calculateProductOfCounts, JSON.stringify)

export const calculateCombinations = R.pipe(
  calculateDiffsWithExtra,
  // R.tap(console.log),
  countSequences,
  R.filter((c: { num: number }) => c.num === 1),
  R.map((c) => c.count),
  R.reduce(R.multiply, 1)
)


export const calcCombs = (ns: number[]) => {
  const withExtra = addBuiltInAdapterAndOutlet(ns)
  const sorted = withExtra.sort(R.ascend(R.identity))
  console.log('ns', sorted)
  const foo = splitWhenEvery((a?: number, b?: number) => (b ?? 0) - (a ?? 0) >= 3)(sorted)
  const largerThan1 = foo.filter(x => x.length !== 1)
  console.log('largerthan1', largerThan1)
  // const iterations = largerThan1.map(calculateDiffs)
  // console.log('iterations', iterations)
  const combs = largerThan1.map(R.pipe(
    // calculateGaps,
    findRemovalsForRange,
    // countSequences,
    rems => rems.length
    // R.filter((c: { num: number }) => c.num === 1),
    // R.map((c) => c.count),
    // R.reduce(R.multiply, 1))
    ))
  console.log('combs', combs)
  console.log('n', R.reduce(R.multiply, 1, combs))
}

export const main2 = R.pipe(readIn, calculateCombinations, JSON.stringify)


// some examples

// 0 3 4 5 8
// 0 3 _ 5 8
//d 3 1 1 3 -> 2

// 0 3 4 5 6 9
// 0 3 _ 5 6 9
// 0 3 - - 6 9
// 0 3 4 _ 6 9
//d 3 1 1 1 3 -> 4


// 0 3 4 5 6 7 10
// 0 3 _ 5 6 7 10
// 0 3 _ _ 6 7 10
// 0 3 4 _ 6 7 10
// 0 3 4 _ _ 7 10
// 0 3 4 5 _ 7 10
// 0 3 _ 5 _ 7 10
//d 3 1 1 1 1 3 -> 6

// 0 3 4 5 6 7 8 11
// 0 3 _ 5 6 7 8 11
// 0 3 _ _ 6 7 8 11
// 0 3 4 _ 6 7 8 11
// 0 3 4 _ _ 7 8 11
// 0 3 4 5 _ 7 8 11 ======
// 0 3 4 5 _ _ 8 11
// 0 3 4 5 6 _ 8 11
// 0 3 _ 5 6 _ 8 11
// 0 3 _ _ 6 _ 8 11
// 0 3 4 _ 6 _ 8 11
//d 3 1 1 1 1 1 3 -> 11


// up to nine
// 0 3 4 5 6 7 8 9 12
// 0 3 _ 5 6 7 8 9 12
// 0 3 _ _ 6 7 8 9 12
// 0 3 4 _ 6 7 8 9 12
// 0 3 4 _ _ 7 8 9 12
// 0 3 4 5 _ 7 8 9 12
// 0 3 4 5 _ _ 8 9 12
// 0 3 4 5 6 _ 8 9 12
// 0 3 _ 5 6 _ 8 9 12
// 0 3 _ _ 6 _ 8 9 12
// 0 3 4 _ 6 _ 8 9 12 ..
// 0 3 4 5 6 _ _ 9 12
// 0 3 _ 5 6 _ _ 9 12
// 0 3 _ _ 6 _ _ 9 12
// 0 3 4 _ 6 _ _ 9 12
// 0 3 4 5 6 7 _ 9 12
// 0 3 _ 5 6 7 _ 9 12
// 0 3 _ _ 6 7 _ 9 12
// 0 3 4 _ 6 7 _ 9 12
// 0 3 4 _ _ 7 _ 9 12
//d 3 1 1 1 1 1 1 3 -> 20


// up to 10
// 0 3 4 5 6 7 8 9 10 13
// 0 3 _ 5 6 7 8 9 10 13
// 0 3 _ _ 6 7 8 9 10 13
// 0 3 4 _ 6 7 8 9 10 13
// 0 3 4 _ _ 7 8 9 10 13
// 0 3 4 5 _ 7 8 9 10 13
// 0 3 4 5 _ _ 8 9 10 13
// 0 3 4 5 6 _ 8 9 10 13
// 0 3 _ 5 6 _ 8 9 10 13
// 0 3 _ _ 6 _ 8 9 10 13
// 0 3 4 _ 6 _ 8 9 10 13
// 0 3 4 5 6 _ _ 9 10 13
// 0 3 _ 5 6 _ _ 9 10 13
// 0 3 _ _ 6 _ _ 9 10 13
// 0 3 4 _ 6 _ _ 9 10 13
// 0 3 4 5 6 7 _ 9 10 13
// 0 3 _ 5 6 7 _ 9 10 13
// 0 3 _ _ 6 7 _ 9 10 13
// 0 3 4 _ 6 7 _ 9 10 13
// 0 3 4 _ _ 7 _ 9 10 13 ..
// 0 3 4 5 6 7 _ _ 10 13
// 0 3 _ 5 6 7 _ _ 10 13
// 0 3 _ 5 _ 7 _ _ 10 13
// 0 3 _ _ 6 7 _ _ 10 13
// 0 3 4 _ 6 7 _ _ 10 13
// 0 3 4 5 6 7 8 _ 10 13
// 0 3 _ 5 6 7 8 _ 10 13
// 0 3 _ 5 _ 7 8 _ 10 13
// 0 3 _ _ 6 7 8 _ 10 13
// 0 3 4 _ 6 7 8 _ 10 13
//d 3 1 1 1 1 1 1 3 -> 30