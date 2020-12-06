import R from "ramda"
import { readFileLines } from "../fileUtils"

interface Vector2d {
  x: number
  y: number
}

const toVec2d = (slope: Vector2d) => (n: number): Vector2d => ({ x: slope.x * n, y: slope.y * n })

export const getCoordinateRepated = (env: string[]) => (pos: Vector2d) => env[pos.y]?.[pos.x % env[pos.y].length] ?? null

export const encounteredTrees = (env: string[]) => (slope: Vector2d): number =>
  R.pipe(
    R.range(0),
    R.map(toVec2d(slope)),
    R.map(getCoordinateRepated(env)),
    R.filter(R.equals('#')),
    R.length
  )(env.length / slope.y)

export const encounteredTreesMany = (slopes: Vector2d[]) => (env: string[]) => R.pipe(R.map(encounteredTrees(env)), R.reduce(R.multiply, 1))(slopes)

export const main1 = R.pipe(readFileLines, (env: string[]) => encounteredTrees(env)({x: 3, y: 1}))

export const main2 = R.pipe(readFileLines, encounteredTreesMany([{x: 1, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 7, y: 1}, {x: 1, y: 2}]))
