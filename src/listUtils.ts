import R from 'ramda'

export const splitWhenEvery = (predicate: (first?: number, second?:number) => boolean) => (ns: number[]): number[][] => {
  if(ns.length === 0) return []
  let chunk: number[] = []
  for(let i = 0; i < ns.length; i++) {
    chunk = chunk.concat(ns[i])
    if(predicate(ns[i], ns[i + 1])) {
      const remainingChunks = splitWhenEvery(predicate)(ns.slice(i + 1))
      return chunk.length > 0 ? [chunk, ...remainingChunks] : remainingChunks
    }
  }
  return [chunk]
}


export const naturally = R.ascend(R.identity)

export const natSort = R.sort(naturally)
