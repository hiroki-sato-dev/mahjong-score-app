// Main user-facing screens: ログイン / 部員一覧 / スコア入力 / 成績確認 / ランキング

// ════════════════════ 1. ログイン (A: シンプル中央寄せ) ════════════════════
function LoginScreen(){
  return (
    <div className="w-full h-full bg-paper flex flex-col items-center justify-center" style={{minHeight:'100%'}}>
      <div className="flex items-center gap-2 mb-6">
        <span className="pai red lg">中</span>
        <div className="text-[26px] font-semibold tracking-tight text-ink-1">麻雀部スコア</div>
      </div>
      <div className="text-[13px] text-ink-3 mb-8">— 半荘ごとの戦績をかんたん管理 —</div>

      <div className="w-[380px] bg-surface border border-line rounded-md shadow-pop p-7">
        <h1 className="text-[18px] font-semibold text-ink-1">ログイン</h1>
        <p className="text-[12px] text-ink-3 mt-1 mb-6">登録済みのメールアドレスでサインインしてください</p>

        <div className="flex flex-col gap-4">
          <Field label="メールアドレス" value="taro.yamada@mahjong-club.jp" leadingIcon={Icon.user}/>
          <Field label="パスワード" placeholder="••••••••••" type="password"/>

          <div className="flex items-center justify-between -mt-1">
            <label className="flex items-center gap-2 text-[12px] text-ink-2">
              <span className="w-4 h-4 rounded border border-line-strong bg-felt flex items-center justify-center">
                <Icon.check width="11" height="11" className="text-white"/>
              </span>
              ログイン状態を保存
            </label>
            <a className="text-[12px] text-felt ulink">パスワードを忘れた</a>
          </div>

          <Button kind="primary" size="lg" className="w-full mt-2">ログイン</Button>
        </div>

        <div className="mt-6 pt-5 border-t border-line text-center">
          <span className="text-[12px] text-ink-3">アカウントをお持ちでない方は </span>
          <a className="text-[12px] text-felt font-medium ulink">新規登録</a>
        </div>
      </div>

      <div className="mt-8 text-[11px] text-ink-3">© 2026 麻雀部スコア管理</div>
    </div>
  );
}

