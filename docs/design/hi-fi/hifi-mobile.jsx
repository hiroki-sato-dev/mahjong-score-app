// スマホ版の主要画面 — iPhone 390×844 ベース
// 親の Tailwind 設定（felt/ink/paper 等）をそのまま再利用します。

// ══════════════ Mobile shared chrome ══════════════
const MOBILE_W = 390;
const MOBILE_H = 844;
const STATUS_H = 54;          // ステータスバー領域
const HOME_H   = 30;          // ホームインジケータ領域

// アプリヘッダー (画面ごとに被せる)
function MAppBar({ title, leading, trailing, sub }){
  return (
    <div className="sticky top-0 z-20 bg-surface/95 backdrop-blur border-b border-line">
      <div className="h-12 px-4 flex items-center gap-2">
        {leading || <span/>}
        <div className="flex-1 min-w-0 text-center">
          <div className="text-[15px] font-semibold text-ink-1 truncate">{title}</div>
          {sub && <div className="text-[10px] text-ink-3 -mt-0.5 truncate">{sub}</div>}
        </div>
        {trailing || <span className="w-7"/>}
      </div>
    </div>
  );
}

// 戻るアイコン
function MBack(){
  return (
    <button className="w-8 h-8 -ml-1 flex items-center justify-center text-ink-2">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6"/></svg>
    </button>
  );
}

