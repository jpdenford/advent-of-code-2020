import R from 'ramda'
import { readFileLines } from '../fileUtils'
import { matchAllGroups } from '../stringUtils'

type Nop = ['nop', number]
type Acc = ['acc', number]
type Jmp = ['jmp', number]

type Operation = Nop | Acc | Jmp

// interface State {
//   accum: number
// }
type State = {
  accum: number
  pointer: number
}

const lineShape = /\s*(nop|acc|jmp) ([+-][0-9]+)\s*/g

const makeInstruction = (row: string): Operation => {
  const matched = matchAllGroups(lineShape)(row)
  if(matched.length != 3) throw new Error('Unknown instruction: ' + matched)
  const instruction = R.tail(matched)
  const [op, num] = instruction
  return [op, parseInt(num)] as Operation
}

const applyInstruction = (inst: Operation, state: State): State => {
  const [op, num] = inst
  const applyInst = {
    nop: (state: State) => ({...state, pointer: state.pointer += 1}),
    jmp: (state: State) => ({...state, pointer: state.pointer += num}),
    acc: (state: State) => ({...state, accum: state.accum += num, pointer: state.pointer += 1})
  }
  return applyInst[op](state)
}

export const makeInstructions = (rows: string[]) => R.map(makeInstruction)(rows)

export const run = (instructions: Operation[]): number => {
  const runAndStopOnLoop = (state: State, visited: Set<number>): number => {
    const nextInstruction = instructions[state.pointer]
    if(!nextInstruction) throw new Error(`No instruction found @ ${state.pointer}`)
    const nextState = applyInstruction(nextInstruction, state)
    console.log(nextState)
    if(visited.has(nextState.pointer)) {
      return nextState.accum // end and return state
    }
    return runAndStopOnLoop(nextState, visited.add(nextState.pointer))
  }
  const state: State = { accum: 0, pointer: 0 }
  return runAndStopOnLoop(state, new Set())
}


export const main1 = R.pipe(
  readFileLines,
  R.filter(l => !!l),
  makeInstructions,
  run,
  JSON.stringify
)

export const main2 = R.pipe(
  readFileLines
)
