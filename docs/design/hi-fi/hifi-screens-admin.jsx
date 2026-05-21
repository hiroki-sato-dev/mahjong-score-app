// 幹部用管理画面 (A: 部員管理 / B: スコア管理) — どちらも左サイドバーで切替

function AdminLayout({ active, children }){
  return (
    <div className="w-full h-full bg-paper flex">
      <AdminSidebar active={active}/>
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}

// ════════════════════ 6-A. 部員管理 ════════════════════
function AdminMembersScreen(){
  return (
    <AdminLayout active="部員管理">
      <header className="h-14 px-7 border-b border-line bg-surface flex items-center">
        <div>
          <h1 className="text-[16px] font-semibold text-ink-1 leading-tight">部員管理</h1>
          <div className="text-[11px] text-ink-3 leading-tight">部員の追加・ロール変更・削除</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Field className="w-56" placeholder="名前・メールで検索" leadingIcon={Icon.search}/>
          <Button kind="primary" icon={Icon.plus}>部員を追加</Button>
        </div>
      </header>

      <main className="flex-1 p-7 overflow-hidden">
        {/* 上部サマリ */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          <Card pad={true}><Stat label="登録部員" value={String(MEMBERS.length)} big sub="名"/></Card>
          <Card pad={true}><Stat label="うち幹部" value={String(MEMBERS.filter(m=>m.role==='幹部').length)} tone="gold" big sub="名"/></Card>
          <Card pad={true}><Stat label="今月の対戦" value="14" big sub="半荘"/></Card>
          <Card pad={true}><Stat label="アクティブ" value="6 / 6" tone="pos" big sub="直近30日"/></Card>
        </div>

        <Card pad={false}>
          <div className="px-5 h-12 flex items-center border-b border-line">
            <h3 className="text-[14px] font-semibold text-ink-1">部員一覧</h3>
            <span className="ml-2 text-[11px] text-ink-3">{MEMBERS.length}件</span>
            <div className="ml-auto flex items-center gap-1">
              <Chip tone="neutral" selected>全員</Chip>
              <Chip tone="neutral">幹部のみ</Chip>
              <Chip tone="neutral">部員のみ</Chip>
            </div>
          </div>
          <table className="w-full text-[13px]">
            <thead className="bg-paper">
              <tr className="text-[10px] tracking-wider text-ink-3 uppercase">
                <th className="text-left font-medium pl-5 py-3 w-10"><input type="checkbox" className="accent-felt"/></th>
                <th className="text-left font-medium py-3">部員</th>
                <th className="text-left font-medium py-3">メール</th>
                <th className="text-left font-medium py-3">ロール</th>
                <th className="text-right font-medium py-3">累計P</th>
                <th className="text-right font-medium py-3">試合数</th>
                <th className="text-left font-medium py-3">最終対戦</th>
                <th className="text-right font-medium pr-5 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((m,i)=>(
                <tr key={m.name} className="border-t border-line hover:bg-paper">
                  <td className="pl-5 py-3"><input type="checkbox" className="accent-felt"/></td>
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-felt-soft text-felt flex items-center justify-center text-[12px] font-semibold">{m.initial}</div>
                      <span className="font-medium text-ink-1">{m.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-ink-2 num text-[12px]">{['taro.yamada','hanako.sato','jiro.tanaka','shiro.ito','ichiro.suzuki','saburo.takahashi'][i]}@mahjong-club.jp</td>
                  <td className="py-3">
                    <div className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md border border-line-strong bg-surface text-[12px]">
                      {m.role==='幹部' ? (
                        <><span className="w-1.5 h-1.5 rounded-full bg-gold"/> 幹部</>
                      ) : (
                        <><span className="w-1.5 h-1.5 rounded-full bg-felt"/> 部員</>
                      )}
                      <Icon.chevron width="12" height="12" className="text-ink-3 ml-1" style={{transform:'rotate(90deg)'}}/>
                    </div>
                  </td>
                  <td className={"py-3 text-right num font-medium "+(m.total>=0?'text-felt':'text-neg')}>{fmtP(m.total)}</td>
                  <td className="py-3 text-right num text-ink-2">{m.games}</td>
                  <td className="py-3 text-ink-2 num text-[12px]">{m.last}</td>
                  <td className="pr-5 py-3 text-right">
                    <div className="inline-flex items-center gap-0.5">
                      <button className="h-8 w-8 rounded-md text-ink-3 hover:bg-paper hover:text-ink-1 flex items-center justify-center" title="編集">
                        <Icon.edit width="15" height="15"/>
                      </button>
                      <button className="h-8 w-8 rounded-md text-ink-3 hover:bg-neg-soft hover:text-neg flex items-center justify-center" title="削除">
                        <Icon.trash width="15" height="15"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center px-5 h-12 border-t border-line text-[11px] text-ink-3">
            <span>1–6 / 6 件</span>
            <div className="ml-auto flex items-center gap-1">
              <button className="h-7 px-2 rounded border border-line-strong text-ink-3" disabled>‹</button>
              <button className="h-7 px-2 rounded border border-line-strong text-ink-3" disabled>›</button>
            </div>
          </div>
        </Card>
      </main>
    </AdminLayout>
  );
}

// ════════════════════ 6-B. スコア管理 ════════════════════
function AdminScoresScreen(){
  const games = [
    { date:'2026/05/19 22:35', tip:'2枚',  players:['鈴木 一郎','田中 二郎','佐藤 花子','山田 太郎'], points:['+90.5','+28.0','−18.5','−100.0'] },
    { date:'2026/05/19 21:22', tip:'なし', players:['佐藤 花子','山田 太郎','田中 二郎','鈴木 一郎'], points:['+72.0','+12.0','−20.0','−64.0'] },
    { date:'2026/05/19 20:11', tip:'3枚',  players:['山田 太郎','佐藤 花子','鈴木 一郎','田中 二郎'], points:['+86.5','+17.5','−21.8','−82.0'] },
    { date:'2026/05/18 21:40', tip:'1枚',  players:['田中 二郎','山田 太郎','佐藤 花子','鈴木 一郎'], points:['+68.0','+22.0','−22.0','−68.0'] },
    { date:'2026/05/18 19:40', tip:'2枚',  players:['鈴木 一郎','田中 二郎','佐藤 花子','山田 太郎'], points:['+90.5','+28.0','−18.5','−100.0'] },
    { date:'2026/05/16 22:03', tip:'なし', players:['山田 太郎','田中 二郎','佐藤 花子','鈴木 一郎'], points:['+66.0','+14.0','−22.0','−58.0'] },
    { date:'2026/05/15 20:15', tip:'1枚',  players:['佐藤 花子','鈴木 一郎','山田 太郎','田中 二郎'], points:['+84.0','+20.0','−18.0','−86.0'] },
  ];
  return (
    <AdminLayout active="スコア管理">
      <header className="h-14 px-7 border-b border-line bg-surface flex items-center">
        <div>
          <h1 className="text-[16px] font-semibold text-ink-1 leading-tight">スコア管理</h1>
          <div className="text-[11px] text-ink-3 leading-tight">過去の半荘記録の編集・削除</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Field className="w-44" value="2026 / 05" leadingIcon={Icon.cal}/>
          <Field className="w-44" placeholder="部員名で絞り込み" leadingIcon={Icon.filter}/>
          <Button kind="primary" icon={Icon.plus}>新規登録</Button>
        </div>
      </header>

      <main className="flex-1 p-7 overflow-hidden">
        {/* サマリ */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <Card pad={true}><Stat label="今月の半荘数" value="14" big sub="2026年5月"/></Card>
          <Card pad={true}><Stat label="チップあり率" value="71%" tone="gold" big sub="10 / 14 半荘"/></Card>
          <Card pad={true}><Stat label="平均参加人数" value="4.0" big sub="人 / 半荘"/></Card>
        </div>

        <Card pad={false}>
          <div className="px-5 h-12 flex items-center border-b border-line">
            <h3 className="text-[14px] font-semibold text-ink-1">半荘記録</h3>
            <span className="ml-2 text-[11px] text-ink-3">{games.length}件</span>
            <Chip tone="felt" selected size="sm" className="ml-3">2026/05</Chip>
          </div>
          <table className="w-full text-[12.5px]">
            <thead className="bg-paper">
              <tr className="text-[10px] tracking-wider text-ink-3 uppercase">
                <th className="text-left font-medium pl-5 py-3">対戦日時</th>
                <th className="text-left font-medium py-3">1着</th>
                <th className="text-left font-medium py-3">2着</th>
                <th className="text-left font-medium py-3">3着</th>
                <th className="text-left font-medium py-3">4着</th>
                <th className="text-left font-medium py-3">チップ</th>
                <th className="text-right font-medium pr-5 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {games.map((g,i)=>(
                <tr key={i} className="border-t border-line hover:bg-paper align-top">
                  <td className="pl-5 py-3 num text-ink-2 whitespace-nowrap">{g.date}</td>
                  {g.players.map((p,j)=>(
                    <td key={j} className="py-3">
                      <div className="flex items-center gap-1.5">
                        <span className={cls("pai", j===0&&'red', j===1&&'gold', j===2&&'green')} style={{width:18,height:24,fontSize:11}}>{j+1}</span>
                        <div className="leading-tight">
                          <div className="text-ink-1">{p}</div>
                          <div className={"num text-[11px] "+(g.points[j].startsWith('−')?'text-neg':'text-felt')}>{g.points[j]} P</div>
                        </div>
                      </div>
                    </td>
                  ))}
                  <td className="py-3">
                    <Chip tone={g.tip==='なし'?'neutral':'felt'} size="sm">{g.tip}</Chip>
                  </td>
                  <td className="pr-5 py-3 text-right">
                    <div className="inline-flex items-center gap-0.5">
                      <button className="h-8 w-8 rounded-md text-ink-3 hover:bg-paper hover:text-ink-1 flex items-center justify-center" title="編集">
                        <Icon.edit width="15" height="15"/>
                      </button>
                      <button className="h-8 w-8 rounded-md text-ink-3 hover:bg-neg-soft hover:text-neg flex items-center justify-center" title="削除">
                        <Icon.trash width="15" height="15"/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center px-5 h-12 border-t border-line text-[11px] text-ink-3">
            <span>1–7 / 14 件</span>
            <div className="ml-auto flex items-center gap-1">
              <button className="h-7 px-2 rounded border border-line-strong text-ink-2">‹</button>
              <button className="h-7 px-2 rounded bg-ink-1 text-white text-[11px] num">1</button>
              <button className="h-7 px-2 rounded border border-line-strong text-ink-2 num">2</button>
              <button className="h-7 px-2 rounded border border-line-strong text-ink-2">›</button>
            </div>
          </div>
        </Card>
      </main>
    </AdminLayout>
  );
}

Object.assign(window, { AdminMembersScreen, AdminScoresScreen });
