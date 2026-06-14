import { describe, expect, it } from 'vitest'

import { calcPoints } from './points'

describe('calcPoints', () => {
  it('4人分のスコアから順位・素点P・最終Pを計算する', () => {
    const result = calcPoints(
      [
        { userId: 'a', rawScore: 50000 },
        { userId: 'b', rawScore: 30000 },
        { userId: 'c', rawScore: 15000 },
        { userId: 'd', rawScore: 5000 },
      ],
      false,
    )

    // 2,3,4位: (rawScore - 30000)/1000 + ウマ
    // b: 0 + 10 = 10, c: -15 + -10 = -25, d: -25 + -20 = -45
    // 1位 a: -(10 + -25 + -45) = 60
    expect(result).toEqual([
      { userId: 'a', rawScore: 50000, rank: 1, subScore: 60, finalScore: 3000 },
      { userId: 'b', rawScore: 30000, rank: 2, subScore: 10, finalScore: 500 },
      { userId: 'c', rawScore: 15000, rank: 3, subScore: -25, finalScore: -1250 },
      { userId: 'd', rawScore: 5000, rank: 4, subScore: -45, finalScore: -2250 },
    ])
  })

  it('素点Pの合計は常に0になる（1位が残差を吸収）', () => {
    const result = calcPoints(
      [
        { userId: 'a', rawScore: 42300 },
        { userId: 'b', rawScore: 28700 },
        { userId: 'c', rawScore: 19100 },
        { userId: 'd', rawScore: 9900 },
      ],
      false,
    )
    const sum = result.reduce((s, r) => s + r.subScore, 0)
    expect(sum).toBe(0)
  })

  it('チップ枚数を最終Pにのみ100倍で加算する', () => {
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
    // a (1位): 素点P = -(0+10 + -10+-10 + -20+-20) = -(-50) = 50 ? いや
    // 待って: b(2位) 素点P = 0+10 = 10, c(3位) = -10 + -10 = -20, d(4位) = -20 + -20 = -40
    // a(1位) = -(10 + -20 + -40) = 50
    // a の最終P = 50 * 50 + 3 * 100 = 2500 + 300 = 2800
    // c の最終P = -20 * 50 + 1 * 100 = -1000 + 100 = -900
    expect(a.subScore).toBe(50)
    expect(a.finalScore).toBe(2800)
    expect(c.subScore).toBe(-20)
    expect(c.finalScore).toBe(-900)
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
    const a = result.find((r) => r.userId === 'a')!
    expect(a.subScore).toBe(50)
    expect(a.finalScore).toBe(2500) // チップ無視
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
