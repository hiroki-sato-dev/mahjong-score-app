import { describe, expect, it } from 'vitest'

import { calcPoints } from './points'

describe('calcPoints', () => {
  it('4人分のスコアから順位と最終ポイントを計算する', () => {
    const result = calcPoints(
      [
        { userId: 'a', rawScore: 50000 },
        { userId: 'b', rawScore: 30000 },
        { userId: 'c', rawScore: 15000 },
        { userId: 'd', rawScore: 5000 },
      ],
      false,
    )

    expect(result).toEqual([
      { userId: 'a', rawScore: 50000, rank: 1, finalScore: 1000 + 20 },
      { userId: 'b', rawScore: 30000, rank: 2, finalScore: 0 + 10 },
      { userId: 'c', rawScore: 15000, rank: 3, finalScore: -750 - 10 },
      { userId: 'd', rawScore: 5000, rank: 4, finalScore: -1250 - 20 },
    ])
  })

  it('チップ枚数を加算する', () => {
    const result = calcPoints(
      [
        { userId: 'a', rawScore: 40000, chipCount: 3 },
        { userId: 'b', rawScore: 30000, chipCount: 0 },
        { userId: 'c', rawScore: 20000, chipCount: 1 },
        { userId: 'd', rawScore: 10000, chipCount: 0 },
      ],
      true,
    )

    const a = result.find((r) => r.userId === 'a')!
    const c = result.find((r) => r.userId === 'c')!
    expect(a.finalScore).toBe(500 + 20 + 300)
    expect(c.finalScore).toBe(-500 - 10 + 100)
  })

  it('チップなしの半荘では chipCount を無視する', () => {
    const result = calcPoints(
      [
        { userId: 'a', rawScore: 40000, chipCount: 5 },
        { userId: 'b', rawScore: 30000 },
        { userId: 'c', rawScore: 20000 },
        { userId: 'd', rawScore: 10000 },
      ],
      false,
    )
    expect(result.find((r) => r.userId === 'a')!.finalScore).toBe(500 + 20)
  })

  it('同点でも先に登録された方が上位になる', () => {
    const result = calcPoints(
      [
        { userId: 'a', rawScore: 25000 },
        { userId: 'b', rawScore: 25000 },
        { userId: 'c', rawScore: 25000 },
        { userId: 'd', rawScore: 25000 },
      ],
      false,
    )
    const ranks = result.map((r) => r.rank).sort()
    expect(ranks).toEqual([1, 2, 3, 4])
  })

  it('4人分でない場合はエラーになる', () => {
    expect(() =>
      calcPoints(
        [
          { userId: 'a', rawScore: 30000 },
          { userId: 'b', rawScore: 30000 },
        ],
        false,
      ),
    ).toThrow('スコアは4人分必要です')
  })
})
