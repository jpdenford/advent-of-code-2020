import R from 'ramda'
import { readFileLines } from '../fileUtils'
import { matchAllGroups } from '../stringUtils'

interface InnerBag {
  count: number
  colour: string
}

interface BagRules {
  [colour: string]: InnerBag[]
}

const processBag = (bagInfo: string): InnerBag => {
  const containedBag = /\s*([0-9]) (\w+\s\w+)+ bags*\.*\s*/g
  const [_, count, colour] = matchAllGroups(containedBag)(bagInfo)
  return { count: parseInt(count), colour }
}

const parseContainedBags = (innerBags: string): InnerBag[] =>
  R.pipe(R.split(','), R.map(processBag))(innerBags)

export const parseBagRules = (line: string): BagRules => {
  // e.g. 'vibrant lavender bags contain 1 shiny coral bag, 4 dotted purple bags.'
  //      'clear violet bags contain no other bags.'
  const [outerBag, innerBagsDescription] = line.split('bags contain')
  const innerBags = innerBagsDescription.includes('no other bags')
    ? []
    : parseContainedBags(innerBagsDescription)
  return { [outerBag.trim()]: innerBags }
}

export const findBagsThatEventuallyContain = (colour: string) => (
  allColours: BagRules
): string[] => {
  if (R.isEmpty(allColours)) return []
  const matching = R.filter(
    (x) => x.some((innerBag) => innerBag.colour === colour),
    allColours
  )
  const outerBagColours = Object.keys(matching)
  const remainingBagRules = R.omit(outerBagColours, allColours)
  const outerOuterBagColours: string[] = outerBagColours
    .map((colour) => findBagsThatEventuallyContain(colour)(remainingBagRules))
    .flat()
  return Array.from(new Set([...outerBagColours, ...outerOuterBagColours]))
}

export const requiredInsideHelper = (colour: string) => (
  rules: BagRules
): number => {
  const bagsInside = rules[colour]
  const x = R.pipe(
    R.map((ib: InnerBag) => requiredInsideHelper(ib.colour)(rules) * ib.count),
    R.sum
  )(bagsInside)
  return x + 1
}

export const requiredInside = (colour: string) => (rules: BagRules) =>
  requiredInsideHelper(colour)(rules) - 1

export const makeRules = R.pipe(
  (strs: string[]) => strs.filter((s) => !!s),
  R.map(parseBagRules),
  R.reduce<BagRules, BagRules>(Object.assign, {}) // only one of each colour
)

export const main1 = R.pipe(
  readFileLines,
  makeRules,
  findBagsThatEventuallyContain('shiny gold'),
  R.length
)

export const main2 = R.pipe(
  readFileLines,
  makeRules,
  requiredInside('shiny gold')
)
