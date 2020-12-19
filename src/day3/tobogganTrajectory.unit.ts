import test from 'tape'
import R from 'ramda'
import { encounteredTrees, getCoordinateRepated } from './tobogganTrajectory'

test('3.1 (example)', (t) => {
  t.plan(1)
  const input = 
`..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

  const split = R.split('\n')(input)
  const result = encounteredTrees(split)({ x: 3, y: 1 })
  t.equal(result, 7)
})

test('3.1 getCoordinateRepated', (t) => {
  t.plan(1)
  const result = getCoordinateRepated(['abc'])({ x: 3, y: 0 })
  t.equal(result, 'a')
})

test('3.1 getCoordinateRepated multi line', (t) => {
  t.plan(1)
  const result = getCoordinateRepated(['abc','def'])({ x: 3, y: 1 })
  t.equal(result, 'd')
})

