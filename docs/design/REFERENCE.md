# デザインリファレンス

実装時の参照用まとめ。デザインの原本は `docs/design/hi-fi/` に格納。

---

## デザイントークン

### カラー

| トークン | 値 | 用途 |
|---|---|---|
| `paper` | `#fafaf7` | ページ背景 |
| `surface` | `#ffffff` | カード・テーブル背景 |
| `line` | `#e8e5dc` | 通常の境界線 |
| `line-strong` | `#d4d1c8` | 強調境界線 |
| `ink-1` | `#1a1a1a` | 見出し・主要テキスト |
| `ink-2` | `#52524d` | 本文 |
| `ink-3` | `#9a978f` | ラベル・補助テキスト |
| `felt` | `#0e5a3c` | プライマリ・プラス収支 |
| `felt-soft` | `#e8f0eb` | プライマリ淡 |
| `felt-deep` | `#0a4530` | プライマリ暗 |
| `neg` | `#c8312b` | マイナス収支・危険 |
| `neg-soft` | `#fbeae8` | マイナス淡 |
| `gold` | `#a8893a` | 1位アクセント |
| `gold-soft` | `#f5eed8` | 1位淡 |

### フォント

| 用途 | フォント |
|---|---|
| UIテキスト全般 | Noto Sans JP (400/500/600/700) |
| 数値・コード | JetBrains Mono (400/500/600) + `font-feature-settings: "tnum"` |

### 影

| トークン | 用途 |
|---|---|
| `shadow-card` | カード・通常要素 |
| `shadow-pop` | モーダル・ポップアップ |

### Tailwind v4 設定（`globals.css` の `@theme` に記述）

```css
@theme {
  --color-paper: #fafaf7;
  --color-surface: #ffffff;
  --color-line: #e8e5dc;
  --color-line-strong: #d4d1c8;
  --color-ink-1: #1a1a1a;
  --color-ink-2: #52524d;
  --color-ink-3: #9a978f;
  --color-felt: #0e5a3c;
  --color-felt-soft: #e8f0eb;
  --color-felt-deep: #0a4530;
  --color-neg: #c8312b;
  --color-neg-soft: #fbeae8;
  --color-gold: #a8893a;
  --color-gold-soft: #f5eed8;

  --font-sans: "Noto Sans JP", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --shadow-card: 0 1px 2px rgba(20,18,12,.04), 0 1px 1px rgba(20,18,12,.03);
  --shadow-pop: 0 4px 16px rgba(20,18,12,.08), 0 1px 2px rgba(20,18,12,.04);
}
```

---

## カスタムCSSクラス

```css
.num        /* JetBrains Mono + tnum（数値全般に使う） */
.pai        /* 麻雀牌スタイル 22×30px */
.pai.lg     /* 大きい牌 32×42px */
.pai.red    /* 赤文字（1位・中など） */
.pai.green  /* 緑文字（3位・發など） */
.pai.gold   /* 金文字（2位など） */
.ulink      /* アンダーラインリンク */
.felt-bg    /* 雀卓グリーングラデーション背景 */
.dotline    /* 点線ディバイダー */
```

---

## UIコンポーネント Props

### Button `components/ui/Button.tsx`

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
}
```

### Field `components/ui/Field.tsx`

```typescript
interface FieldProps {
  label?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'date'
  leadingIcon?: IconComponent
  trailingIcon?: IconComponent
  hint?: string
  error?: string
}
```

### NumField `components/ui/Field.tsx`

```typescript
interface NumFieldProps {
  label?: string
  value?: number
  suffix?: string   // 例: '点', '枚'
}
```

### Toggle `components/ui/Toggle.tsx`

```typescript
interface ToggleProps {
  on: boolean
  onChange: (next: boolean) => void
  label?: string
  size?: 'md' | 'lg'
  disabled?: boolean
}
```

### Tabs `components/ui/Tabs.tsx`

```typescript
interface TabsProps {
  tabs: string[]
  active: number
  onChange: (i: number) => void
}
```

### Chip `components/ui/Chip.tsx`

```typescript
interface ChipProps {
  children: React.ReactNode
  tone?: 'neutral' | 'felt' | 'neg' | 'gold'
  size?: 'sm' | 'md'
  selected?: boolean
  onClick?: () => void
}
```

### Stat `components/ui/Stat.tsx`

```typescript
interface StatProps {
  label: string       // 例: '累計ポイント'
  value: string       // 整形済み文字列
  sub?: string        // 例: '42 戦'
  tone?: 'neutral' | 'pos' | 'neg' | 'gold'
  big?: boolean       // 32px表示
}
```

### Card `components/ui/Card.tsx`

```typescript
interface CardProps {
  title?: string
  sub?: string
  action?: React.ReactNode
  pad?: boolean       // default: true
  className?: string
  children: React.ReactNode
}
```

---

## レイアウトコンポーネント Props

### Logo `components/layout/Logo.tsx`

```typescript
interface LogoProps { size?: number }  // default 20
```

### TopNav `components/layout/TopNav.tsx`

```typescript
interface TopNavProps { role?: Role; name?: string }
// アクティブタブは usePathname() で判定
```

### AdminSidebar `components/layout/AdminSidebar.tsx`

```typescript
interface AdminSidebarProps { active?: 'members' | 'scores' | 'settings' }
```

---

## 麻雀ドメインコンポーネント Props

### ScoreSeat `components/mahjong/ScoreSeat.tsx`

```typescript
interface ScoreSeatProps {
  wind: '東' | '南' | '西' | '北'
  member: Member
  rawPoints: number
  result?: ScoreResult
  onPointsChange: (n: number) => void
  onMemberSelect: () => void
}
```

### MemberCard `components/mahjong/MemberCard.tsx`

```typescript
interface MemberCardProps {
  member: Member
  stats: { total: number; games: number; avg: number; rank: number; last: string }
  trend: number[]
  onClick?: () => void
}
```

---

## 型定義 `types/index.ts`

```typescript
export type Role = 'member' | 'admin'

