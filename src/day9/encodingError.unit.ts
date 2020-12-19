import test from 'tape'
import { findNonXmasNumber, findSequentialAddends, sumFirstAndLast } from './encodingError'

test('9.1 finds Non XMAS encoded number', (t) => {
  t.plan(1)
  const input = [
    35, 20, 15, 25, 47, 40, 62, 55,
    65, 95, 102, 117, 150, 182, 127,
    219, 299, 277, 309, 576
  ]

  const nonXmas = findNonXmasNumber(5)(input)
  t.isEquivalent(nonXmas, 127)
})

test('9.2 findSequentialAddends', (t) => {
  t.plan(1)
  const input = [
    35, 20, 15, 25, 47, 40,
    62, 55, 65, 95, 102, 117,
    150, 182, 127, 219, 299,
    277, 309, 576
  ]

  const sequence = findSequentialAddends(127)(input)
  t.isEquivalent(sequence, [15, 25, 47, 40])
})

test('9.2 sumFirstAndLast nonEmpty', (t) => {
  t.plan(1)
  const input = [1, 2, 3]

  const sum = sumFirstAndLast(input)
  t.isEquivalent(sum, 4)
})

test('9.2 sumFirstAndLast empty', (t) => {
  t.plan(1)
  const sum = sumFirstAndLast([])
  t.isEquivalent(sum, undefined)
})