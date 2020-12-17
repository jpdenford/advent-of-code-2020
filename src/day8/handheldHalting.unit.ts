import test from 'tape'
import R from 'ramda'
import {
  makeInstructions,
} from './handheldHalting'

test('7 shared elements', (t) => {
  t.plan(1)
  const input = [
    'nop +0',
    'acc +1',
    'jmp +4',
    'acc +3',
    'jmp -3',
    'acc -99',
    'acc +1',
    'jmp -4',
    'acc +6',
  ]

  const instructions = makeInstructions(input)
  t.isEquivalent(instructions, [
    ['nop', 0],
    ['acc', 1],
    ['jmp', 4],
    ['acc', 3],
    ['jmp', -3],
    ['acc', -99],
    ['acc', +1],
    ['jmp', -4],
    ['acc', +6]
  ])
})
