import R, { sort } from "ramda";
import fs from 'fs'


const convergeToNums = (target: number, sortedNums: number[]): number[] | null => {
  if (sortedNums.length <= 1) return null
  const lowerNum = R.head(sortedNums)!
  const higherNum = R.last(sortedNums)!
  const sum = lowerNum + higherNum
  if (sum < target) return convergeToNums(target, R.slice(1, Infinity, sortedNums))
  if (sum > target) return convergeToNums(target, R.slice(0, -1, sortedNums))
  return [lowerNum, higherNum]
}


export const findProductOfSum = (targetSum: number) => (nums: number[]) => {
  const sortedNums = R.sort(R.ascend(R.identity), nums)
  const numbers = convergeToNums(targetSum, sortedNums)
  if (!numbers) return null
  return R.reduce(R.multiply, 1, numbers)
}

const xx = (targetSum: number, sortedNums: number[]): number[] | null => {
  if(R.isEmpty(sortedNums)) return null
  const lowAddend = R.head(sortedNums)!
  const remaining = R.tail(sortedNums)
  const midAndHighAddends = convergeToNums(targetSum - lowAddend!, remaining)
  if(midAndHighAddends) return [lowAddend, ...midAndHighAddends]
  return xx(targetSum, remaining)
}

export const findProductOfSumOfThree = (targetSum: number) => (nums: number[]) => {
  const sortedNums = R.sort(R.ascend(R.identity), nums)
  const numbers = xx(targetSum, sortedNums)
  console.log('nums', numbers)
  if (!numbers) return null
  return R.reduce(R.multiply, 1, numbers)
}

const readFileLines = R.pipe(
  (filepath: string) => fs.readFileSync(filepath),
  R.toString ,
  R.split(/\r?\n/)
)

const linesToNumbers = (lines: string[]) => R.pipe(
  R.map(parseInt),
  R.reject(isNaN)
)(lines)

const main1 = (filepath: string) => R.pipe(readFileLines, linesToNumbers, findProductOfSum(2020))(filepath)

const main2 = (filepath: string) => R.pipe(readFileLines, linesToNumbers, findProductOfSum(2020))(filepath)

export {main1}


// [1, 3, 6, 7, 9, 11]
//  ^     ^        ^