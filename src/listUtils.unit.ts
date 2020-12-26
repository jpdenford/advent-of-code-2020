import test from 'tape'
import { splitWhenEvery } from './listUtils'

test('splitWhenEvery/ single split', (t) => {
  t.plan(1)
  const input = [0, 1, 2, 3, 3, 4, 5]
  const output = splitWhenEvery((n1, n2) => (n2 ?? 0) - (n1 ?? 0) === 0)(input)
  t.isEquivalent(output, [[ 0, 1, 2, 3 ], [ 3, 4, 5 ]])
})

test('splitWhenEvery/ multi split', (t) => {
  t.plan(1)
  const input = [0, 1, 2, 3, 3, 4, 5, 5, 6]
  const output = splitWhenEvery((n1, n2) => (n2 ?? 0) - (n1 ?? 0) === 0)(input)
  t.isEquivalent(output, [[ 0, 1, 2, 3 ], [ 3, 4, 5 ], [ 5, 6 ]])
})

test('splitWhenEvery/ multi split 2', (t) => {
  t.plan(1)
  const input = [0, 1, 2, 3, 3, 4, 5, 5, 5, 5, 6]
  const output = splitWhenEvery((n1, n2) => (n2 ?? 0) - (n1 ?? 0) === 0)(input)
  t.isEquivalent(output, [[ 0, 1, 2, 3 ], [ 3, 4, 5 ], [ 5 ], [ 5 ], [ 5, 6 ]])
})

test('splitWhenEvery/ multi sequential split', (t) => {
  t.plan(1)
  const input = [0, 1, 2, 3, 3, 4, 5, 5, 5, 6]
  const output = splitWhenEvery((n1, n2) => (n2 ?? 0) - (n1 ?? 0) === 0)(input)
  t.isEquivalent(output,  [ [ 0, 1, 2, 3 ], [ 3, 4, 5 ], [ 5 ], [ 5, 6 ] ])
})

test('splitWhenEvery/ empty list', (t) => {
  t.plan(1)
  const input: number[] = []
  const output = splitWhenEvery((n1, n2) => (n2 ?? 0) - (n1 ?? 0) === 0)(input)
  t.isEquivalent(output, [])
})

test('splitWhenEvery/ no split', (t) => {
  t.plan(1)
  const input: number[] = [1, 2, 3, 4]
  const output = splitWhenEvery((n1, n2) => false)(input)
  t.isEquivalent(output, [input])
})

test('splitWhenEvery/ split only', (t) => {
  t.plan(1)
  const input: number[] = [1, 1]
  const output = splitWhenEvery((n1, n2) => n1 == n2)(input)
  t.isEquivalent(output, [[1],[1]])
})


test('splitWhenEvery/ xxxx', (t) => {
  t.plan(1)
  const input: number[] = [
    1,  2,  3,  4,  7,  8,  9, 10, 11,
   14, 17, 18, 19, 20, 23, 24, 25, 28,
   31, 32, 33, 34, 35, 38, 39, 42, 45,
   46, 47, 48, 49
 ]
  const output = splitWhenEvery((n1, n2) => (n2 ?? -99) - (n1 ?? -99) >= 3)(input)
  t.isEquivalent(output,  [
    [ 1, 2, 3, 4 ], [ 7, 8, 9, 10, 11 ],
    [ 14 ], [ 17, 18, 19, 20 ], [ 23, 24, 25 ], [ 28 ],
    [ 31, 32, 33, 34, 35 ], [ 38, 39 ], [ 42 ],
    [ 45, 46, 47, 48, 49 ] ])
})