import R from 'ramda'
import { readFileLines } from '../fileUtils'
import { matchAllGroups } from '../stringUtils'

type Nop = ['nop', number]
type Acc = ['acc', number]
type Jmp = ['jmp', number]

type Operation = Nop | Acc | Jmp

type State = {
  accum: number
  pointer: number
}

const lineShape = /\s*(nop|acc|jmp) ([+-][0-9]+)\s*/g

const makeOperation = (row: string): Operation => {
  const matched = matchAllGroups(lineShape)(row)
  if (matched.length !== 3) throw new Error('Unknown operation: ' + matched)
  const instruction = R.tail(matched)
  const [op, num] = instruction
  return [op, parseInt(num)] as Operation
}

const applyOperation = (inst: Operation, state: State): State => {
  const [op, num] = inst
  const applyInst = {
    nop: (state: State) => ({ ...state, pointer: (state.pointer += 1) }),
    jmp: (state: State) => ({ ...state, pointer: (state.pointer += num) }),
    acc: (state: State) => ({
      ...state,
      accum: (state.accum += num),
      pointer: (state.pointer += 1),
    }),
  }
  return applyInst[op](state)
}

export const makeInstructions = (rows: string[]) => R.map(makeOperation)(rows)

export const run = (operations: Operation[]): State => {
  const runAndStopOnLoop = (state: State, visited: Set<number>): State => {
    const nextOperation = operations[state.pointer]
    if (!nextOperation) return state
    const nextState = applyOperation(nextOperation, state)
    if (visited.has(nextState.pointer)) {
      return nextState
    }
    return runAndStopOnLoop(nextState, visited.add(nextState.pointer))
  }

  const initialState: State = { accum: 0, pointer: 0 }
  return runAndStopOnLoop(initialState, new Set())
}

const readIn = R.pipe(
  readFileLines,
  R.filter((l) => !!l)
)

export const main1 = R.pipe(
  readIn,
  makeInstructions,
  run,
  R.prop('accum'),
  JSON.stringify
)

const replaceInstruction = (pointer: number, operations: Operation[]): Operation[] | null => {
  const opType = operations[pointer][0]
  if (opType === 'jmp') return R.update(pointer, ['nop', operations[pointer][1]], operations)
  else if (opType === 'nop') return R.update(pointer, ['jmp', operations[pointer][1]], operations)
  return null
}

const copyEachReplaceable = (ops: Operation[]): Operation[][] =>
  ops.map((_, ind, all) => replaceInstruction(ind, all))
    .filter((replaced: Operation[] |  null) => replaced !== null) as any

export const findWithHighestPointer = R.pipe(
  copyEachReplaceable,
  R.map(run),
  R.sortBy(R.prop('pointer')),
  (states: State[]): State => R.last(states)!
)

export const main2 = R.pipe(
  readIn,
  makeInstructions,
  findWithHighestPointer,
  R.prop('accum'),
  JSON.stringify
)
