import R, { split, toString } from "ramda";
import fs from 'fs'

const convergeToNums = (target: number, leftInd: number, rightInd: number, sortedNums: number[]): [number, number] | null => {
  if (leftInd === rightInd) return null
  const leftNum = sortedNums[leftInd]
  const rightNum = sortedNums[rightInd]
  const sum = leftNum + rightNum
  // no combination sums to target
  if (sum < target) return convergeToNums(target, leftInd + 1, rightInd, sortedNums)
  if (sum > target) return convergeToNums(target, leftInd, rightInd - 1, sortedNums)
  return [leftNum, rightNum]
};

export const findProductOfSum = (targetSum: number) => (nums: number[]) => {
  const sortedNums = R.sort(R.ascend(R.identity), nums)
  const numbers = convergeToNums(targetSum, 0, R.max(sortedNums.length - 1, 0), sortedNums)
  if (!numbers) return null
  const [a, b] = numbers
  return a * b
};

const readFileLines = R.pipe(
  (filepath: string) => fs.readFileSync(filepath),
  R.toString ,
  R.split(/\r?\n/)
)

const linesToNumbers = (lines: string[]) => R.pipe(
  R.map(parseInt),
  R.reject(isNaN)
)(lines)

const main = (filepath: string) => R.pipe(readFileLines, linesToNumbers, findProductOfSum(2020))(filepath)

export default main
