import test from 'tape'
import { countChar, lineIsValid, rule1, rule2 } from './passwordPhilosophy'

test('2.1 has a valid number (from example)', (t) => {
  t.plan(1)
  const input = '1-3 a: abcde'
  const pred = lineIsValid(rule1)
  t.equal(pred(input), true)
})
test('2.1 has a valid number 2 (from example)', (t) => {
  t.plan(1)
  const input = '2-9 c: ccccccccc'
  const pred = lineIsValid(rule1)
  t.equal(pred(input), true)
})

test('2.1 has an invalid number 2 (from example)', (t) => {
  t.plan(1)
  const input = '1-3 b: cdefg'
  const pred = lineIsValid(rule1)
  t.equal(pred(input), false)
})

test('2. multi digit numbers', (t) => {
  t.plan(1)
  const input = '11-111 a: aaaaaaaaaaaacde'
  const result = lineIsValid(rule1)(input)
  t.equal(result, true)
})

// 2.2
// 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
// 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
// 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.

test('2.2 matches first', (t) => {
  t.plan(1)
  const input = '1-3 a: abcde'
  const result = lineIsValid(rule2)(input)
  t.equal(result, true)
})

test('2.2 matches second', (t) => {
  t.plan(1)
  const input = '1-3 b: xxbxx'
  const result = lineIsValid(rule2)(input)
  t.equal(result, true)
})

test('2.2 doesn\'t match (from example)', (t) => {
  t.plan(1)
  const input = '1-3 b: cdefg'
  const result = lineIsValid(rule2)(input)
  t.equal(result, false)
})

test('2.2 doesn\'t match  (from example)', (t) => {
  t.plan(1)
  const input = '2-9 c: ccccccccc'
  const result = lineIsValid(rule2)(input)
  t.equal(result, false)
})

test('2.2 rule 2', (t) => {
  t.plan(1)
  const input = 'ccxcccccc'
  const result = rule2(1, 3, 'x')(input)
  t.equal(result, true)
})

test('countChar', (t) => {
  t.plan(1)
  const count = countChar('a')('abc a')
  t.equal(count, 2)
})

test('countChar empty', (t) => {
  t.plan(1)
  const count = countChar('a')('')
  t.equal(count, 0)
})
