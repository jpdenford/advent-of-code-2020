import test from "tape";
import { findProductOfSum } from "./reportRepair";

test("has a valid number (from example)", (t) => {
  const input = [1721, 979, 366, 299, 675, 1456];
  t.plan(1)
  const result = findProductOfSum(2020)(input)
  t.equal(result, 514579)
});

test("no result when list empty", (t) => {
  const input: number[] = [];
  t.plan(1)
  const result = findProductOfSum(2020)(input)
  t.equal(result, null)
});

test("no result when list of size one", (t) => {
  const input: number[] = [2020];
  t.plan(1)
  const result = findProductOfSum(2020)(input)
  t.equal(result, null)
});