// ════════════════════ 2. 部員一覧 (B: カードグリッド) ════════════════════
function MembersScreen(){
  const sorted = [...MEMBERS].sort((a,b)=>b.total-a.total);
  return (
    <div className="w-full h-full bg-paper flex flex-col">
      <TopNav active={0}/>
      <main className="flex-1 px-8 py-6 overflow-hidden">
        <div className="flex items-end mb-5">
          <div>
            <h1 className="text-[22px] font-semibold text-ink-1 tracking-tight">部員一覧</h1>
            <p className="text-[12px] text-ink-3 mt-0.5">登録部員 {MEMBERS.length} 名 / 最終更新 2026/05/19</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Field className="w-64" placeholder="名前で検索" leadingIcon={Icon.search}/>
            <Button kind="secondary" icon={Icon.filter}>並び替え</Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {sorted.map((m,i)=>(
            <div key={m.name} className="bg-surface border border-line rounded-md shadow-card p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-felt-soft text-felt flex items-center justify-center text-[15px] font-semibold">{m.initial}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-ink-1 truncate">{m.name}</span>
                    {m.role==='幹部' && <Chip tone="gold" size="sm">幹部</Chip>}
                  </div>
                  <div className="text-[11px] text-ink-3 mt-0.5">最終対戦 {m.last}</div>
                </div>
                <div className="text-right">
                  <div className={"num text-[18px] font-semibold leading-tight "+(m.total>=0?'text-felt':'text-neg')}>
                    {fmtP(m.total)}
                  </div>
                  <div className="text-[10px] text-ink-3 tracking-wider">TOTAL · P</div>
                </div>
              </div>

              <Spark width={300} height={36} points={m.trend}/>

              <div className="flex items-center text-[11px] text-ink-3 pt-2 border-t border-line">
                <div className="flex-1"><span className="text-ink-2 num font-medium">{m.games}</span> 戦</div>
                <div className="flex-1"><span className={"num font-medium "+(m.avg>=0?'text-felt':'text-neg')}>{m.avg>=0?'+':''}{m.avg.toFixed(1)}</span> 平均P</div>
                <div className="flex-1 text-right">
                  <span className="num font-medium text-ink-2">#{i+1}</span> 位
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// ════════════════════ 3. 半荘スコア入力 (A: 卓レイアウト) ════════════════════
function ScoreInputScreen(){
  // 卓上から見た4席（東南西北）。中央は集計プレビュー。
  // P計算: 素点 → 返し(30000)を引く → 1000=50P → ウマ加算 → チップ100P*枚数
  const seats = [
    { wind:'東', windColor:'#c8312b', name:'山田 太郎', initial:'山', raw:'42,300', uma:'+20', oka:'+30', p:'+86.5', rank:1, pos:'top' },
    { wind:'南', windColor:'#a8893a', name:'佐藤 花子', initial:'佐', raw:'31,500', uma:'+10', oka:' 0',  p:'+17.5', rank:2, pos:'right' },
    { wind:'西', windColor:'#0e5a3c', name:'鈴木 一郎', initial:'鈴', raw:'18,200', uma:'−10', oka:' 0',  p:'−21.8', rank:3, pos:'bottom' },
    { wind:'北', windColor:'#52524d', name:'田中 二郎', initial:'田', raw:'8,000',  uma:'−20', oka:' 0',  p:'−82.0', rank:4, pos:'left' },
  ];

  const seatBox = (s)=>{
    const positions = {
      top:    'top-4 left-1/2 -translate-x-1/2',
      bottom: 'bottom-4 left-1/2 -translate-x-1/2',
      left:   'left-4 top-1/2 -translate-y-1/2',
      right:  'right-4 top-1/2 -translate-y-1/2',
    };
    const isActive = s.rank===1;
    return (
      <div key={s.wind} className={"absolute "+positions[s.pos]+" w-[200px]"}>
        <div className={"bg-surface rounded-md border shadow-card p-3 "+(isActive?'border-felt ring-2 ring-felt/20':'border-line')}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{background:s.windColor}}>{s.wind}</span>
            <span className="text-[13px] font-medium text-ink-1 truncate">{s.name}</span>
            <span className="ml-auto text-[10px] tracking-wider text-ink-3">#{s.rank}</span>
          </div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="num text-[20px] font-semibold text-ink-1">{s.raw}</span>
            <span className="text-[11px] text-ink-3">点</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-ink-3">ウマ <span className="num text-ink-2">{s.uma}</span></span>
            <span className="text-ink-3">オカ <span className="num text-ink-2">{s.oka}</span></span>
            <span className={"num ml-auto font-semibold "+(s.p.startsWith('−')?'text-neg':'text-felt')}>{s.p} P</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-paper flex flex-col">
      <TopNav active={1}/>
      <main className="flex-1 px-8 py-6 overflow-hidden grid grid-cols-[1fr_320px] gap-6">
        {/* 左：卓 */}
        <div className="flex flex-col min-h-0">
          <div className="flex items-end mb-4">
            <div>
              <h1 className="text-[22px] font-semibold tracking-tight text-ink-1">半荘スコア入力</h1>
              <p className="text-[12px] text-ink-3 mt-0.5">対戦日付 · 2026/05/19 · 本日 1半荘目</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Chip tone="felt" selected>4人入力済 ✓</Chip>
              <Chip tone="neutral">合計 100,000 ✓</Chip>
            </div>
          </div>

          {/* 雀卓 */}
          <div className="relative flex-1 felt-bg rounded-lg border border-felt-deep shadow-card" style={{minHeight:480}}>
            {/* 中央 */}
            <div className="absolute inset-[24%] rounded-md border border-white/15 bg-black/15 flex flex-col items-center justify-center gap-2 backdrop-blur-[1px]">
              <div className="text-[10px] tracking-[.18em] text-white/55 uppercase">Total Score</div>
              <div className="num text-white text-[32px] font-semibold leading-none">100,000<span className="text-[14px] text-white/60 ml-1">点</span></div>
              <div className="flex items-center gap-1 mt-1 text-white/80 text-[11px]">
                <Icon.check width="13" height="13"/> 残り 0 点
              </div>
              <div className="dotline opacity-30 w-3/5 my-1"/>
              <div className="text-[10px] text-white/55">返し 30,000 / ウマ ±20/±10</div>
            </div>
            {seats.map(seatBox)}
          </div>
        </div>

        {/* 右：設定パネル */}
        <aside className="flex flex-col gap-4 overflow-hidden">
          <Card pad={false} className="overflow-hidden">
            <div className="px-5 py-4 border-b border-line">
              <div className="text-[11px] tracking-wider text-ink-3 uppercase mb-1">対戦日</div>
              <div className="flex items-center gap-2 text-ink-1">
                <Icon.cal width="16" height="16" className="text-ink-2"/>
                <span className="num text-[15px] font-medium">2026 / 05 / 19</span>
                <Icon.chevron width="14" height="14" className="text-ink-3 ml-auto" style={{transform:'rotate(90deg)'}}/>
              </div>
            </div>
            <div className="px-5 py-4 border-b border-line">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[13px] font-medium text-ink-1">チップ</div>
                  <div className="text-[11px] text-ink-3">あり/なしを切替</div>
                </div>
                <Toggle on size="lg"/>
              </div>
              <NumField label="チップ枚数" value="3" suffix="枚 (= +300 P)"/>
            </div>
            <div className="px-5 py-4">
              <div className="text-[11px] tracking-wider text-ink-3 uppercase mb-2">自動計算</div>
              <table className="w-full text-[12px]">
                <tbody>
                  {seats.map(s=>(
                    <tr key={s.wind} className="border-b last:border-0 border-line/60">
                      <td className="py-1.5 text-ink-2">{s.rank}着</td>
                      <td className="py-1.5 text-ink-1">{s.name.split(' ')[0]}</td>
                      <td className={"py-1.5 text-right num font-medium "+(s.p.startsWith('−')?'text-neg':'text-felt')}>{s.p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-[10px] text-ink-3 mt-2 leading-relaxed">
                1000点 = 50P / 返し 30,000 / ウマ +20·+10·−10·−20<br/>
                + チップ 100P × 枚数
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <Button kind="ghost" className="flex-1">下書き保存</Button>
            <Button kind="primary" className="flex-1">登録する</Button>
          </div>
        </aside>
      </main>
    </div>
  );
}

// ════════════════════ 4-A. 成績確認 (日別タブ) ════════════════════
function ResultsDailyScreen(){
  const hanchans = [
    { no:1, start:'20:11', tip:3, rows:[
      ['1','山田 太郎','42,300','+86.5'],['2','佐藤 花子','31,500','+17.5'],
      ['3','鈴木 一郎','18,200','−21.8'],['4','田中 二郎','8,000','−82.0'],
    ]},
    { no:2, start:'21:22', tip:0, rows:[
      ['1','佐藤 花子','41,500','+72.0'],['2','山田 太郎','29,000','+12.0'],
      ['3','田中 二郎','17,500','−20.0'],['4','鈴木 一郎','12,000','−64.0'],
    ]},
    { no:3, start:'22:35', tip:2, rows:[
      ['1','鈴木 一郎','45,500','+90.5'],['2','田中 二郎','28,000','+28.0'],
      ['3','佐藤 花子','16,500','−18.5'],['4','山田 太郎','10,000','−100.0'],
    ]},
  ];
  return (
    <div className="w-full h-full bg-paper flex flex-col">
      <TopNav active={2}/>
      <main className="flex-1 px-8 py-6 overflow-hidden">
        <div className="flex items-end mb-4">
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-ink-1">成績確認</h1>
            <p className="text-[12px] text-ink-3 mt-0.5">対象 · 山田 太郎</p>
          </div>
        </div>
        <Tabs tabs={['日別','累計']} active={0}/>

        <div className="grid grid-cols-[260px_1fr] gap-6 mt-6">
          {/* 左：日付選択＋日別サマリ */}
          <aside className="flex flex-col gap-4">
            <Card title="日付選択" pad={true}>
              <Field value="2026/05/19" leadingIcon={Icon.cal}/>
              <div className="mt-4">
                <div className="text-[11px] tracking-wider text-ink-3 uppercase mb-2">最近の対戦日</div>
                <div className="flex flex-col gap-1">
                  {['2026/05/19','2026/05/18','2026/05/16','2026/05/15','2026/05/12'].map((d,i)=>(
                    <div key={d} className={"px-2 h-8 rounded text-[12px] flex items-center justify-between cursor-default "+
                      (i===0?'bg-felt-soft text-felt font-medium':'text-ink-2 hover:bg-paper')}>
                      <span className="num">{d}</span>
                      <span className="text-[10px] text-ink-3">{[3,2,4,2,3][i]}半荘</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card title="この日の収支" pad={true}>
              <Stat label="合計" value="+104.0 P" tone="pos" big sub="3半荘 / 4人"/>
              <div className="mt-3 pt-3 border-t border-line grid grid-cols-2 gap-2 text-[12px]">
                <div>
                  <div className="text-ink-3 text-[10px]">最高</div>
                  <div className="num text-felt font-medium">+86.5</div>
                </div>
                <div>
                  <div className="text-ink-3 text-[10px]">最低</div>
                  <div className="num text-neg font-medium">−100.0</div>
                </div>
              </div>
            </Card>
          </aside>

          {/* 右：半荘リスト */}
          <div className="flex flex-col gap-3 overflow-hidden">
            {hanchans.map(h=>(
              <Card key={h.no} pad={false}>
                <div className="flex items-center px-5 py-3 border-b border-line">
                  <span className="num text-[16px] font-semibold text-ink-1">半荘 #{h.no}</span>
                  <span className="ml-3 text-[12px] text-ink-3">開始 <span className="num">{h.start}</span></span>
                  <span className="ml-3"><Chip tone={h.tip?'felt':'neutral'} size="sm">{h.tip?`チップ ${h.tip}枚`:'チップなし'}</Chip></span>
                  <Button kind="ghost" size="sm" className="ml-auto">詳細</Button>
                </div>
                <table className="w-full text-[12.5px]">
                  <thead>
                    <tr className="text-[10px] tracking-wider text-ink-3 uppercase">
                      <th className="text-left font-medium pl-5 py-2 w-10">着</th>
                      <th className="text-left font-medium py-2">部員</th>
                      <th className="text-right font-medium py-2">素点</th>
                      <th className="text-right font-medium pr-5 py-2">獲得P</th>
                    </tr>
                  </thead>
                  <tbody>
                    {h.rows.map((r,i)=>(
                      <tr key={i} className={"border-t border-line/70 "+(i===0?'bg-felt-soft/40':'')}>
                        <td className="pl-5 py-2.5">
                          <span className={cls("pai", i===0&&'red', i===1&&'gold', i===2&&'green')} style={{width:20,height:26,fontSize:12}}>{r[0]}</span>
                        </td>
                        <td className="py-2.5 text-ink-1">{r[1]}</td>
                        <td className="py-2.5 text-right num text-ink-2">{r[2]}</td>
                        <td className={"pr-5 py-2.5 text-right num font-medium "+(r[3].startsWith('−')?'text-neg':'text-felt')}>{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ════════════════════ 4-B. 成績確認 (累計タブ) ════════════════════
function ResultsTotalScreen(){
  const me = MEMBERS[0];
  return (
    <div className="w-full h-full bg-paper flex flex-col">
      <TopNav active={2}/>
      <main className="flex-1 px-8 py-6 overflow-hidden">
        <div className="flex items-end mb-4">
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-ink-1">成績確認</h1>
            <p className="text-[12px] text-ink-3 mt-0.5">対象 · 山田 太郎</p>
          </div>
        </div>
        <Tabs tabs={['日別','累計']} active={1}/>

        <div className="flex items-center gap-2 mt-4 text-[12px] text-ink-3">
          <span>期間</span>
          {['全期間','2026年','5月','4月','3月'].map((m,i)=>(
            <Chip key={m} tone="felt" selected={i===0}>{m}</Chip>
          ))}
        </div>

        {/* サマリーカード */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Card pad={true}>
            <Stat label="累計ポイント" value={fmtP(me.total)} tone="pos" big sub={`${me.games} 戦`}/>
          </Card>
          <Card pad={true}>
            <Stat label="平均P / 戦" value={`+${me.avg.toFixed(1)}`} tone="pos" big sub="全期間"/>
          </Card>
          <Card pad={true}>
            <Stat label="1位率" value="32%" tone="gold" big sub="42戦中 13回"/>
          </Card>
          <Card pad={true}>
            <Stat label="最高 / 最低" value="+186 / −94" big sub="ベスト / ワースト"/>
          </Card>
        </div>

        {/* グラフ */}
        <div className="grid grid-cols-[1.6fr_1fr] gap-4 mt-4">
          <Card title="累計ポイント推移" sub="月別" pad={true}>
            <LineGraph width={560} height={220} series={[0,30,18,55,42,88,75,120,108,140,128,165]}/>
            <div className="flex items-center gap-4 mt-2 text-[11px] text-ink-3">
              <span className="inline-flex items-center gap-1.5"><span className="w-3 h-0.5 bg-felt"/> 累計P</span>
              <span className="ml-auto">最終更新 2026/05/19</span>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <Card title="月別収支" pad={true}>
              <VBar width={300} height={140} data={[
                { label:'1月',v:40 },{ label:'2月',v:-22 },{ label:'3月',v:18 },
                { label:'4月',v:55 },{ label:'5月',v:-12 },
              ]}/>
            </Card>
            <Card title="順位分布" pad={true}>
              <RankDist width={300} height={130} dist={[0.32,0.28,0.22,0.18]}/>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// ════════════════════ 5. ランキング (B: 表彰台 + 棒グラフ) ════════════════════
function RankingScreen(){
  const sorted = [...MEMBERS].sort((a,b)=>b.total-a.total);
  const top3 = sorted.slice(0,3);
  const rest = sorted.slice(3);

  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumHeights = [80, 110, 60];
  const podiumColors  = ['#a8893a','#c8312b','#0e5a3c'];
  const podiumRanks   = [2,1,3];

  return (
    <div className="w-full h-full bg-paper flex flex-col">
      <TopNav active={3}/>
      <main className="flex-1 px-8 py-6 overflow-hidden">
        <div className="flex items-end mb-5">
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-ink-1">ランキング</h1>
            <p className="text-[12px] text-ink-3 mt-0.5">累計ポイント順 · 2026年</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {['全期間','2026年','5月','4月'].map((m,i)=>(
              <Chip key={m} tone="felt" selected={i===1}>{m}</Chip>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1.1fr] gap-4">
          {/* 表彰台 + 4位以下 */}
          <Card pad={false} className="overflow-hidden">
            <div className="px-5 pt-4 pb-2 flex items-baseline">
              <h3 className="text-[14px] font-semibold text-ink-1">TOP 3</h3>
              <span className="ml-2 text-[11px] text-ink-3">累計ポイント上位</span>
            </div>
            {/* 表彰台 */}
            <div className="px-5 pt-4 pb-5">
              <div className="flex items-end justify-center gap-6" style={{height:200}}>
                {podiumOrder.map((m,i)=>(
                  <div key={m.name} className="flex flex-col items-center gap-2">
                    <span className={cls("pai lg", podiumRanks[i]===1&&'red', podiumRanks[i]===2&&'gold', podiumRanks[i]===3&&'green')}>
                      {podiumRanks[i]}
                    </span>
                    <div className="text-[13px] font-semibold text-ink-1">{m.name}</div>
                    <div className="num text-[14px] font-semibold text-felt">{fmtP(m.total)} P</div>
                    <div className="text-[10px] text-ink-3">{m.games} 戦 / 平均 {m.avg>=0?'+':''}{m.avg.toFixed(1)}</div>
                    <div className="rounded-t-md w-20 mt-1" style={{height:podiumHeights[i],background:podiumColors[i],opacity:.88}}/>
                  </div>
                ))}
              </div>
            </div>

            {/* 4位以下 */}
            <div className="border-t border-line">
              <div className="px-5 py-2 text-[10px] tracking-wider text-ink-3 uppercase bg-paper">4位以下</div>
              <table className="w-full text-[13px]">
                <tbody>
                  {rest.map((m,i)=>(
                    <tr key={m.name} className="border-t border-line">
                      <td className="pl-5 py-2.5 w-10 num text-ink-2">{i+4}</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-felt-soft text-felt flex items-center justify-center text-[11px] font-semibold">{m.initial}</div>
                          {m.name}
                        </div>
                      </td>
                      <td className={"py-2.5 text-right num font-medium "+(m.total>=0?'text-felt':'text-neg')}>{fmtP(m.total)}</td>
                      <td className="pr-5 py-2.5 text-right num text-ink-3">{m.games}戦</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* 右：棒グラフ + 補助 */}
          <div className="flex flex-col gap-4">
            <Card title="累計ポイント比較" sub="部員別" pad={true}>
              <HBar width={460} data={sorted.map(m=>({ name:m.name.split(' ')[0], v:m.total }))}/>
            </Card>
            <Card title="平均ポイント" sub="累計 ÷ 試合数" pad={true}>
              <HBar width={460} data={sorted.map(m=>({ name:m.name.split(' ')[0], v:Math.round(m.avg*10)/10 }))} max={50}/>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

Object.assign(window, {
  LoginScreen, MembersScreen, ScoreInputScreen,
  ResultsDailyScreen, ResultsTotalScreen, RankingScreen,
});
