import test from 'tape'
import R from 'ramda'
import { findBagsThatEventuallyContain, makeRules, parseBagRules, requiredInside, requiredInsideHelper } from './handyHaversacks'

test('7 shared elements', (t) => {
  t.plan(1)
  const input =
    'light red bags contain 1 bright white bag, 2 muted yellow bags.'
  const bagRules = parseBagRules(input)
  t.isEquivalent(bagRules, {
    'light red': [
      { count: 1, colour: 'bright white' },
      { count: 2, colour: 'muted yellow' },
    ],
  })
})

test('7.1 findBagsThatEventuallyContain', (t) => {
  t.plan(2)
  const bagRules = {
    red: [
      { count: 1, colour: 'white' },
      { count: 2, colour: 'yellow' },
    ],
    white: [{ count: 1, colour: 'green' }],
  }
  const contains = findBagsThatEventuallyContain('green')(bagRules)
  t.equals(contains.length, 2)
  t.isEquivalent(new Set(contains), new Set(['red', 'white']))

})

test('7.2 (example)', (t) => {
  t.plan(1)
  const input = [
    'shiny gold bags contain 2 dark red bags.',
    'dark red bags contain 2 dark orange bags.',
    'dark orange bags contain 2 dark yellow bags.',
    'dark yellow bags contain 2 dark green bags.',
    'dark green bags contain 2 dark blue bags.',
    'dark blue bags contain 2 dark violet bags.',
    'dark violet bags contain no other bags.',
  ]
  const rules = makeRules(input)
  const required = requiredInside('shiny gold')(rules)

  t.equals(required, 126)
})