export interface Member {
  id: string
  name: string
  email: string
  role: Role
  initial: string    // アバター用一文字
  createdAt: string  // ISO 8601
}

export interface Score {
  memberId: string
  rawPoints: number  // 素点（例: 42300）
  tipCount: number   // チップ枚数（本人分）
}

export interface Hanchan {
  id: string
  playedAt: string   // ISO 8601
  hasTip: boolean
  scores: Score[]    // 4人分
  createdBy: string  // memberId
}

export interface ScoreResult {
  memberId: string
  rank: 1 | 2 | 3 | 4
  rawPoints: number
  uma: number        // ±20, ±10
  oka: number        // 1位のみ +30
  tipP: number
  total: number      // 最終P
}
```

---

## ポイント計算ロジック `lib/points.ts`

```typescript
const RETURN_POINT = 30000      // 返し
const POINT_RATE  = 50 / 1000  // 1000点 = 50P
const UMA = [20, 10, -10, -20] // 1位〜4位
const TIP_P = 100              // 1枚 = 100P

export function calcPoints(scores: Score[], hasTip: boolean): ScoreResult[] {
  const ranked = [...scores].sort((a, b) => b.rawPoints - a.rawPoints)

  return ranked.map((s, i) => {
    const rank = (i + 1) as 1 | 2 | 3 | 4
    const base = (s.rawPoints - RETURN_POINT) * POINT_RATE
    const oka  = rank === 1 ? 30 : 0
    const uma  = UMA[i]
    const tipP = hasTip ? s.tipCount * TIP_P : 0
    return {
      memberId: s.memberId,
      rank, rawPoints: s.rawPoints,
      uma, oka, tipP,
      total: Math.round((base + uma + oka + tipP) * 10) / 10,
    }
  })
}
```

---

## ルーティング表

| パス | レイアウト | 画面 | アクセス |
|---|---|---|---|
| `/login` | (none) | LoginScreen | 未認証 |
| `/members` | (main) | MembersScreen | 全員 |
| `/score/new` | (main) | ScoreInputScreen | 全員 |
| `/results?tab=daily` | (main) | ResultsDailyScreen | 全員 |
| `/results?tab=total` | (main) | ResultsTotalScreen | 全員 |
| `/ranking` | (main) | RankingScreen | 全員 |
| `/admin/members` | admin | AdminMembersScreen | 幹部のみ |
| `/admin/scores` | admin | AdminScoresScreen | 幹部のみ |

---

## Zustandストア構成

```
stores/
├── useAuthStore.ts     // ログインユーザー・ロール
├── useMembersStore.ts  // 部員一覧
└── useGamesStore.ts    // 半荘記録（localStorageにpersist）
```

---

## デザイン原本

`docs/design/hi-fi/` に以下が入っている（ブラウザで開いて視覚確認できる）：

| ファイル | 内容 |
|---|---|
| `Hi-Fi Design.html` | 全画面の高解像度デザイン（PC版） |
| `Component Handoff.html` | コンポーネント設計ドキュメント |
| `hifi-components.jsx` | 共通コンポーネント・チャートの実装例 |
| `hifi-screens-main.jsx` | ログイン〜ランキング画面 |
| `hifi-screens-admin.jsx` | 幹部管理画面 |
| `hifi-screens-misc.jsx` | 404・500・デザイントークン凡例 |
| `hifi-mobile.jsx` | スマホ版全画面 |
