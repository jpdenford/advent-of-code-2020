import test from "tape";
import { findAddendProduct } from "./reportRepair";

test("2. has a valid number (from example)", (t) => {
  const input = [1721, 979, 366, 299, 675, 1456];
  t.plan(1)
  const result = findAddendProduct(2020, 2)(input)
  t.equal(result, 514579)
});

test("2. that it works with negative numbers", (t) => {
  const input = [1721, 979, 366, 299, 675, 1456, -10];
  t.plan(1)
  const result = findAddendProduct(1711, 2)(input)
  t.equal(result, -17210)
});

test("2. no result when list empty", (t) => {
  const input: number[] = [];
  t.plan(1)
  const result = findAddendProduct(2020, 2)(input)
  t.equal(result, null)
});

test("2. no result when list of size one", (t) => {
  const input: number[] = [2020];
  t.plan(1)
  const result = findAddendProduct(2020, 2)(input)
  t.equal(result, null)
});

test("3. that three sum to target (from example)", (t) => {
  const input = [1721, 979, 366, 299, 675, 1456];
  t.plan(1)
  const result = findAddendProduct(2020, 3)(input)
  t.equal(result, 241861950)
});

test("3. that there is no result if not possible", (t) => {
  const input = [1721, 979, 366, 299, 675, 1456];
  t.plan(1)
  const result = findAddendProduct(202000, 3)(input)
  t.equal(result, null)
});

test("3. that there is no result if not possible (negative)", (t) => {
  const input = [1721, 979, 366, 299, 675, 1456];
  t.plan(1)
  const result = findAddendProduct(-1, 3)(input)
  t.equal(result, null)
});

test("4. is possible", (t) => {
  const input = [1721, 979, 366, 299, 675, 1456];
  t.plan(1)
  const result = findAddendProduct(3842, 4)(input)
  // 1721 * 366 * 299 * 1456
  t.equal(result, 274217090784)
});

test("4. works with duplicate numbers", (t) => {
  const input = [1721, 979, 366, 366, 366, 299, 675, 1456];
  t.plan(1)
  const result = findAddendProduct(3842, 4)(input)
  // 1721 * 366 * 299 * 1456
  t.equal(result, 274217090784)
});