import test from 'tape'
import R from 'ramda'
import {
  makeInstructions, run,
} from './handheldHalting'

test('8 shared elements', (t) => {
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

test('8 run', (t) => {
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
  const ran = run(instructions)
  t.equals(ran, 5)
})
