import test from "tape";
import { countChar, countValid } from "./passwordPhilosophy";

test("2. has a valid number (from example)", (t) => {
  t.plan(1);
  const input = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];
  const result = countValid(input);
  t.equal(result, 2);
});

test("2. multi digit numbers", (t) => {
  t.plan(1);
  const input = ["11-111 a: aaaaaaaaaaaacde"];
  const result = countValid(input);
  t.equal(result, 1);
});

test("2. no results", (t) => {
  t.plan(1);
  const input = ["11-12 a: acde"];
  const result = countValid(input);
  t.equal(result, 0);
});

test("countChar", (t) => {
  t.plan(1)
  const count = countChar('a')('abc a')
  t.equal(count, 2)
})

test("countChar empty", (t) => {
  t.plan(1)
  const count = countChar('a')('')
  t.equal(count, 0)
})