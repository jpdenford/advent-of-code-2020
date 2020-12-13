import test from 'tape'
import { sharedElements, countSharedCharsInGroup } from './customCustoms'

test('5 shared elements', (t) => {
  t.plan(1)
  const input = [
    ['a', 'b', 'c'],
    ['a', 'b', 'q'],
  ].map((x) => new Set(x))
  const x = sharedElements(input)
  t.isEquivalent([...x], ['a', 'b'])
})

test('5.2', (t) => {
  t.plan(1)
  const group = 'a\na\na\na'
  const output = countSharedCharsInGroup(group)
  t.isEquivalent(output, 1)
})

test('5.2 countSharedCharsInGroup', (t) => {
  t.plan(1)
  const group = 'ab\nac'
  const output = countSharedCharsInGroup(group)
  t.isEquivalent(output, 1)
})
