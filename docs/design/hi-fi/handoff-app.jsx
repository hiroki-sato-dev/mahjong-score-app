// コンポーネント設計ハンドオフドキュメント

const { useState } = React;

// ─── ヘルパー ────────────────────────────────────────────────
function Code({ children }){
  return <pre className="code" dangerouslySetInnerHTML={{__html:children}}/>;
}

function Section({ id, kicker, title, children }){
  return (
    <section id={id} className="mb-16">
      <div className="text-[11px] tracking-[.22em] text-felt uppercase font-medium mb-1">{kicker}</div>
      <h2 className="text-[28px] font-semibold text-ink-1 tracking-tight mb-6">{title}</h2>
      {children}
    </section>
  );
}

// 1つのコンポーネント説明カード
function ComponentDoc({ name, path, desc, propsCode, preview, usedIn }){
  return (
    <article className="bg-surface border border-line rounded-md shadow-card overflow-hidden">
      <header className="px-5 pt-4 pb-3 border-b border-line">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3 className="text-[16px] font-semibold text-ink-1">{name}</h3>
          <span className="num text-[11px] text-ink-3">{path}</span>
        </div>
        {desc && <p className="text-[12.5px] text-ink-2 mt-1 leading-relaxed">{desc}</p>}
      </header>
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-0">
        {/* Props */}
        <div className="p-5 border-b md:border-b-0 md:border-r border-line min-w-0">
          <div className="text-[10px] tracking-wider text-ink-3 uppercase mb-2">Props</div>
          <Code>{propsCode}</Code>
        </div>
        {/* Preview */}
        <div className="p-5 bg-paper/60 min-w-0">
          <div className="text-[10px] tracking-wider text-ink-3 uppercase mb-2">Preview</div>
          <div className="flex flex-wrap gap-3 items-start min-h-[80px]">{preview}</div>
          {usedIn && (
            <div className="mt-4 pt-3 border-t border-line text-[11px] text-ink-3">
              <span className="font-medium text-ink-2">使用箇所: </span>{usedIn.join(' / ')}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// ═══════════════════════════════════════════════════════════
// データ定義
// ═══════════════════════════════════════════════════════════

const TREE = `<span class="dim">src/</span>
├─ <span class="acc">app/</span>                          <span class="dim"># Next.js App Router</span>
│  ├─ (auth)/
│  │  └─ login/page.tsx
│  ├─ (main)/
│  │  ├─ layout.tsx              <span class="dim"># TopNav 付き</span>
│  │  ├─ members/page.tsx
│  │  ├─ score/new/page.tsx
│  │  ├─ results/page.tsx        <span class="dim"># ?tab=daily|total</span>
│  │  └─ ranking/page.tsx
│  ├─ (admin)/admin/
│  │  ├─ layout.tsx              <span class="dim"># AdminSidebar 付き</span>
│  │  ├─ members/page.tsx
│  │  └─ scores/page.tsx
│  ├─ layout.tsx                 <span class="dim"># Root: フォント / Providers</span>
│  ├─ not-found.tsx              <span class="dim"># 404</span>
│  ├─ error.tsx                  <span class="dim"># 500</span>
│  └─ globals.css                <span class="dim"># Tailwind base</span>
│
├─ <span class="acc">components/</span>
│  ├─ ui/                        <span class="dim"># 汎用プリミティブ</span>
│  │  ├─ Button.tsx
│  │  ├─ Field.tsx · NumField.tsx
│  │  ├─ Toggle.tsx · Tabs.tsx
│  │  ├─ Chip.tsx · Stat.tsx
│  │  └─ Card.tsx
│  ├─ layout/
│  │  ├─ Logo.tsx
│  │  ├─ TopNav.tsx · AdminSidebar.tsx
│  │  ├─ MobileAppBar.tsx
│  │  └─ MobileTabBar.tsx
│  ├─ mahjong/                   <span class="dim"># 麻雀ドメイン</span>
│  │  ├─ MahjongTile.tsx · RankBadge.tsx
│  │  ├─ MahjongTable.tsx · ScoreSeat.tsx
│  │  ├─ ScorePreview.tsx
│  │  ├─ MemberCard.tsx · HanchanCard.tsx
│  │  └─ PodiumChart.tsx
│  └─ charts/                    <span class="dim"># Recharts ラッパー</span>
│     ├─ Sparkline.tsx · HBarChart.tsx
│     ├─ LineChart.tsx · VBarChart.tsx
│     └─ RankDistChart.tsx
│
├─ <span class="acc">lib/</span>
│  ├─ points.ts                  <span class="dim"># P計算: calcPoints()</span>
│  ├─ format.ts                  <span class="dim"># fmtP, fmtDate</span>
│  └─ auth.ts                    <span class="dim"># 認証クライアント</span>
│
├─ <span class="acc">stores/</span>                       <span class="dim"># Zustand</span>
│  ├─ useAuthStore.ts
│  ├─ useMembersStore.ts
│  └─ useGamesStore.ts
│
├─ <span class="acc">types/</span>
│  └─ index.ts                   <span class="dim"># Member, Hanchan, Score, Role</span>
│
└─ <span class="meta">tailwind.config.ts</span>            <span class="dim"># デザイントークン</span>`;

const TAILWIND_CONFIG = `<span class="c">// tailwind.config.ts</span>
<span class="k">import</span> type { Config } <span class="k">from</span> <span class="s">'tailwindcss'</span>;

<span class="k">export default</span> {
  content: [<span class="s">'./src/**/*.{ts,tsx}'</span>],
  theme: {
    extend: {
      <span class="p">colors</span>: {
        paper:   <span class="s">'#fafaf7'</span>,
        surface: <span class="s">'#ffffff'</span>,
        line:    <span class="s">'#e8e5dc'</span>,
        <span class="s">'line-strong'</span>: <span class="s">'#d4d1c8'</span>,
        ink:  { <span class="n">1</span>:<span class="s">'#1a1a1a'</span>, <span class="n">2</span>:<span class="s">'#52524d'</span>, <span class="n">3</span>:<span class="s">'#9a978f'</span> },
        felt: { DEFAULT:<span class="s">'#0e5a3c'</span>, soft:<span class="s">'#e8f0eb'</span>, deep:<span class="s">'#0a4530'</span> },
        neg:  { DEFAULT:<span class="s">'#c8312b'</span>, soft:<span class="s">'#fbeae8'</span> },
        gold: { DEFAULT:<span class="s">'#a8893a'</span>, soft:<span class="s">'#f5eed8'</span> },
      },
      <span class="p">fontFamily</span>: {
        sans: [<span class="s">'var(--font-noto-jp)'</span>, <span class="s">'system-ui'</span>],
        mono: [<span class="s">'var(--font-jetbrains)'</span>, <span class="s">'ui-monospace'</span>],
      },
      <span class="p">boxShadow</span>: {
        card: <span class="s">'0 1px 2px rgba(20,18,12,.04), 0 1px 1px rgba(20,18,12,.03)'</span>,
        pop:  <span class="s">'0 4px 16px rgba(20,18,12,.08), 0 1px 2px rgba(20,18,12,.04)'</span>,
      },
    },
  },
} satisfies Config;`;

const TYPES = `<span class="c">// types/index.ts</span>
<span class="k">export type</span> <span class="t">Role</span> = <span class="s">'member'</span> | <span class="s">'admin'</span>;

<span class="k">export interface</span> <span class="t">Member</span> {
  id: <span class="t">string</span>;
  name: <span class="t">string</span>;
  email: <span class="t">string</span>;
  role: <span class="t">Role</span>;
  initial: <span class="t">string</span>;       <span class="c">// アバター用一文字</span>
  createdAt: <span class="t">string</span>;     <span class="c">// ISO 8601</span>
}

<span class="k">export interface</span> <span class="t">Score</span> {
  memberId: <span class="t">string</span>;
  rawPoints: <span class="t">number</span>;     <span class="c">// 素点 (例: 42300)</span>
  tipCount: <span class="t">number</span>;      <span class="c">// チップ枚数 (本人分)</span>
}

<span class="k">export interface</span> <span class="t">Hanchan</span> {
  id: <span class="t">string</span>;
  playedAt: <span class="t">string</span>;      <span class="c">// 日時 ISO</span>
  hasTip: <span class="t">boolean</span>;
  scores: <span class="t">Score</span>[];       <span class="c">// 4人ぶん</span>
  createdBy: <span class="t">string</span>;     <span class="c">// memberId (記録者)</span>
}

<span class="c">// 計算結果 (派生)</span>
<span class="k">export interface</span> <span class="t">ScoreResult</span> {
  memberId: <span class="t">string</span>;
  rank: <span class="n">1</span> | <span class="n">2</span> | <span class="n">3</span> | <span class="n">4</span>;
  rawPoints: <span class="t">number</span>;
  uma: <span class="t">number</span>;           <span class="c">// ±20, ±10</span>
  oka: <span class="t">number</span>;           <span class="c">// 1位のみ +30 (返し30000基準)</span>
  tipP: <span class="t">number</span>;          <span class="c">// チップP</span>
  total: <span class="t">number</span>;         <span class="c">// 最終P</span>
}`;

const CALC_POINTS = `<span class="c">// lib/points.ts — 4人分の素点から最終Pを計算</span>
<span class="k">import</span> type { Score, ScoreResult } <span class="k">from</span> <span class="s">'@/types'</span>;

<span class="k">const</span> RETURN_POINT = <span class="n">30000</span>;        <span class="c">// 返し</span>
<span class="k">const</span> POINT_RATE  = <span class="n">50</span> / <span class="n">1000</span>;     <span class="c">// 1000点 = 50P</span>
<span class="k">const</span> UMA = [<span class="n">20</span>, <span class="n">10</span>, -<span class="n">10</span>, -<span class="n">20</span>];     <span class="c">// 1位〜4位</span>
<span class="k">const</span> TIP_P = <span class="n">100</span>;                <span class="c">// 1枚100P</span>

<span class="k">export function</span> <span class="t">calcPoints</span>(
  scores: <span class="t">Score</span>[],
  hasTip: <span class="t">boolean</span>,
): <span class="t">ScoreResult</span>[] {
  <span class="c">// 1) ランク決定 (素点 desc)</span>
  <span class="k">const</span> ranked = [...scores]
    .map((s, i) =&gt; ({ ...s, _idx: i }))
    .sort((a, b) =&gt; b.rawPoints - a.rawPoints);

  <span class="c">// 2) 各人の計算</span>
  <span class="k">return</span> ranked.map((s, i) =&gt; {
    <span class="k">const</span> rank = (i + <span class="n">1</span>) <span class="k">as</span> <span class="n">1</span>|<span class="n">2</span>|<span class="n">3</span>|<span class="n">4</span>;
    <span class="k">const</span> base = (s.rawPoints - RETURN_POINT) * POINT_RATE;
    <span class="k">const</span> oka = rank === <span class="n">1</span> ? <span class="n">30</span> : <span class="n">0</span>;     <span class="c">// 4人×返しの差分=20000=+30P</span>
    <span class="k">const</span> uma = UMA[i];
    <span class="k">const</span> tipP = hasTip ? s.tipCount * TIP_P : <span class="n">0</span>;
    <span class="k">return</span> {
      memberId: s.memberId,
      rank, rawPoints: s.rawPoints,
      uma, oka, tipP,
      total: <span class="t">Math</span>.round((base + uma + oka + tipP) * <span class="n">10</span>) / <span class="n">10</span>,
    };
  });
}`;

const ZUSTAND_STORE = `<span class="c">// stores/useGamesStore.ts</span>
<span class="k">import</span> { create } <span class="k">from</span> <span class="s">'zustand'</span>;
<span class="k">import</span> { persist } <span class="k">from</span> <span class="s">'zustand/middleware'</span>;
<span class="k">import</span> type { Hanchan } <span class="k">from</span> <span class="s">'@/types'</span>;

<span class="k">interface</span> <span class="t">GamesState</span> {
  games: <span class="t">Hanchan</span>[];
  add:    (g: <span class="t">Hanchan</span>) =&gt; <span class="t">void</span>;
  update: (id: <span class="t">string</span>, patch: <span class="t">Partial</span>&lt;<span class="t">Hanchan</span>&gt;) =&gt; <span class="t">void</span>;
  remove: (id: <span class="t">string</span>) =&gt; <span class="t">void</span>;
}

<span class="k">export const</span> <span class="t">useGamesStore</span> = create&lt;<span class="t">GamesState</span>&gt;()(
  persist(
    (set) =&gt; ({
      games: [],
      add:    (g) =&gt; set((s) =&gt; ({ games: [g, ...s.games] })),
      update: (id, patch) =&gt; set((s) =&gt; ({
        games: s.games.map((g) =&gt; g.id === id ? { ...g, ...patch } : g),
      })),
      remove: (id) =&gt; set((s) =&gt; ({ games: s.games.filter((g) =&gt; g.id !== id) })),
    }),
    { name: <span class="s">'mahjong-games'</span> },
  ),
);`;

const APP_LAYOUT = `<span class="c">// app/(main)/layout.tsx</span>
<span class="k">import</span> { TopNav } <span class="k">from</span> <span class="s">'@/components/layout/TopNav'</span>;

<span class="k">export default function</span> <span class="t">MainLayout</span>({ children }: { children: <span class="t">React</span>.<span class="t">ReactNode</span> }) {
  <span class="k">return</span> (
    &lt;<span class="t">div</span> className=<span class="s">"min-h-screen bg-paper flex flex-col"</span>&gt;
      &lt;<span class="t">TopNav</span> /&gt;
      &lt;<span class="t">main</span> className=<span class="s">"flex-1"</span>&gt;{children}&lt;/<span class="t">main</span>&gt;
    &lt;/<span class="t">div</span>&gt;
  );
}`;

// ═══════════════════════════════════════════════════════════
// 描画
// ═══════════════════════════════════════════════════════════

function App(){
  return (
    <div className="min-h-screen bg-paper">
      {/* Top sticky header */}
      <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur border-b border-line">
        <div className="max-w-[1080px] mx-auto px-8 h-14 flex items-center gap-4">
          <Logo size={18}/>
          <span className="text-[12px] text-ink-3">/</span>
          <span className="text-[13px] font-medium text-ink-1">コンポーネント設計</span>
          <nav className="ml-auto flex items-center gap-1 text-[12px]">
            {[
              ['#structure','構成'],
              ['#tokens','トークン'],
              ['#ui','UI'],
              ['#layout','Layout'],
              ['#mahjong','麻雀'],
              ['#charts','Charts'],
              ['#logic','ロジック'],
              ['#roadmap','進め方'],
            ].map(([h,l])=>(
              <a key={h} href={h} className="px-2.5 h-8 rounded-md text-ink-2 hover:bg-paper hover:text-ink-1 flex items-center">{l}</a>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-[1080px] mx-auto px-8 py-12">
        {/* Intro */}
        <div className="mb-14">
          <div className="text-[11px] tracking-[.22em] text-felt uppercase font-medium mb-2">Handoff</div>
          <h1 className="text-[40px] font-semibold tracking-tight text-ink-1 leading-[1.15] mb-3">
            コンポーネント設計 / 実装ガイド
          </h1>
          <p className="text-[14px] text-ink-2 leading-relaxed max-w-[680px]">
            <span className="font-semibold text-ink-1">Next.js App Router + TypeScript + Tailwind CSS + Zustand</span> を前提とした、
            高解像度デザインに対応するコンポーネント分割案です。<br/>
            上から順に作っていけば、デザインの全画面が組み上がる構成になっています。
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-5 text-[11px]">
            <Chip tone="felt" selected>Next.js 14+</Chip>
            <Chip tone="felt" selected>TypeScript</Chip>
            <Chip tone="felt" selected>Tailwind</Chip>
            <Chip tone="felt" selected>Zustand</Chip>
            <Chip tone="neutral">Recharts</Chip>
            <Chip tone="neutral">Vitest</Chip>
          </div>
        </div>

        {/* ─── 1. ディレクトリ構成 ─── */}
        <Section id="structure" kicker="01 — Directory" title="ディレクトリ構成">
          <p className="text-[13px] text-ink-2 leading-relaxed mb-5 max-w-[720px]">
            <code className="num text-ink-1">src/</code> 配下を 4 レイヤーに分けます。
            <b>app/</b> はページ、<b>components/</b> は UI、<b>lib/</b> は純粋ロジック、<b>stores/</b> は状態。
            責務がはっきりするので、画面追加でもファイルがあふれません。
          </p>
          <div className="bg-surface border border-line rounded-md shadow-card p-5">
            <pre className="tree" dangerouslySetInnerHTML={{__html:TREE}}/>
          </div>
        </Section>

        {/* ─── 2. デザイントークン ─── */}
        <Section id="tokens" kicker="02 — Tokens" title="デザイントークン / Tailwind 設定">
          <p className="text-[13px] text-ink-2 leading-relaxed mb-5 max-w-[720px]">
            まず <code className="num text-ink-1">tailwind.config.ts</code> にトークンを乗せます。
            これだけで本デザインの色・タイポ・影が全て使えるようになります。
          </p>
          <Code>{TAILWIND_CONFIG}</Code>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              ['bg-felt text-white','felt'],
              ['bg-felt-soft text-felt','felt-soft'],
              ['bg-neg text-white','neg'],
              ['bg-neg-soft text-neg','neg-soft'],
              ['bg-gold text-white','gold'],
              ['bg-gold-soft text-gold','gold-soft'],
              ['bg-paper text-ink-1 border border-line','paper'],
              ['bg-surface text-ink-1 border border-line','surface'],
            ].map(([cn,name])=>(
              <div key={name} className={"h-12 rounded-md flex items-center justify-center text-[12px] font-medium "+cn}>{name}</div>
            ))}
          </div>
        </Section>

        {/* ─── 3. UI プリミティブ ─── */}
        <Section id="ui" kicker="03 — UI Primitives" title="共通UIプリミティブ">
          <p className="text-[13px] text-ink-2 leading-relaxed mb-5 max-w-[720px]">
            画面に依存しない汎用的なコンポーネント群。<code className="num text-ink-1">components/ui/</code>に置きます。
            まずここを 8 個作れば、残りの画面実装はほぼ組み立て作業になります。
          </p>
          <div className="grid grid-cols-1 gap-5">

            <ComponentDoc
              name="Button" path="components/ui/Button.tsx"
              desc="主要 / 副次 / ゴースト / 危険の 4 種類。アイコン + ラベルにも対応。サイズは sm / md / lg。"
              propsCode={`<span class="k">interface</span> <span class="t">ButtonProps</span> <span class="k">extends</span> <span class="t">React</span>.<span class="t">ButtonHTMLAttributes</span>&lt;<span class="t">HTMLButtonElement</span>&gt; {
  <span class="p">kind</span>?:  <span class="s">'primary'</span> | <span class="s">'secondary'</span> | <span class="s">'ghost'</span> | <span class="s">'danger'</span>;
  <span class="p">size</span>?:  <span class="s">'sm'</span> | <span class="s">'md'</span> | <span class="s">'lg'</span>;
  <span class="p">icon</span>?:  <span class="t">React</span>.<span class="t">FC</span>&lt;<span class="t">SVGProps</span>&gt;;
  <span class="p">loading</span>?: <span class="t">boolean</span>;
}`}
              preview={<>
                <Button kind="primary">登録する</Button>
                <Button kind="secondary">下書き</Button>
                <Button kind="ghost">キャンセル</Button>
                <Button kind="danger">削除</Button>
                <Button kind="primary" size="sm" icon={Icon.plus}>追加</Button>
              </>}
              usedIn={['全画面','スコア入力','管理画面']}
            />

            <ComponentDoc
              name="Field / NumField" path="components/ui/Field.tsx"
              desc="テキスト入力と数値入力。leadingIcon / trailingIcon に対応。NumField は数値専用で大きめフォント。"
              propsCode={`<span class="k">interface</span> <span class="t">FieldProps</span> {
  <span class="p">label</span>?: <span class="t">string</span>;
  <span class="p">value</span>: <span class="t">string</span>;
  <span class="p">onChange</span>: (v: <span class="t">string</span>) =&gt; <span class="t">void</span>;
  <span class="p">placeholder</span>?: <span class="t">string</span>;
  <span class="p">type</span>?: <span class="s">'text'</span> | <span class="s">'email'</span> | <span class="s">'password'</span> | <span class="s">'date'</span>;
  <span class="p">leadingIcon</span>?: <span class="t">IconComponent</span>;
  <span class="p">trailingIcon</span>?: <span class="t">IconComponent</span>;
  <span class="p">hint</span>?: <span class="t">string</span>;
  <span class="p">error</span>?: <span class="t">string</span>;
}`}
              preview={<>
                <Field label="メール" value="taro@example.com" leadingIcon={Icon.user} className="w-[220px]"/>
                <NumField label="チップ枚数" value="3" suffix="枚"/>
              </>}
              usedIn={['ログイン','スコア入力','管理画面']}
            />

            <ComponentDoc
              name="Toggle" path="components/ui/Toggle.tsx"
              desc="チップあり/なし、設定スイッチ用。size = lg をスコア入力で使用。"
              propsCode={`<span class="k">interface</span> <span class="t">ToggleProps</span> {
  <span class="p">on</span>: <span class="t">boolean</span>;
  <span class="p">onChange</span>: (next: <span class="t">boolean</span>) =&gt; <span class="t">void</span>;
  <span class="p">label</span>?: <span class="t">string</span>;
  <span class="p">size</span>?: <span class="s">'md'</span> | <span class="s">'lg'</span>;
  <span class="p">disabled</span>?: <span class="t">boolean</span>;
}`}
              preview={<>
                <Toggle on label="チップあり"/>
                <Toggle label="OFF"/>
                <Toggle on size="lg" label="lg"/>
              </>}
              usedIn={['スコア入力']}
            />

            <ComponentDoc
              name="Tabs" path="components/ui/Tabs.tsx"
              desc="成績確認画面のタブ。アンダーラインスタイル。controlled / URL クエリで状態管理する想定。"
              propsCode={`<span class="k">interface</span> <span class="t">TabsProps</span> {
  <span class="p">tabs</span>: <span class="t">string</span>[];
  <span class="p">active</span>: <span class="t">number</span>;
  <span class="p">onChange</span>: (i: <span class="t">number</span>) =&gt; <span class="t">void</span>;
}`}
              preview={<div className="w-full"><Tabs tabs={['日別','累計']} active={0}/></div>}
              usedIn={['成績確認']}
            />

            <ComponentDoc
              name="Chip" path="components/ui/Chip.tsx"
              desc="フィルター・ラベル用の小さなバッジ。tone と selected で見た目が変わる。"
              propsCode={`<span class="k">interface</span> <span class="t">ChipProps</span> {
  <span class="p">children</span>: <span class="t">React</span>.<span class="t">ReactNode</span>;
  <span class="p">tone</span>?: <span class="s">'neutral'</span> | <span class="s">'felt'</span> | <span class="s">'neg'</span> | <span class="s">'gold'</span>;
  <span class="p">size</span>?: <span class="s">'sm'</span> | <span class="s">'md'</span>;
  <span class="p">selected</span>?: <span class="t">boolean</span>;
  <span class="p">onClick</span>?: () =&gt; <span class="t">void</span>;
}`}
              preview={<>
                <Chip tone="neutral">全期間</Chip>
                <Chip tone="felt" selected>5月</Chip>
                <Chip tone="gold">幹部</Chip>
                <Chip tone="neg">−1,120</Chip>
              </>}
              usedIn={['期間フィルター','ロール表示','成績/ランキング']}
            />

            <ComponentDoc
              name="Stat" path="components/ui/Stat.tsx"
              desc="ラベル + 大きい数字 + 補足 の縦並びカード内コンテンツ。tone で色が変わる。"
              propsCode={`<span class="k">interface</span> <span class="t">StatProps</span> {
  <span class="p">label</span>: <span class="t">string</span>;       <span class="c">// 例: "累計ポイント"</span>
  <span class="p">value</span>: <span class="t">string</span>;       <span class="c">// 表示用 (fmtP 等で整形済み)</span>
  <span class="p">sub</span>?: <span class="t">string</span>;        <span class="c">// 例: "42 戦"</span>
  <span class="p">tone</span>?: <span class="s">'neutral'</span> | <span class="s">'pos'</span> | <span class="s">'neg'</span> | <span class="s">'gold'</span>;
  <span class="p">big</span>?: <span class="t">boolean</span>;       <span class="c">// 32px 表示にする</span>
}`}
              preview={
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Card pad><Stat label="累計P" value="+1,420" tone="pos" big sub="42 戦"/></Card>
                  <Card pad><Stat label="1位率" value="32%" tone="gold" big sub="13 / 42 戦"/></Card>
                </div>
              }
              usedIn={['成績/累計','ランキング','管理ダッシュボード']}
            />

            <ComponentDoc
              name="Card" path="components/ui/Card.tsx"
              desc="セクション囲み。title / sub / action でヘッダーが付く。pad={false} で中身を自由に。"
              propsCode={`<span class="k">interface</span> <span class="t">CardProps</span> {
  <span class="p">title</span>?: <span class="t">string</span>;
  <span class="p">sub</span>?: <span class="t">string</span>;
  <span class="p">action</span>?: <span class="t">React</span>.<span class="t">ReactNode</span>;
  <span class="p">pad</span>?: <span class="t">boolean</span>;       <span class="c">// default: true</span>
  <span class="p">className</span>?: <span class="t">string</span>;
  <span class="p">children</span>: <span class="t">React</span>.<span class="t">ReactNode</span>;
}`}
              preview={
                <div className="w-full">
                  <Card title="累計ポイント推移" sub="月別" action={<Button kind="ghost" size="sm">CSV</Button>}>
                    <div className="h-16 bg-felt-soft/30 rounded flex items-center justify-center text-[11px] text-ink-3">
                      ↑ ここに <span className="num text-ink-2 ml-1">&lt;LineChart&gt;</span> が入る
                    </div>
                  </Card>
                </div>
              }
              usedIn={['全画面']}
            />

          </div>
        </Section>

        {/* ─── 4. Layout ─── */}
        <Section id="layout" kicker="04 — Layout" title="レイアウト / ナビゲーション">
          <p className="text-[13px] text-ink-2 leading-relaxed mb-5 max-w-[720px]">
            画面外周の chrome。<b>TopNav</b> と <b>AdminSidebar</b> は app/(main)/layout.tsx と
            app/(admin)/layout.tsx に置けば、配下のページに自動でつきます。
          </p>
          <div className="grid grid-cols-1 gap-5">
            <ComponentDoc
              name="Logo" path="components/layout/Logo.tsx"
              desc="「中」牌 + サービス名。size で全体スケールが変わる。"
              propsCode={`<span class="k">interface</span> <span class="t">LogoProps</span> { <span class="p">size</span>?: <span class="t">number</span>; }  <span class="c">// default 20</span>`}
              preview={<><Logo size={16}/><Logo size={22}/></>}
              usedIn={['TopNav','AdminSidebar','ログイン','エラー画面']}
            />

            <ComponentDoc
              name="TopNav" path="components/layout/TopNav.tsx"
              desc="部員向けページの共通ヘッダー。useAuthStore からロールと表示名を取得して表示。アクティブタブは usePathname() で判定。"
              propsCode={`<span class="c">// Server Component から渡しても、内部で usePathname しても OK</span>
<span class="k">interface</span> <span class="t">TopNavProps</span> { <span class="p">role</span>?: <span class="t">Role</span>; <span class="p">name</span>?: <span class="t">string</span>; }`}
              preview={<div className="w-full -mx-5 -my-5 border-y border-line"><TopNav active={0}/></div>}
              usedIn={['app/(main)/layout.tsx']}
            />

            <ComponentDoc
              name="AdminSidebar" path="components/layout/AdminSidebar.tsx"
              desc="幹部画面の左サイドバー。3 メニュー (部員管理 / スコア管理 / 設定) + 「通常画面へ戻る」リンク。"
              propsCode={`<span class="k">interface</span> <span class="t">AdminSidebarProps</span> { <span class="p">active</span>?: <span class="s">'members'</span> | <span class="s">'scores'</span> | <span class="s">'settings'</span>; }`}
              preview={
                <div className="w-full border border-line rounded-md overflow-hidden" style={{height:260}}>
                  <AdminSidebar active="部員管理"/>
                </div>
              }
              usedIn={['app/(admin)/layout.tsx']}
            />

            <ComponentDoc
              name="MobileAppBar / MobileTabBar" path="components/layout/Mobile*.tsx"
              desc="スマホ用ヘッダーと下部タブ。FAB風の中央プライマリボタンでスコア入力への動線を確保。Tailwind の sm: 未満で表示切替する想定。"
              propsCode={`<span class="k">interface</span> <span class="t">MobileAppBarProps</span> {
  <span class="p">title</span>?: <span class="t">string</span>; <span class="p">sub</span>?: <span class="t">string</span>;
  <span class="p">leading</span>?: <span class="t">React</span>.<span class="t">ReactNode</span>;   <span class="c">// 戻るボタン等</span>
  <span class="p">trailing</span>?: <span class="t">React</span>.<span class="t">ReactNode</span>;
}
<span class="k">interface</span> <span class="t">MobileTabBarProps</span> { <span class="p">active</span>: <span class="n">0</span> | <span class="n">1</span> | <span class="n">2</span> | <span class="n">3</span>; }`}
              preview={
                <div className="text-[11px] text-ink-3">
                  スマホ版デザインの全画面で使用されます<br/>
                  → <a className="text-felt ulink" href="Hi-Fi Design.html">📱 Hi-Fi Design.html / モバイルセクション</a>
                </div>
              }
              usedIn={['スマホ版全画面']}
            />
          </div>
        </Section>

        {/* ─── 5. 麻雀ドメイン ─── */}
        <Section id="mahjong" kicker="05 — Mahjong Domain" title="麻雀ドメインコンポーネント">
          <p className="text-[13px] text-ink-2 leading-relaxed mb-5 max-w-[720px]">
            このアプリ固有の見た目を持つコンポーネント。
            これらを分けておくと、他の汎用UIから麻雀色を切り離せて、後でテーマ差し替えもしやすくなります。
          </p>
          <div className="grid grid-cols-1 gap-5">

            <ComponentDoc
              name="MahjongTile" path="components/mahjong/MahjongTile.tsx"
              desc="麻雀牌のミニビジュアル。文字 (中・發・1〜9 など) を中央に表示。色トーン指定で字牌の色分けに対応。順位バッジとしても流用。"
              propsCode={`<span class="k">interface</span> <span class="t">MahjongTileProps</span> {
  <span class="p">children</span>: <span class="t">React</span>.<span class="t">ReactNode</span>;   <span class="c">// 例: "中" / 1〜4 (順位)</span>
  <span class="p">tone</span>?: <span class="s">'ink'</span> | <span class="s">'red'</span> | <span class="s">'green'</span> | <span class="s">'gold'</span>;
  <span class="p">size</span>?: <span class="s">'sm'</span> | <span class="s">'md'</span> | <span class="s">'lg'</span>;
}`}
              preview={<>
                <span className="pai red lg">中</span>
                <span className="pai green lg">發</span>
                <span className="pai lg">東</span>
                <span className="pai red">1</span>
                <span className="pai gold">2</span>
                <span className="pai green">3</span>
                <span className="pai">4</span>
              </>}
              usedIn={['ロゴ','順位バッジ','404画面','表彰台']}
            />

            <ComponentDoc
              name="ScoreSeat" path="components/mahjong/ScoreSeat.tsx"
              desc="卓レイアウトの 1 席ぶん。風 (東南西北) バッジ + 名前 + 素点 + 計算結果P。アクティブ (1位) の枠強調あり。"
              propsCode={`<span class="k">interface</span> <span class="t">ScoreSeatProps</span> {
  <span class="p">wind</span>: <span class="s">'東'</span> | <span class="s">'南'</span> | <span class="s">'西'</span> | <span class="s">'北'</span>;
  <span class="p">member</span>: <span class="t">Member</span>;
  <span class="p">rawPoints</span>: <span class="t">number</span>;
  <span class="p">result</span>?: <span class="t">ScoreResult</span>;        <span class="c">// 計算済み (リアルタイム表示)</span>
  <span class="p">onPointsChange</span>: (n: <span class="t">number</span>) =&gt; <span class="t">void</span>;
  <span class="p">onMemberSelect</span>: () =&gt; <span class="t">void</span>;  <span class="c">// 部員選択モーダルを開く</span>
}`}
              preview={
                <div className="bg-surface rounded-md border-2 border-felt ring-2 ring-felt/20 shadow-card p-3 w-[220px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-neg flex items-center justify-center text-[12px] font-bold text-white">東</span>
                    <span className="text-[13px] font-medium text-ink-1">山田 太郎</span>
                    <span className="ml-auto text-[10px] text-ink-3">#1</span>
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="num text-[20px] font-semibold text-ink-1">42,300</span>
                    <span className="text-[11px] text-ink-3">点</span>
                  </div>
                  <div className="num text-[11px] font-semibold text-right text-felt">+86.5 P</div>
                </div>
              }
              usedIn={['スコア入力 (4席)']}
            />

            <ComponentDoc
              name="MahjongTable" path="components/mahjong/MahjongTable.tsx"
              desc="緑のフェルト + 4 席 + 中央の合計表示。スコア入力画面のメインビジュアル。中身 (席) は children で差し替え可能。"
              propsCode={`<span class="k">interface</span> <span class="t">MahjongTableProps</span> {
  <span class="p">total</span>: <span class="t">number</span>;
  <span class="p">remaining</span>: <span class="t">number</span>;     <span class="c">// 100000 - sum(raw)</span>
  <span class="p">seats</span>: { wind: <span class="t">Wind</span>; element: <span class="t">React</span>.<span class="t">ReactNode</span> }[]; <span class="c">// 4個</span>
}`}
              preview={
                <div className="text-[12px] text-ink-3 leading-relaxed">
                  ↑ <code className="num text-ink-1">ScoreSeat</code> 4 個を 4 辺に配置し、<br/>
                  中央に「100,000 / 残り 0 点」を表示するコンテナ
                </div>
              }
              usedIn={['スコア入力 (PC・スマホ両方)']}
            />

            <ComponentDoc
              name="ScorePreview" path="components/mahjong/ScorePreview.tsx"
              desc="右パネル下部の自動計算プレビュー表。素点 4 つから calcPoints() の結果を表示。"
              propsCode={`<span class="k">interface</span> <span class="t">ScorePreviewProps</span> {
  <span class="p">results</span>: <span class="t">ScoreResult</span>[];      <span class="c">// rank昇順済み</span>
  <span class="p">members</span>: <span class="t">Record</span>&lt;<span class="t">string</span>, <span class="t">Member</span>&gt;;
}`}
              preview={
                <table className="w-full text-[12px]">
                  <tbody>
                    <tr className="border-b border-line/60"><td className="py-1.5 text-ink-2">1着</td><td className="py-1.5 text-ink-1">山田</td><td className="py-1.5 text-right num font-medium text-felt">+86.5</td></tr>
                    <tr className="border-b border-line/60"><td className="py-1.5 text-ink-2">2着</td><td className="py-1.5 text-ink-1">佐藤</td><td className="py-1.5 text-right num font-medium text-felt">+17.5</td></tr>
                    <tr className="border-b border-line/60"><td className="py-1.5 text-ink-2">3着</td><td className="py-1.5 text-ink-1">鈴木</td><td className="py-1.5 text-right num font-medium text-neg">−21.8</td></tr>
                    <tr><td className="py-1.5 text-ink-2">4着</td><td className="py-1.5 text-ink-1">田中</td><td className="py-1.5 text-right num font-medium text-neg">−82.0</td></tr>
                  </tbody>
                </table>
              }
              usedIn={['スコア入力']}
            />

            <ComponentDoc
              name="MemberCard" path="components/mahjong/MemberCard.tsx"
              desc="部員一覧 (B案) の 1 セル。アバター + 名前 + ロールチップ + 累計P + スパークライン + 試合数。"
              propsCode={`<span class="k">interface</span> <span class="t">MemberCardProps</span> {
  <span class="p">member</span>: <span class="t">Member</span>;
  <span class="p">stats</span>: { total: <span class="t">number</span>; games: <span class="t">number</span>; avg: <span class="t">number</span>; rank: <span class="t">number</span>; last: <span class="t">string</span> };
  <span class="p">trend</span>: <span class="t">number</span>[];          <span class="c">// 累計P 推移</span>
  <span class="p">onClick</span>?: () =&gt; <span class="t">void</span>;
}`}
              preview={
                <div className="bg-surface border border-line rounded-md shadow-card p-4 w-full max-w-[320px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-felt-soft text-felt flex items-center justify-center text-[15px] font-semibold">山</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-semibold text-ink-1">山田 太郎</span>
                        <Chip tone="gold" size="sm">幹部</Chip>
                      </div>
                      <div className="text-[11px] text-ink-3">最終 2026/05/18</div>
                    </div>
                    <div className="num text-[18px] font-semibold text-felt">+1,420</div>
                  </div>
                  <Spark width={280} height={32} points={MEMBERS[0].trend}/>
                </div>
              }
              usedIn={['部員一覧 (PC/スマホ)']}
            />

            <ComponentDoc
              name="HanchanCard" path="components/mahjong/HanchanCard.tsx"
              desc="日別タブの 1 半荘ぶん。半荘番号 + 開始時刻 + チップ有無 + 4 人の着順・素点・P。詳細リンク付き。"
              propsCode={`<span class="k">interface</span> <span class="t">HanchanCardProps</span> {
  <span class="p">hanchan</span>: <span class="t">Hanchan</span>;
  <span class="p">results</span>: <span class="t">ScoreResult</span>[];
  <span class="p">members</span>: <span class="t">Record</span>&lt;<span class="t">string</span>, <span class="t">Member</span>&gt;;
  <span class="p">onOpenDetail</span>?: () =&gt; <span class="t">void</span>;
}`}
              preview={<span className="text-[12px] text-ink-3">→ 成績/日別タブ画面参照</span>}
              usedIn={['成績/日別']}
            />

            <ComponentDoc
              name="PodiumChart" path="components/mahjong/PodiumChart.tsx"
              desc="ランキングTOP3の表彰台ビジュアル。1位を中央高く、2-3位を左右に配置。"
              propsCode={`<span class="k">interface</span> <span class="t">PodiumChartProps</span> {
  <span class="p">top3</span>: { member: <span class="t">Member</span>; total: <span class="t">number</span>; games: <span class="t">number</span>; avg: <span class="t">number</span> }[];
}`}
              preview={<span className="text-[12px] text-ink-3">→ ランキング画面参照</span>}
              usedIn={['ランキング (PC/スマホ)']}
            />

            <ComponentDoc
              name="RankBadge" path="components/mahjong/RankBadge.tsx"
              desc="順位を麻雀牌スタイルで表示。1位=赤、2位=金、3位=緑、4位=墨。"
              propsCode={`<span class="k">interface</span> <span class="t">RankBadgeProps</span> { <span class="p">rank</span>: <span class="n">1</span> | <span class="n">2</span> | <span class="n">3</span> | <span class="n">4</span>; <span class="p">size</span>?: <span class="s">'sm'</span> | <span class="s">'md'</span> | <span class="s">'lg'</span>; }`}
              preview={<>
                <span className="pai red">1</span>
                <span className="pai gold">2</span>
                <span className="pai green">3</span>
                <span className="pai">4</span>
              </>}
              usedIn={['全結果表示']}
            />
          </div>
        </Section>

        {/* ─── 6. Charts ─── */}
        <Section id="charts" kicker="06 — Charts" title="チャートコンポーネント (Recharts ラッパー)">
          <p className="text-[13px] text-ink-2 leading-relaxed mb-5 max-w-[720px]">
            実装時は <b>Recharts</b> を <code className="num text-ink-1">components/charts/</code> でラップして、
            プロップを「データ + サイズ」だけに絞ります。デザイン側 (色・余白) はラッパー内で固定。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { name:'Sparkline', desc:'部員カードの推移ミニグラフ。', use:['部員一覧'] },
              { name:'HBarChart', desc:'横棒。ランキングのポイント比較。', use:['ランキング'] },
              { name:'LineChart', desc:'折れ線。累計P推移。', use:['成績/累計'] },
              { name:'VBarChart', desc:'縦棒。月別収支。', use:['成績/累計'] },
              { name:'RankDistChart', desc:'順位分布 (1位率 / 2位率 …)。', use:['成績/累計','ランキング'] },
            ].map(c=>(
              <div key={c.name} className="bg-surface border border-line rounded-md shadow-card p-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[14px] font-semibold text-ink-1">{c.name}</span>
                  <span className="num text-[10px] text-ink-3">components/charts/{c.name}.tsx</span>
                </div>
                <div className="text-[12px] text-ink-2 mb-2">{c.desc}</div>
                <div className="text-[10px] text-ink-3">使用: {c.use.join(' / ')}</div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Code>{`<span class="c">// 例: components/charts/HBarChart.tsx</span>
<span class="k">import</span> { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell } <span class="k">from</span> <span class="s">'recharts'</span>;

<span class="k">interface</span> <span class="t">Datum</span> { name: <span class="t">string</span>; v: <span class="t">number</span>; }

<span class="k">export function</span> <span class="t">HBarChart</span>({ data, height = <span class="n">240</span> }: { data: <span class="t">Datum</span>[]; height?: <span class="t">number</span> }) {
  <span class="k">return</span> (
    &lt;<span class="t">ResponsiveContainer</span> width=<span class="s">"100%"</span> height={height}&gt;
      &lt;<span class="t">BarChart</span> layout=<span class="s">"vertical"</span> data={data}&gt;
        &lt;<span class="t">XAxis</span> type=<span class="s">"number"</span> hide /&gt;
        &lt;<span class="t">YAxis</span> dataKey=<span class="s">"name"</span> type=<span class="s">"category"</span> width={<span class="n">72</span>} /&gt;
        &lt;<span class="t">Bar</span> dataKey=<span class="s">"v"</span>&gt;
          {data.map((d, i) =&gt; (
            &lt;<span class="t">Cell</span> key={i} fill={d.v &gt;= <span class="n">0</span> ? <span class="s">'#0e5a3c'</span> : <span class="s">'#c8312b'</span>} /&gt;
          ))}
        &lt;/<span class="t">Bar</span>&gt;
      &lt;/<span class="t">BarChart</span>&gt;
    &lt;/<span class="t">ResponsiveContainer</span>&gt;
  );
}`}</Code>
          </div>
        </Section>

        {/* ─── 7. 型・ロジック・状態 ─── */}
        <Section id="logic" kicker="07 — Domain Logic" title="型 / ロジック / 状態管理">
          <div className="grid grid-cols-1 gap-5">
            <div className="bg-surface border border-line rounded-md shadow-card p-5">
              <div className="flex items-baseline gap-2 mb-3">
                <h3 className="text-[16px] font-semibold text-ink-1">型定義</h3>
                <span className="num text-[11px] text-ink-3">types/index.ts</span>
              </div>
              <Code>{TYPES}</Code>
            </div>

            <div className="bg-surface border border-line rounded-md shadow-card p-5">
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="text-[16px] font-semibold text-ink-1">ポイント計算ロジック</h3>
                <span className="num text-[11px] text-ink-3">lib/points.ts</span>
              </div>
              <p className="text-[12.5px] text-ink-2 mb-3 leading-relaxed">
                純粋関数なので <b>Vitest で単体テストしやすい</b>のがポイント。
                UIから完全に独立させて <code className="num text-ink-1">lib/</code> に置きます。
              </p>
              <Code>{CALC_POINTS}</Code>
              <div className="mt-3 text-[11px] text-ink-3">
                <span className="font-medium text-ink-2">テスト例:</span>{' '}
                <code className="num">tests/points.test.ts</code> で「合計が常に 0 になる」「1 位だけオカが +30」など不変条件を assert。
              </div>
            </div>

            <div className="bg-surface border border-line rounded-md shadow-card p-5">
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="text-[16px] font-semibold text-ink-1">Zustand ストア</h3>
                <span className="num text-[11px] text-ink-3">stores/useGamesStore.ts</span>
              </div>
              <p className="text-[12.5px] text-ink-2 mb-3 leading-relaxed">
                <b>useAuthStore</b> / <b>useMembersStore</b> / <b>useGamesStore</b> の 3 つに分けます。
                ローカル開発中は <code className="num text-ink-1">persist</code> で localStorage に永続化、
                後で API に差し替え可能。
              </p>
              <Code>{ZUSTAND_STORE}</Code>
            </div>
          </div>
        </Section>

        {/* ─── 8. App Router ─── */}
        <Section id="app" kicker="08 — Routing" title="ページ構成 (App Router)">
          <div className="bg-surface border border-line rounded-md shadow-card overflow-hidden">
            <table className="w-full text-[13px]">
              <thead className="bg-paper border-b border-line">
                <tr className="text-[10px] tracking-wider text-ink-3 uppercase">
                  <th className="text-left font-medium px-5 py-3">パス</th>
                  <th className="text-left font-medium py-3">レイアウト</th>
                  <th className="text-left font-medium py-3">画面</th>
                  <th className="text-left font-medium pr-5 py-3">アクセス</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['/login',              '(none)',      'LoginScreen',         '未認証'],
                  ['/members',            '(main)',      'MembersScreen',       '全員'],
                  ['/score/new',          '(main)',      'ScoreInputScreen',    '全員'],
                  ['/results?tab=daily',  '(main)',      'ResultsDailyScreen',  '全員'],
                  ['/results?tab=total',  '(main)',      'ResultsTotalScreen',  '全員'],
                  ['/ranking',            '(main)',      'RankingScreen',       '全員'],
                  ['/admin/members',      '(admin)',     'AdminMembersScreen',  '幹部のみ'],
                  ['/admin/scores',       '(admin)',     'AdminScoresScreen',   '幹部のみ'],
                  ['(error)',             'root',        'not-found / error',   '全員'],
                ].map((r,i)=>(
                  <tr key={i} className="border-t border-line">
                    <td className="px-5 py-2.5 num text-ink-1">{r[0]}</td>
                    <td className="py-2.5 num text-ink-2">{r[1]}</td>
                    <td className="py-2.5 num text-ink-2">{r[2]}</td>
                    <td className="pr-5 py-2.5">
                      <Chip tone={r[3]==='幹部のみ'?'gold':r[3]==='未認証'?'neutral':'felt'} size="sm">{r[3]}</Chip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <div className="text-[11px] tracking-wider text-ink-3 uppercase mb-2">レイアウト例</div>
            <Code>{APP_LAYOUT}</Code>
          </div>

          <div className="mt-5 bg-felt-soft/50 border border-felt/20 rounded-md p-4 text-[12.5px] text-ink-1 leading-relaxed">
            <div className="font-semibold mb-1">💡 ロール制御のヒント</div>
            <code className="num text-ink-2">middleware.ts</code> で<code className="num text-ink-2"> /admin/*</code> を保護し、
            非幹部のアクセスは <code className="num text-ink-2">redirect(&apos;/members&apos;)</code>。
            UIレベルでは <code className="num text-ink-2">useAuthStore</code> から取得した role で「管理画面へ」リンクの表示を切替。
          </div>
        </Section>

        {/* ─── 9. Roadmap ─── */}
        <Section id="roadmap" kicker="09 — Roadmap" title="実装の進め方 (おすすめ順)">
          <p className="text-[13px] text-ink-2 leading-relaxed mb-5 max-w-[720px]">
            上から順に進めれば、毎ステップ「動く何か」が手元に残るので学習効率が良いです。
          </p>
          <ol className="flex flex-col gap-3">
            {[
              { t:'プロジェクト雛形 + Tailwind トークン', d:'create-next-app → tailwind.config.ts にデザイントークン転記 → Logo だけ表示できれば OK。', tag:'30分' },
              { t:'型 + 計算ロジック + テスト', d:'types/index.ts と lib/points.ts を作って、Vitest で「合計0」「ウマ反転」を緑にする。', tag:'1-2時間' },
              { t:'UIプリミティブ 8 個', d:'Button → Field → Toggle → Tabs → Chip → Stat → Card → NumField。Storybook 風に一画面に並べて確認する。', tag:'2-3時間' },
              { t:'レイアウト + ログイン', d:'Logo / TopNav を作って app/(main)/layout.tsx に置く。/login を最初のページとして実装。', tag:'1-2時間' },
              { t:'スコア入力画面', d:'MahjongTile / ScoreSeat / MahjongTable / ScorePreview を組んで calcPoints と接続。最重要画面。', tag:'3-4時間' },
              { t:'部員一覧 + 成績(日別)', d:'MemberCard + Sparkline、HanchanCard。Zustand に保存したデータをそのまま表示。', tag:'2-3時間' },
              { t:'成績(累計) + ランキング', d:'Recharts 導入 → 4 種類のチャートラッパーを作る → 画面に並べる。', tag:'3-4時間' },
              { t:'幹部画面 + ロール制御', d:'AdminSidebar + 2 画面 + middleware でのアクセス制御。', tag:'2-3時間' },
              { t:'エラーページ + 仕上げ', d:'not-found.tsx / error.tsx / 空状態。スマホ向けレスポンシブの最終確認。', tag:'1-2時間' },
            ].map((s,i)=>(
              <div key={i} className="bg-surface border border-line rounded-md shadow-card p-4 flex gap-4">
                <div className="shrink-0">
                  <span className="pai lg" style={{color:i===0?'#c8312b':i<3?'#a8893a':'#0e5a3c'}}>{i+1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-[14px] font-semibold text-ink-1">{s.t}</span>
                    <Chip tone="neutral" size="sm">{s.tag}</Chip>
                  </div>
                  <p className="text-[12.5px] text-ink-2 mt-1 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </ol>
        </Section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-line text-center">
          <div className="flex items-center justify-center gap-2 mb-2 opacity-70">
            <Logo size={16}/>
          </div>
          <div className="text-[11px] text-ink-3">
            関連: <a href="index.html" className="ulink text-felt">ワイヤーフレーム</a>
            {' · '}
            <a href="Hi-Fi Design.html" className="ulink text-felt">高解像度デザイン</a>
          </div>
          <div className="text-[11px] text-ink-3 mt-1">© 2026 麻雀部スコア管理</div>
        </footer>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
