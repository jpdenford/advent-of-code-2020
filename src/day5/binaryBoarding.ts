import R from 'ramda'
import { readFile, readFileLines } from '../fileUtils'

type descriminator<T> = (v: T, index: number) => -1 | 0 | 1

const signalToDirection = (downSignal: string, upSignal: string) => (char: string) => char === downSignal ? -1 : (char === upSignal) ? 1 : 0

// const 


export const findWith = (desc: descriminator<number>, index: number = 0) => (low: number, high: number): number => {
  if(low === high) return low
  const midFloat = (low + high) / 2
  const dir = desc(midFloat, index)
  const mid = dir === -1 ? Math.floor(midFloat) : Math.ceil(midFloat)
  // console.log('dir' + dir, low, high, mid)
  if(dir === -1) return findWith(desc, index + 1)(low, mid)
  if(dir === 1) return findWith(desc, index + 1)(Math.ceil(mid), high)
  return mid
}

export const findSeat = (directions: string) => {
  const [rowDirections, seatDirections] = R.pipe(R.splitAt(7), R.map(R.split('')))(directions)
  const rowMapper = signalToDirection('F', 'B')
  const seatMapper = signalToDirection('L', 'R')
  const rowDirs = R.map(rowMapper, rowDirections)
  const seatDirs = R.map(seatMapper, seatDirections)
  // console.log(directions,rowDirs, seatDirs)
  // 0, 127
  // 0, 7
  const x = findWith((_, index) => rowDirs[index])(0, 127)
  const y = findWith((_, index) => seatDirs[index])(0, 7)
  // console.log(x, y)
  return [x, y]
}

const toSeatId = (row: number, column: number) => row * 8 + column

export const main1 = R.pipe(
  readFileLines,
  R.filter(R.complement(R.isEmpty)),
  R.map(findSeat),
  R.map(R.apply(toSeatId)),
  R.reduce(R.max, -1)
)
const missingSeatNumber = ([s1,s2]: number[]): number | undefined => {
  const gap = Math.abs(s1 - s2)
  if(gap > 1 && gap < 8) return (s1 + s2) / 2
}

export const findMissingSeat = (seatids: number[]): number | undefined => {
  const sortedSeats = R.sortBy(R.identity, seatids)
  const missingSeat = R.map(missingSeatNumber, R.aperture(2, sortedSeats))
  return R.find(x => !!x, missingSeat)
}

export const main2 = R.pipe(
  readFileLines,
  R.filter(R.complement(R.isEmpty)),
  R.map(findSeat),
  R.map(R.apply(toSeatId)),
  // find missing seat
  findMissingSeat
)