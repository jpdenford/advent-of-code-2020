import R from "ramda"
import { readFileLines } from "../fileUtils"

interface Vector2d {
  x: number
  y: number
}

const toVec2d = (slope: Vector2d) => (n: number): Vector2d => ({ x: slope.x * n, y: slope.y * n })

export const getCoordinateRepated = (env: string[]) => (pos: Vector2d) => env[pos.y]?.[pos.x % env[pos.y].length] ?? null

export const encounteredTrees = (slope: Vector2d) => (env: string[]) =>
  R.pipe(
    R.range(0),
    R.map(toVec2d(slope)),
    R.map(getCoordinateRepated(env)),
    R.tap(x => console.log('', x)),
    R.filter(R.equals('#')),
    R.length
  )(env.length / slope.y)

export const main1 = R.pipe(readFileLines, encounteredTrees({x: 3, y: 1}))
