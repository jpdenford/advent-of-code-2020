import test from 'tape'
import { naturally } from '../listUtils'
import { validCombinations, calculateGaps, calculateProductOfCounts, findRemovalsForRange } from './adapterArray'

test('10.1 show diffs ', (t) => {
  t.plan(1)
  const input = [
    1, 2, 3, 6
  ]

  const diffs = calculateGaps(input)
  t.isEquivalent(diffs, [1,1,3])
})

test('10.1 all ', (t) => {
  t.plan(1)
  const input = [
    28, 33, 18, 42, 31, 14, 46,
    20, 48, 47, 24, 23, 49, 45,
    19, 38, 39, 11, 1, 32, 25,
    35, 8, 17, 7, 9, 4, 2, 34, 10, 3,
  ]

  const output = calculateProductOfCounts(input)
  t.isEquivalent(output, 220)
})

test('10.2 findCombinations empty', (t) => {
  t.plan(1)
  // [ 16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4 ]
  const input: number[] = []
  const output = findRemovalsForRange(input)
  t.isEquivalent(output, [])
})

test('10.2 findCombinations no subs', (t) => {
  t.plan(1)
  const input: number[] = [4]
  const output = findRemovalsForRange(input)
  t.isEquivalent(output, ['4'])
})

test('10.2 findCombinations 1 sub', (t) => {
  t.plan(1)
  const input: number[] = [4, 5, 6]
  const output = findRemovalsForRange(input)
  t.isEquivalent(output, [ '4,6', '4,5,6' ])
})

test('10.2 findCombinations 4 sub', (t) => {
  t.plan(1)
  const input: number[] = [4, 5, 6, 7]
  const output = findRemovalsForRange(input)
  t.isEquivalent(output, [ '4,7', '4,6,7', '4,5,7', '4,5,6,7' ])
})

test('10.2 findCombinations 5 sub', (t) => {
  t.plan(1)
  const input: number[] = [ 0, 1, 2, 3, 4 ]
  const output = findRemovalsForRange(input)
  t.isEquivalent(output.sort(naturally), 
    ['0,1,2,3,4', '0,2,3,4',
    '0,3,4','0,2,4',
    '0,1,3,4', '0,1,4',
    '0,1,2,4' ].sort(naturally)
  )
})

test('10.2 calccombs', (t) => {
  t.plan(1)
  const input: number[] = [28, 33, 18, 42, 31, 14,
    46, 20, 48, 47, 24, 23, 49,
    45, 19, 38, 39, 11, 1, 32, 25,
    35, 8, 17, 7, 9, 4, 2, 34, 10, 3]

  const output = validCombinations(input)
  t.isEquivalent(output, 19208)
})