// 下部タブ
function MTabBar({ active=0 }){
  const items = [
    { label:'部員', icon:Icon.users },
    { label:'入力', icon:Icon.plus, primary:true },
    { label:'成績', icon:Icon.chart },
    { label:'順位', icon:Icon.trophy },
  ];
  return (
    <nav className="absolute left-0 right-0 bg-surface border-t border-line"
      style={{ bottom: HOME_H }}>
      <div className="grid grid-cols-4 h-14">
        {items.map((it,i)=>{
          const I = it.icon;
          const on = i===active;
          if (it.primary){
            return (
              <div key={it.label} className="flex items-center justify-center relative">
                <button className={"w-12 h-12 rounded-full bg-felt text-white shadow-pop flex items-center justify-center -mt-5 border-4 border-surface "+(on?'ring-2 ring-felt/30':'')}>
                  <I width="20" height="20"/>
                </button>
              </div>
            );
          }
          return (
            <div key={it.label} className={"flex flex-col items-center justify-center gap-0.5 "+(on?'text-felt':'text-ink-3')}>
              <I width="18" height="18"/>
              <span className="text-[10px] font-medium">{it.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

// ステータスバー余白を確保するラッパー (子は AppBar から始まる)
function MScreen({ children, tab, bg='bg-paper' }){
  return (
    <div className={"w-full h-full flex flex-col "+bg} style={{ paddingTop: STATUS_H }}>
      <div className="flex-1 flex flex-col overflow-hidden" style={{ paddingBottom: tab!==undefined ? 56+HOME_H : HOME_H }}>
        {children}
      </div>
      {tab!==undefined && <MTabBar active={tab}/>}
    </div>
  );
}

// ══════════════ M-1. ログイン ══════════════
function MLoginScreen(){
  return (
    <MScreen>
      <div className="flex-1 overflow-auto px-6 pt-10 pb-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <span className="pai red lg">中</span>
          <div className="text-[22px] font-semibold tracking-tight text-ink-1">麻雀部スコア</div>
        </div>
        <div className="text-[12px] text-ink-3 mb-7">半荘ごとの戦績をかんたん管理</div>

        <div className="w-full">
          <h1 className="text-[18px] font-semibold text-ink-1 mb-1">ログイン</h1>
          <p className="text-[12px] text-ink-3 mb-5">登録済みのメールアドレスで</p>
          <div className="flex flex-col gap-4">
            <Field label="メールアドレス" value="taro.yamada@mahjong-club.jp"/>
            <Field label="パスワード" placeholder="••••••••"/>
            <div className="flex items-center justify-between -mt-1">
              <label className="flex items-center gap-2 text-[12px] text-ink-2">
                <span className="w-4 h-4 rounded border border-felt bg-felt flex items-center justify-center">
                  <Icon.check width="11" height="11" className="text-white"/>
                </span>
                ログイン状態を保存
              </label>
              <a className="text-[12px] text-felt ulink">パスワードを忘れた</a>
            </div>
            <Button kind="primary" size="lg" className="w-full mt-2">ログイン</Button>
          </div>
          <div className="mt-6 pt-5 border-t border-line text-center">
            <span className="text-[12px] text-ink-3">アカウント未作成？ </span>
            <a className="text-[12px] text-felt font-medium ulink">新規登録</a>
          </div>
        </div>
      </div>
    </MScreen>
  );
}

// ══════════════ M-2. 部員一覧 ══════════════
function MMembersScreen(){
  const sorted = [...MEMBERS].sort((a,b)=>b.total-a.total);
  return (
    <MScreen tab={0}>
      <MAppBar
        title="部員一覧"
        sub={`${MEMBERS.length}名 · 最終更新 05/19`}
        leading={<button className="w-8 h-8 flex items-center justify-center text-ink-2"><Icon.search width="20" height="20"/></button>}
        trailing={<button className="w-8 h-8 flex items-center justify-center text-ink-2"><Icon.filter width="18" height="18"/></button>}
      />
      <div className="flex-1 overflow-auto px-4 py-3">
        <div className="flex flex-col gap-2">
          {sorted.map((m,i)=>(
            <div key={m.name} className="bg-surface border border-line rounded-md shadow-card p-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-felt-soft text-felt flex items-center justify-center text-[13px] font-semibold">{m.initial}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-semibold text-ink-1">{m.name}</span>
                    {m.role==='幹部' && <Chip tone="gold" size="sm">幹部</Chip>}
                  </div>
                  <div className="text-[10px] text-ink-3">{m.games}戦 · 平均 <span className={"num "+(m.avg>=0?'text-felt':'text-neg')}>{m.avg>=0?'+':''}{m.avg.toFixed(1)}</span></div>
                </div>
                <div className="text-right">
                  <div className={"num text-[16px] font-semibold leading-tight "+(m.total>=0?'text-felt':'text-neg')}>{fmtP(m.total)}</div>
                  <div className="text-[10px] text-ink-3">#{i+1}</div>
                </div>
              </div>
              <Spark width={324} height={28} points={m.trend}/>
            </div>
          ))}
        </div>
      </div>
    </MScreen>
  );
}

// ══════════════ M-3. 半荘スコア入力 (卓レイアウト) ══════════════
function MScoreInputScreen(){
  const seats = [
    { wind:'東', color:'#c8312b', name:'山田 太郎', raw:'42,300', p:'+86.5', rank:1, pos:'top' },
    { wind:'南', color:'#a8893a', name:'佐藤 花子', raw:'31,500', p:'+17.5', rank:2, pos:'right' },
    { wind:'西', color:'#0e5a3c', name:'鈴木 一郎', raw:'18,200', p:'−21.8', rank:3, pos:'bottom' },
    { wind:'北', color:'#52524d', name:'田中 二郎', raw:'8,000',  p:'−82.0', rank:4, pos:'left' },
  ];
  const seatStyles = {
    top:    'top-2 left-1/2 -translate-x-1/2 items-center',
    bottom: 'bottom-2 left-1/2 -translate-x-1/2 items-center',
    left:   'left-2 top-1/2 -translate-y-1/2 items-start',
    right:  'right-2 top-1/2 -translate-y-1/2 items-end',
  };
  return (
    <MScreen tab={1}>
      <MAppBar
        title="半荘スコア入力"
        sub="2026/05/19 · 1半荘目"
        leading={<MBack/>}
        trailing={<button className="px-3 h-8 text-[12px] font-medium text-felt">下書き</button>}
      />
      <div className="flex-1 overflow-auto px-4 pt-3 pb-4">
        {/* 卓 */}
        <div className="relative felt-bg rounded-lg border border-felt-deep shadow-card aspect-square mb-3">
          <div className="absolute inset-[22%] rounded-md border border-white/15 bg-black/15 flex flex-col items-center justify-center gap-1">
            <div className="text-[9px] tracking-[.18em] text-white/55 uppercase">Total</div>
            <div className="num text-white text-[22px] font-semibold leading-none">100,000</div>
            <div className="flex items-center gap-1 text-white/80 text-[10px]">
              <Icon.check width="11" height="11"/> 残り 0 点
            </div>
          </div>
          {seats.map(s=>(
            <div key={s.wind} className={"absolute flex flex-col "+seatStyles[s.pos]}>
              <div className="bg-surface rounded-md border border-line shadow-card p-1.5 w-[112px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{background:s.color}}>{s.wind}</span>
                  <span className="text-[11px] font-medium text-ink-1 truncate">{s.name.split(' ')[0]}</span>
                  <span className="ml-auto text-[9px] text-ink-3">#{s.rank}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="num text-[15px] font-semibold text-ink-1">{s.raw}</span>
                </div>
                <div className={"num text-[10px] font-medium text-right "+(s.p.startsWith('−')?'text-neg':'text-felt')}>{s.p} P</div>
              </div>
            </div>
          ))}
        </div>

        {/* チップ設定 */}
        <div className="bg-surface border border-line rounded-md shadow-card divide-y divide-line">
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <div className="text-[13px] font-medium text-ink-1">チップあり</div>
              <div className="text-[10px] text-ink-3">3枚 = +300 P</div>
            </div>
            <Toggle on size="lg"/>
          </div>
          <div className="px-4 py-3 flex items-center">
            <div className="text-[12px] text-ink-2">チップ枚数</div>
            <div className="ml-auto flex items-center gap-2">
              <button className="w-7 h-7 rounded-md border border-line-strong text-ink-2">−</button>
              <span className="num text-[16px] font-semibold w-6 text-center">3</span>
              <button className="w-7 h-7 rounded-md border border-line-strong text-ink-2">＋</button>
            </div>
          </div>
        </div>

        <Button kind="primary" size="lg" className="w-full mt-3">登録する</Button>
        <div className="text-center text-[10px] text-ink-3 mt-2">
          1000点 = 50P / 返し30,000 / ウマ ±20·±10
        </div>
      </div>
    </MScreen>
  );
}

// ══════════════ M-4-A. 成績確認 / 日別 ══════════════
function MResultsDailyScreen(){
  const hanchans = [
    { no:1, start:'20:11', tip:3, rows:[
      ['1','山田 太郎','42,300','+86.5'],['2','佐藤 花子','31,500','+17.5'],
      ['3','鈴木 一郎','18,200','−21.8'],['4','田中 二郎','8,000','−82.0'],
    ]},
    { no:2, start:'21:22', tip:0, rows:[
      ['1','佐藤 花子','41,500','+72.0'],['2','山田 太郎','29,000','+12.0'],
      ['3','田中 二郎','17,500','−20.0'],['4','鈴木 一郎','12,000','−64.0'],
    ]},
  ];
  return (
    <MScreen tab={2}>
      <MAppBar title="成績確認" leading={<MBack/>}/>
      <div className="flex-1 overflow-auto">
        <div className="px-4 pt-2 pb-1 bg-surface">
          <Tabs tabs={['日別','累計']} active={0}/>
        </div>
        {/* 日付選択 */}
        <div className="px-4 py-3 bg-surface border-b border-line flex items-center gap-2">
          <Icon.cal width="16" height="16" className="text-ink-2"/>
          <span className="num text-[15px] font-semibold text-ink-1">2026/05/19</span>
          <button className="ml-auto w-7 h-7 rounded-md border border-line-strong text-ink-2 flex items-center justify-center">
            <Icon.chevron width="14" height="14" style={{transform:'rotate(180deg)'}}/>
          </button>
          <button className="w-7 h-7 rounded-md border border-line-strong text-ink-2 flex items-center justify-center">
            <Icon.chevron width="14" height="14"/>
          </button>
        </div>

        {/* この日のサマリ */}
        <div className="px-4 py-3 bg-felt-soft/40 border-b border-line flex items-center">
          <div>
            <div className="text-[10px] tracking-wider text-ink-3 uppercase">この日の収支</div>
            <div className="num text-[24px] font-semibold text-felt leading-tight">+104.0 P</div>
            <div className="text-[10px] text-ink-3">3半荘 / 4人</div>
          </div>
          <div className="ml-auto text-right text-[11px] text-ink-3">
            <div>最高 <span className="num font-medium text-felt">+86.5</span></div>
            <div>最低 <span className="num font-medium text-neg">−100.0</span></div>
          </div>
        </div>

        <div className="px-4 py-3 flex flex-col gap-3">
          {hanchans.map(h=>(
            <div key={h.no} className="bg-surface border border-line rounded-md shadow-card overflow-hidden">
              <div className="flex items-center px-4 py-2.5 border-b border-line">
                <span className="num text-[14px] font-semibold text-ink-1">半荘 #{h.no}</span>
                <span className="ml-2 text-[11px] text-ink-3 num">{h.start}</span>
                <span className="ml-auto"><Chip tone={h.tip?'felt':'neutral'} size="sm">{h.tip?`チップ ${h.tip}枚`:'チップなし'}</Chip></span>
              </div>
              <table className="w-full text-[12px]">
                <tbody>
                  {h.rows.map((r,i)=>(
                    <tr key={i} className={"border-t border-line/70 "+(i===0?'bg-felt-soft/40':'')}>
                      <td className="pl-4 py-2 w-8">
                        <span className={cls("pai", i===0&&'red', i===1&&'gold', i===2&&'green')} style={{width:18,height:24,fontSize:11}}>{r[0]}</span>
                      </td>
                      <td className="py-2 text-ink-1">{r[1]}</td>
                      <td className="py-2 text-right num text-ink-2 text-[11px]">{r[2]}</td>
                      <td className={"pr-4 py-2 text-right num font-medium "+(r[3].startsWith('−')?'text-neg':'text-felt')}>{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </MScreen>
  );
}

// ══════════════ M-4-B. 成績確認 / 累計 ══════════════
function MResultsTotalScreen(){
  const me = MEMBERS[0];
  return (
    <MScreen tab={2}>
      <MAppBar title="成績確認" leading={<MBack/>}/>
      <div className="flex-1 overflow-auto">
        <div className="px-4 pt-2 pb-1 bg-surface">
          <Tabs tabs={['日別','累計']} active={1}/>
        </div>
        {/* 期間フィルター */}
        <div className="px-4 py-3 bg-surface border-b border-line flex items-center gap-1.5 overflow-x-auto">
          <Chip tone="felt" selected size="sm">全期間</Chip>
          <Chip tone="neutral" size="sm">2026年</Chip>
          <Chip tone="neutral" size="sm">5月</Chip>
          <Chip tone="neutral" size="sm">4月</Chip>
          <Chip tone="neutral" size="sm">3月</Chip>
        </div>

        {/* サマリーカード 2x2 */}
        <div className="px-4 py-3 grid grid-cols-2 gap-2">
          <Card pad={true} className="!p-3">
            <Stat label="累計P" value={fmtP(me.total)} tone="pos" big sub={`${me.games}戦`}/>
          </Card>
          <Card pad={true} className="!p-3">
            <Stat label="平均P/戦" value={`+${me.avg.toFixed(1)}`} tone="pos" big sub="全期間"/>
          </Card>
          <Card pad={true} className="!p-3">
            <Stat label="1位率" value="32%" tone="gold" big sub="13回 / 42戦"/>
          </Card>
          <Card pad={true} className="!p-3">
            <Stat label="最高 / 最低" value="+186 / −94" sub="ベスト/ワースト"/>
          </Card>
        </div>

        {/* グラフ */}
        <div className="px-4 pb-4 flex flex-col gap-3">
          <Card title="累計ポイント推移" pad={true} className="!p-3">
            <LineGraph width={326} height={170} series={[0,30,18,55,42,88,75,120,108,140,128,165]}/>
          </Card>
          <Card title="順位分布" pad={true} className="!p-3">
            <RankDist width={326} height={120} dist={[0.32,0.28,0.22,0.18]}/>
          </Card>
        </div>
      </div>
    </MScreen>
  );
}

// ══════════════ M-5. ランキング ══════════════
function MRankingScreen(){
  const sorted = [...MEMBERS].sort((a,b)=>b.total-a.total);
  const top3 = sorted.slice(0,3);
  const rest = sorted.slice(3);
  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumH = [60, 86, 44];
  const podiumColors  = ['#a8893a','#c8312b','#0e5a3c'];
  const podiumRanks   = [2,1,3];

  return (
    <MScreen tab={3}>
      <MAppBar title="ランキング" sub="2026年 · 累計P順" trailing={<button className="w-8 h-8 flex items-center justify-center text-ink-2"><Icon.filter width="18" height="18"/></button>}/>
      <div className="flex-1 overflow-auto">
        {/* 期間 chips */}
        <div className="px-4 py-2 bg-surface border-b border-line flex items-center gap-1.5 overflow-x-auto">
          <Chip tone="felt" size="sm">全期間</Chip>
          <Chip tone="felt" selected size="sm">2026年</Chip>
          <Chip tone="neutral" size="sm">5月</Chip>
          <Chip tone="neutral" size="sm">4月</Chip>
        </div>

        {/* 表彰台 */}
        <div className="px-4 pt-4 pb-3">
          <div className="bg-surface border border-line rounded-md shadow-card p-4">
            <div className="text-[12px] font-semibold text-ink-1 mb-3 flex items-center gap-1.5">
              <Icon.trophy width="14" height="14" className="text-gold"/> TOP 3
            </div>
            <div className="flex items-end justify-center gap-3" style={{height:170}}>
              {podiumOrder.map((m,i)=>(
                <div key={m.name} className="flex flex-col items-center gap-1.5 flex-1">
                  <span className={cls("pai lg", podiumRanks[i]===1&&'red', podiumRanks[i]===2&&'gold', podiumRanks[i]===3&&'green')} style={{width:30,height:40,fontSize:16}}>
                    {podiumRanks[i]}
                  </span>
                  <div className="text-[11px] font-semibold text-ink-1 truncate w-full text-center">{m.name.split(' ')[0]}</div>
                  <div className="num text-[12px] font-semibold text-felt">{fmtP(m.total)}</div>
                  <div className="rounded-t-md w-full mt-1" style={{height:podiumH[i],background:podiumColors[i],opacity:.88}}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 棒グラフ */}
        <div className="px-4 pb-3">
          <Card title="累計ポイント比較" pad={true} className="!p-3">
            <HBar width={326} data={sorted.map(m=>({ name:m.name.split(' ')[0], v:m.total }))}/>
          </Card>
        </div>

        {/* 4位以下リスト */}
        <div className="px-4 pb-4">
          <div className="bg-surface border border-line rounded-md shadow-card overflow-hidden">
            <div className="px-4 py-2 text-[10px] tracking-wider text-ink-3 uppercase bg-paper border-b border-line">4位以下</div>
            {rest.map((m,i)=>(
              <div key={m.name} className="px-4 py-2.5 flex items-center gap-3 border-b last:border-b-0 border-line">
                <span className="num text-[12px] text-ink-2 w-5">{i+4}</span>
                <div className="w-7 h-7 rounded-full bg-felt-soft text-felt flex items-center justify-center text-[11px] font-semibold">{m.initial}</div>
                <span className="text-[13px] text-ink-1 flex-1">{m.name}</span>
                <span className={"num text-[13px] font-medium "+(m.total>=0?'text-felt':'text-neg')}>{fmtP(m.total)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MScreen>
  );
}

// ══════════════ M-6. 幹部メニュー (Drawer風画面) ══════════════
function MAdminMenuScreen(){
  return (
    <MScreen tab={undefined}>
      <MAppBar title="幹部メニュー" sub="管理者向け機能" leading={<MBack/>}/>
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="bg-felt-soft border border-felt/20 rounded-md p-4 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center text-[13px] font-semibold">山</div>
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-ink-1">山田 太郎</div>
            <div className="text-[11px] text-ink-3">taro.yamada@mahjong-club.jp</div>
          </div>
          <Chip tone="gold" size="sm">幹部</Chip>
        </div>

        <div className="text-[10px] tracking-wider text-ink-3 uppercase px-2 mb-1.5">管理</div>
        <div className="bg-surface border border-line rounded-md shadow-card overflow-hidden mb-4">
          {[
            { icon:Icon.users,    label:'部員管理',  sub:'6名登録 · 2名幹部' },
            { icon:Icon.chart,    label:'スコア管理', sub:'14半荘 / 5月' },
            { icon:Icon.settings, label:'クラブ設定', sub:'ルール・チップ単価' },
          ].map((it,i,a)=>{
            const I = it.icon;
            return (
              <div key={it.label} className={"px-4 py-3 flex items-center gap-3 "+(i<a.length-1?'border-b border-line':'')}>
                <div className="w-9 h-9 rounded-md bg-paper text-ink-2 flex items-center justify-center">
                  <I width="18" height="18"/>
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-ink-1">{it.label}</div>
                  <div className="text-[11px] text-ink-3">{it.sub}</div>
                </div>
                <Icon.chevron width="16" height="16" className="text-ink-3"/>
              </div>
            );
          })}
        </div>

        <div className="text-[10px] tracking-wider text-ink-3 uppercase px-2 mb-1.5">アカウント</div>
        <div className="bg-surface border border-line rounded-md shadow-card overflow-hidden">
          {[
            { icon:Icon.user,   label:'プロフィール編集' },
            { icon:Icon.bell,   label:'通知設定' },
            { icon:Icon.logout, label:'ログアウト', tone:'neg' },
          ].map((it,i,a)=>{
            const I = it.icon;
            return (
              <div key={it.label} className={"px-4 py-3 flex items-center gap-3 "+(i<a.length-1?'border-b border-line':'')}>
                <I width="18" height="18" className={it.tone==='neg'?'text-neg':'text-ink-2'}/>
                <div className={"text-[13px] flex-1 "+(it.tone==='neg'?'text-neg font-medium':'text-ink-1')}>{it.label}</div>
                <Icon.chevron width="16" height="16" className="text-ink-3"/>
              </div>
            );
          })}
        </div>

        <div className="text-center text-[10px] text-ink-3 mt-6">v0.1.0 · 麻雀部スコア</div>
      </div>
    </MScreen>
  );
}

// ══════════════ M-7. 404 ══════════════
function MNotFoundScreen(){
  return (
    <MScreen>
      <MAppBar title="" leading={<MBack/>}/>
      <div className="flex-1 overflow-auto px-6 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 mb-5">
          <span className="pai lg" style={{width:46,height:62,fontSize:28}}>四</span>
          <span className="pai lg green" style={{width:46,height:62,fontSize:28}}>白</span>
          <span className="pai lg red" style={{width:46,height:62,fontSize:28}}>四</span>
        </div>
        <div className="text-[10px] tracking-[.22em] text-ink-3 uppercase mb-2">404 · Not Found</div>
        <h1 className="text-[20px] font-semibold text-ink-1 mb-2 tracking-tight">ページが見つかりません</h1>
        <p className="text-[12px] text-ink-2 leading-relaxed mb-6">
          URLが間違っているか、削除された可能性があります
        </p>
        <Button kind="primary" size="lg" className="w-full">トップへ</Button>
        <Button kind="ghost" className="mt-2">前のページに戻る</Button>
      </div>
    </MScreen>
  );
}

Object.assign(window, {
  MLoginScreen, MMembersScreen, MScoreInputScreen,
  MResultsDailyScreen, MResultsTotalScreen, MRankingScreen,
  MAdminMenuScreen, MNotFoundScreen,
});
