import fs from 'fs';
import R from "ramda";

const convergeToSum = (target: number, sortedNums: number[]): number[] | null => {
  if (sortedNums.length <= 1) return null
  const lowerNum = R.head(sortedNums)!
  const higherNum = R.last(sortedNums)!
  const sum = lowerNum + higherNum
  if (sum < target) return convergeToSum(target, R.slice(1, Infinity, sortedNums))
  if (sum > target) return convergeToSum(target, R.slice(0, -1, sortedNums))
  return [lowerNum, higherNum]
}

export const findAddends = (targetSum: number, numAddends: number, sortedNums: number[]): number[] | null => {
  if(numAddends > sortedNums.length) return null
  if(numAddends === 2) return convergeToSum(targetSum, sortedNums)
  const lowAddend = R.head(sortedNums)!
  const remaining = R.tail(sortedNums)
  const higherAddends = findAddends(targetSum - lowAddend, numAddends - 1, remaining)
  if(!!higherAddends) return [lowAddend, ...higherAddends]
  return findAddends(targetSum, numAddends, remaining)
}

export const findAddendProduct = (targetSum: number, numAddends: number) => (numbers: number[]): number | null => {
  const sortedNums = R.sort(R.ascend(R.identity), numbers)
  const addends = findAddends(targetSum, numAddends, sortedNums)
  if (!addends) return null
  return R.reduce(R.multiply, 1, addends)
}

const readFileLines = R.pipe(
  (filepath: string) => fs.readFileSync(filepath),
  R.toString,
  R.split(/\r?\n/)
)

const linesToNumbers = (lines: string[]) => R.pipe(
  R.map(parseInt),
  R.reject(isNaN)
)(lines)

const readIntFile = R.pipe(readFileLines, linesToNumbers)

export const main1 = (filepath: string) => R.pipe(readIntFile, findAddendProduct(2020, 2))(filepath)
export const main2 = (filepath: string) => R.pipe(readIntFile, findAddendProduct(2020, 3))(filepath)
