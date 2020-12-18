import test from 'tape'
import { findWithHighestPointer, makeInstructions, run } from './handheldHalting'

test('8 makeInstructions', (t) => {
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

test('8.1 run', (t) => {
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
  t.equals(ran.accum, 5)
})


test('8.2 findLogestRunning', (t) => {
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
    'acc +6'
  ]

  const instructions = makeInstructions(input)
  const ran = findWithHighestPointer(instructions)
  t.equals(ran.accum, 8)
})