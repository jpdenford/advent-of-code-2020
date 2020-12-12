import test from 'tape'
import { findMissingSeat, findSeat } from '../day5/binaryBoarding'
import R from 'ramda'
// import { passportsFromLines } from './passportProcessing'

test("5.1 example 1", t => {
  t.plan(2)
  const input  = 'BFFFBBFRRR'
  //  row 70, column 7, seat ID 567.
  const [row, seat] = findSeat(input)
  t.equal(row, 70)
  t.equal(seat, 7)
})

test("5.1 example 2", t => {
  t.plan(2)
  const input  = 'FBFBBFFRLR'
  const [row, seat] = findSeat(input)
  t.equal(row, 44)
  t.equal(seat, 5)
})

test("5.2 findMissingSeat", t => {
  t.plan(1)
  const input  = [1,2,3,4,5,6,7,8,9,11,12,13]
 const missingSeat = findMissingSeat(input)
  t.equal(missingSeat, 10)
})


