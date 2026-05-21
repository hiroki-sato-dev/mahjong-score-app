// 404 / 500 エラー画面 + デザイントークン凡例

// ════════════════════ 404 ════════════════════
function NotFoundScreen(){
  return (
    <div className="w-full h-full bg-paper flex flex-col">
      <TopNav active={-1}/>
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-[520px] w-full flex flex-col items-center text-center">
          {/* 牌を並べて 4-0-4 を表現 */}
          <div className="flex items-center gap-3 mb-6">
            <span className="pai lg" style={{width:60,height:80,fontSize:38}}>四</span>
            <span className="pai lg green" style={{width:60,height:80,fontSize:38}}>白</span>
            <span className="pai lg red" style={{width:60,height:80,fontSize:38}}>四</span>
          </div>
          <div className="text-[12px] tracking-[.22em] text-ink-3 uppercase mb-2">404 · Not Found</div>
          <h1 className="text-[28px] font-semibold text-ink-1 mb-2 tracking-tight">お探しのページが見つかりません</h1>
          <p className="text-[13px] text-ink-2 leading-relaxed max-w-[420px] mb-7">
            URLが間違っているか、ページが削除された可能性があります。<br/>
            お手数ですが、トップから目的のページを探してください。
          </p>
          <div className="flex items-center gap-2">
            <Button kind="secondary">前のページに戻る</Button>
            <Button kind="primary">トップへ</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ════════════════════ 500 ════════════════════
function ServerErrorScreen(){
  return (
    <div className="w-full h-full bg-paper flex flex-col">
      <TopNav active={-1}/>
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-[520px] w-full flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-neg-soft border border-neg/30 flex items-center justify-center mb-5">
            <Icon.alert width="34" height="34" className="text-neg"/>
          </div>
          <div className="text-[12px] tracking-[.22em] text-neg uppercase mb-2">500 · Server Error</div>
          <h1 className="text-[28px] font-semibold text-ink-1 mb-2 tracking-tight">サーバーで問題が発生しました</h1>
          <p className="text-[13px] text-ink-2 leading-relaxed max-w-[420px] mb-7">
            一時的なエラーの可能性があります。<br/>
            少し時間をおいてから、再度アクセスしてください。
          </p>
          <div className="bg-surface border border-line rounded-md px-4 py-3 mb-6 w-full max-w-[420px] text-left">
            <div className="text-[10px] tracking-wider text-ink-3 uppercase mb-1">エラーID</div>
            <div className="num text-[12px] text-ink-1">err_2026-05-19_a8f3c91d</div>
          </div>
          <div className="flex items-center gap-2">
            <Button kind="secondary">再読み込み</Button>
            <Button kind="primary">トップへ</Button>
          </div>
          <a className="text-[11px] text-ink-3 ulink mt-5">問題が続く場合は幹部までご連絡ください</a>
        </div>
      </main>
    </div>
  );
}

// ════════════════════ デザイントークン凡例 ════════════════════
function DesignTokens(){
  const colors = [
    ['Paper', '#fafaf7', 'ページ背景'],
    ['Surface', '#ffffff', 'カード・テーブル'],
    ['Line', '#e8e5dc', '境界線'],
    ['Ink 1', '#1a1a1a', '見出し・主要テキスト'],
    ['Ink 2', '#52524d', '本文'],
    ['Ink 3', '#9a978f', 'ラベル・補助'],
    ['Felt', '#0e5a3c', 'プライマリ / +収支'],
    ['Felt Soft', '#e8f0eb', 'プライマリ淡'],
    ['Neg', '#c8312b', 'マイナス / 危険'],
    ['Neg Soft', '#fbeae8', 'マイナス淡'],
    ['Gold', '#a8893a', '1位アクセント'],
    ['Gold Soft', '#f5eed8', '1位淡'],
  ];
  return (
    <div className="w-full h-full bg-paper p-8 overflow-auto">
      <h2 className="text-[18px] font-semibold text-ink-1 mb-1">デザイントークン</h2>
      <p className="text-[12px] text-ink-3 mb-5">Tailwind の <code className="num">theme.extend</code> にそのまま乗せられる構成です</p>

      <div className="grid grid-cols-2 gap-5">
        <Card title="Colors" sub="HEX" pad={true}>
          <div className="grid grid-cols-2 gap-2">
            {colors.map(c=>(
              <div key={c[0]} className="flex items-center gap-2.5 p-1.5 rounded">
                <div className="w-10 h-10 rounded-md border border-line shrink-0" style={{background:c[1]}}/>
                <div className="min-w-0">
                  <div className="text-[12px] font-medium text-ink-1 truncate">{c[0]}</div>
                  <div className="num text-[10px] text-ink-3">{c[1]}</div>
                  <div className="text-[10px] text-ink-3 truncate">{c[2]}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-5">
          <Card title="Typography" pad={true}>
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-[10px] tracking-wider text-ink-3 uppercase mb-1">Display / 28-30</div>
                <div className="text-[28px] font-semibold leading-tight">麻雀部スコア管理</div>
              </div>
              <div>
                <div className="text-[10px] tracking-wider text-ink-3 uppercase mb-1">Title / 18-22</div>
                <div className="text-[18px] font-semibold leading-tight">半荘スコア入力</div>
              </div>
              <div>
                <div className="text-[10px] tracking-wider text-ink-3 uppercase mb-1">Body / 13-14</div>
                <div className="text-[13px] text-ink-2">4人入力すると自動でウマ・オカ・ポイントが計算されます</div>
              </div>
              <div>
                <div className="text-[10px] tracking-wider text-ink-3 uppercase mb-1">Num / JetBrains Mono</div>
                <div className="num text-[26px] font-semibold text-felt">+1,420 P</div>
              </div>
              <div>
                <div className="text-[10px] tracking-wider text-ink-3 uppercase mb-1">Label / 11</div>
                <div className="text-[11px] tracking-wider text-ink-3 uppercase">RESULTS · DAILY</div>
              </div>
            </div>
          </Card>

          <Card title="Components" pad={true}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Button kind="primary">登録する</Button>
              <Button kind="secondary">下書き</Button>
              <Button kind="ghost">キャンセル</Button>
              <Button kind="danger">削除</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Chip tone="felt" selected>5月</Chip>
              <Chip tone="neutral">全期間</Chip>
              <Chip tone="gold">1位</Chip>
              <Chip tone="neg">−1,120</Chip>
            </div>
            <div className="flex items-center gap-4">
              <Toggle on label="チップあり"/>
              <Toggle label="OFF"/>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-5 p-4 bg-surface border border-line rounded-md">
        <div className="text-[10px] tracking-wider text-ink-3 uppercase mb-2">Tailwind 設定 (一部)</div>
<pre className="num text-[11px] text-ink-2 leading-relaxed">{`colors: {
  paper:'#fafaf7', surface:'#ffffff',
  line:'#e8e5dc', 'line-strong':'#d4d1c8',
  ink:    { 1:'#1a1a1a', 2:'#52524d', 3:'#9a978f' },
  felt:   { DEFAULT:'#0e5a3c', soft:'#e8f0eb', deep:'#0a4530' },
  neg:    { DEFAULT:'#c8312b', soft:'#fbeae8' },
  gold:   { DEFAULT:'#a8893a', soft:'#f5eed8' },
}`}</pre>
      </div>
    </div>
  );
}

Object.assign(window, { NotFoundScreen, ServerErrorScreen, DesignTokens });
