// 6 screens × 2 variations = 12 wireframe artboards (desktop).
// Each returns the inside of a .wf artboard (DCArtboard already gives the frame).

// ═══════════ 1. ログイン ═══════════════════════════════════════════
function LoginA(){
  return (
    <div className="wf" style={{padding:'40px 60px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:30}}>
        <span className="tile green">中</span>
        <div style={{fontSize:24}}>麻雀部スコア</div>
      </div>
      <div className="ink" style={{width:320,padding:'24px 26px',background:'#fdfbf4',boxShadow:'4px 4px 0 #1a1a1a'}}>
        <Hdr>ログイン</Hdr>
        <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:12}}>
          <Field label="メールアドレス" placeholder="you@example.com"/>
          <Field label="パスワード" placeholder="••••••••"/>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:4}}>
            <span className="label" style={{textDecoration:'underline'}}>パスワードをお忘れの方</span>
          </div>
          <button className="btn primary" style={{marginTop:6}}>ログイン</button>
          <div style={{textAlign:'center'}}>
            <span className="label">アカウント未作成？</span>{' '}
            <span style={{fontSize:12,textDecoration:'underline'}}>新規登録</span>
          </div>
        </div>
      </div>
      <div className="ann" style={{top:30,right:30}}>
        メールパス認証のみ<br/>(MUST要件)
      </div>
    </div>
  );
}

function LoginB(){
  // 雀牌モチーフ・横並びレイアウト
  return (
    <div className="wf" style={{display:'grid',gridTemplateColumns:'1fr 1fr',height:'100%'}}>
      {/* 左：雀卓イラスト面 */}
      <div style={{background:'#0e5a3c',position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,padding:30,transform:'rotate(-4deg)'}}>
          {['一','二','三','四','五','六','七','八','九','發','中','白','東','南','西'].map((t,i)=>(
            <div key={i} className="tile" style={{color: t==='中'?'#c8312b': t==='發'?'#0e5a3c':'#1a1a1a'}}>{t}</div>
          ))}
        </div>
        <div style={{position:'absolute',bottom:14,left:14,color:'#f4ece0',fontSize:11,fontFamily:'var(--mono)'}}>// hero illust placeholder</div>
      </div>
      {/* 右：フォーム */}
      <div style={{padding:'48px 36px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div style={{fontSize:22,marginBottom:4}}>おかえりなさい</div>
        <div className="label" style={{marginBottom:22}}>麻雀部メンバーログイン</div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <Field label="メール" placeholder="you@example.com"/>
          <Field label="パスワード" placeholder="••••••••"/>
          <label style={{display:'flex',alignItems:'center',gap:6,fontSize:12}}>
            <span className="ink" style={{width:14,height:14,display:'inline-block'}}/> ログイン状態を保存
          </label>
          <button className="btn primary">ログインする</button>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <span style={{fontSize:11,textDecoration:'underline'}}>新規登録</span>
            <span style={{fontSize:11,textDecoration:'underline'}}>パスワード再発行</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════ 2. 部員一覧 ═══════════════════════════════════════════
const MEMBERS = [
  ['山田 太郎','+1,420','42','2026/05/18'],
  ['佐藤 花子','+820','38','2026/05/18'],
  ['鈴木 一郎','-310','35','2026/05/16'],
  ['田中 二郎','+540','30','2026/05/15'],
  ['高橋 三郎','-1,120','28','2026/05/12'],
  ['伊藤 四郎','+220','26','2026/05/10'],
];

function MembersA(){
  return (
    <div className="wf">
      <TopBar tab={0}/>
      <div style={{padding:'14px 20px'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <Hdr sub="MEMBER LIST">部員一覧</Hdr>
          <div style={{flex:1}}/>
          <div className="ink" style={{padding:'4px 8px',fontSize:12,background:'#fdfbf4'}}>🔍 検索</div>
          <button className="btn" style={{fontSize:12,padding:'4px 10px'}}>並び替え ▾</button>
        </div>
        <table className="wf-tbl">
          <thead><tr><th>#</th><th>部員名</th><th style={{textAlign:'right'}}>累計P</th><th style={{textAlign:'right'}}>試合数</th><th>最終対戦</th></tr></thead>
          <tbody>
            {MEMBERS.map((m,i)=>(
              <tr key={i}>
                <td className="num">{i+1}</td>
                <td>{m[0]}</td>
                <td className="num" style={{color: m[1].startsWith('-')?'#c8312b':'#0e5a3c'}}>{m[1]}</td>
                <td className="num">{m[2]}</td>
                <td className="mono" style={{fontSize:11}}>{m[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MembersB(){
  return (
    <div className="wf">
      <TopBar tab={0}/>
      <div style={{padding:'14px 20px'}}>
        <Hdr sub="MEMBER LIST">部員一覧</Hdr>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:8}}>
          {MEMBERS.map((m,i)=>(
            <div key={i} className="ink" style={{padding:'10px 12px',background:'#fdfbf4',boxShadow:'2px 2px 0 #1a1a1a',position:'relative'}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div className="ink" style={{width:32,height:32,borderRadius:'50%',background:'#efe7d8',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11}}>{m[0][0]}</div>
                <div>
                  <div style={{fontSize:13}}>{m[0]}</div>
                  <div className="label">最終: {m[3]}</div>
                </div>
                <div style={{marginLeft:'auto',textAlign:'right'}}>
                  <div className="mono" style={{fontSize:14, color: m[1].startsWith('-')?'#c8312b':'#0e5a3c'}}>{m[1]}</div>
                  <div className="label">{m[2]} 戦</div>
                </div>
              </div>
              {/* tiny sparkline */}
              <svg width="100%" height="22" viewBox="0 0 200 22" style={{marginTop:6}}>
                <path d="M0,12 L20,10 L40,14 L60,8 L80,12 L100,6 L120,10 L140,4 L160,8 L180,3 L200,6"
                  stroke="#0e5a3c" strokeWidth="1.2" fill="none"/>
                <line x1="0" y1="12" x2="200" y2="12" stroke="#1a1a1a" strokeWidth=".5" strokeDasharray="2,2"/>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════ 3. 半荘スコア入力 ═══════════════════════════════════════
function ScoreInputA(){
  // 雀卓を上から見たレイアウト
  const seat = (label, name, pos)=>(
    <div style={{...pos,position:'absolute',display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
      <div className="chip green" style={{fontFamily:'var(--hand)'}}>{label}</div>
      <div className="ink" style={{padding:'4px 6px',background:'#fdfbf4',minWidth:96,textAlign:'center',fontSize:12}}>{name}</div>
      <div className="ink" style={{padding:'4px 6px',background:'#fdfbf4',minWidth:96,textAlign:'center',fontFamily:'var(--mono)',fontSize:14}}>
        {label==='東'?'42,300': label==='南'?'31,500': label==='西'?'18,200':'8,000'}
      </div>
    </div>
  );
  return (
    <div className="wf">
      <TopBar tab={1}/>
      <div style={{padding:'12px 20px',display:'grid',gridTemplateColumns:'1fr 240px',gap:16}}>
        {/* 卓 */}
        <div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
            <Hdr sub="HANCHAN INPUT">半荘スコア入力</Hdr>
          </div>
          <div style={{position:'relative',aspectRatio:'1.1 / 1',background:'#0e5a3c',border:'2px solid #1a1a1a',borderRadius:8,boxShadow:'4px 4px 0 #1a1a1a'}}>
            {/* 卓中央 */}
            <div style={{position:'absolute',inset:'22% 22%',border:'1.5px dashed rgba(244,236,224,.6)',borderRadius:6,background:'rgba(0,0,0,.15)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4}}>
              <div className="label" style={{color:'#f4ece0'}}>本日 1半荘目</div>
              <div style={{color:'#f4ece0',fontSize:13,fontFamily:'var(--mono)'}}>合計 100,000</div>
              <div className="chip" style={{borderColor:'#f4ece0',color:'#f4ece0',marginTop:4}}>✓ 残り 0 点</div>
            </div>
            {seat('東','山田 太郎',{top:8,left:'50%',transform:'translateX(-50%)'})}
            {seat('南','佐藤 花子',{top:'50%',right:8,transform:'translateY(-50%)'})}
            {seat('西','鈴木 一郎',{bottom:8,left:'50%',transform:'translateX(-50%)'})}
            {seat('北','田中 二郎',{top:'50%',left:8,transform:'translateY(-50%)'})}
          </div>
        </div>
        {/* 右パネル */}
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <Field label="対戦日付" value="2026 / 05 / 19" type="date"/>
          <div className="ink" style={{padding:'10px',background:'#fdfbf4'}}>
            <div className="label" style={{marginBottom:6}}>チップ</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <Toggle on label="あり"/>
              <Field w="70px" value="3" sub="枚"/>
            </div>
          </div>
          <div className="ink" style={{padding:'10px',background:'#fdfbf4'}}>
            <div className="label" style={{marginBottom:6}}>自動計算プレビュー</div>
            <table className="wf-tbl" style={{fontSize:11}}>
              <tbody>
                <tr><td>1着 山田</td><td className="num" style={{color:'#0e5a3c'}}>+86.5P</td></tr>
                <tr><td>2着 佐藤</td><td className="num" style={{color:'#0e5a3c'}}>+17.5P</td></tr>
                <tr><td>3着 鈴木</td><td className="num" style={{color:'#c8312b'}}>−21.8P</td></tr>
                <tr><td>4着 田中</td><td className="num" style={{color:'#c8312b'}}>−82.0P</td></tr>
              </tbody>
            </table>
            <div className="label" style={{marginTop:4}}>※ 1000点=50P / 返し30000 / ウマ ±20±10</div>
          </div>
          <button className="btn primary">この半荘を登録</button>
        </div>
      </div>
      <div className="ann" style={{top:90,left:330}}>
        <Arrow d="M0,0 C-10,-4 -16,-10 -20,-14"/>
        卓を囲む雰囲気
      </div>
    </div>
  );
}

function ScoreInputB(){
  // シンプル縦リスト＋自動計算
  return (
    <div className="wf">
      <TopBar tab={1}/>
      <div style={{padding:'14px 22px'}}>
        <Hdr sub="HANCHAN INPUT">半荘スコア入力</Hdr>
        <div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:18,marginTop:8}}>
          {/* 左 設定 */}
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <Field label="日付" value="2026/05/19" type="date"/>
            <div className="ink" style={{padding:'8px 10px',background:'#fdfbf4'}}>
              <div className="label" style={{marginBottom:6}}>チップあり</div>
              <Toggle on label="あり (3枚)"/>
            </div>
            <div className="ink" style={{padding:'8px 10px',background:'#fdfbf4'}}>
              <div className="label">合計チェック</div>
              <div className="mono" style={{fontSize:16,color:'#0e5a3c'}}>100,000 ✓</div>
            </div>
          </div>
          {/* 右 4プレイヤー */}
          <div>
            <table className="wf-tbl">
              <thead><tr><th>着</th><th>部員</th><th>素点</th><th>ウマ</th><th>オカ</th><th>合計P</th></tr></thead>
              <tbody>
                {[['1','山田 太郎','42,300','+20','+30','+86.5','#0e5a3c'],
                  ['2','佐藤 花子','31,500','+10',' 0','+17.5','#0e5a3c'],
                  ['3','鈴木 一郎','18,200','−10',' 0','−21.8','#c8312b'],
                  ['4','田中 二郎','8,000','−20',' 0','−82.0','#c8312b']].map((r,i)=>(
                  <tr key={i}>
                    <td><span className="tile" style={{width:18,height:24,fontSize:12,color:i===0?'#c8312b':'#1a1a1a'}}>{r[0]}</span></td>
                    <td>{r[1]}</td>
                    <td className="num">{r[2]}</td>
                    <td className="num" style={{color:'#7a7368'}}>{r[3]}</td>
                    <td className="num" style={{color:'#7a7368'}}>{r[4]}</td>
                    <td className="num" style={{color:r[6]}}>{r[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{display:'flex',alignItems:'center',gap:10,marginTop:14}}>
              <div className="ann" style={{position:'static'}}>4人入れたら<br/>自動で計算</div>
              <Arrow d="M0,0 C12,-6 24,-10 36,-4"/>
              <div style={{flex:1}}/>
              <button className="btn">下書き保存</button>
              <button className="btn primary">登録する</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════ 4. 成績確認 ════════════════════════════════════════════
function ResultsA(){
  // 日別タブ
  return (
    <div className="wf">
      <TopBar tab={2}/>
      <div style={{padding:'14px 20px'}}>
        <Hdr sub="RESULTS">成績確認</Hdr>
        <div className="tabs" style={{marginTop:6}}>
          <div className="tab active">日別</div>
          <div className="tab">累計</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'180px 1fr',gap:14,marginTop:10}}>
          <div>
            <Field label="日付" value="2026/05/19" type="date"/>
            <div className="ink" style={{marginTop:10,padding:8,background:'#fdfbf4'}}>
              <div className="label">この日の収支</div>
              <div className="mono" style={{fontSize:20,color:'#0e5a3c'}}>+104.0 P</div>
              <div className="label">3 半荘 / 4人</div>
            </div>
          </div>
          <div>
            {[1,2,3].map(n=>(
              <div key={n} className="ink" style={{padding:'8px 10px',background:'#fdfbf4',marginBottom:8}}>
                <div style={{display:'flex',alignItems:'center'}}>
                  <span className="label">半荘 #{n}  20:1{n} 開始</span>
                  <span className="chip green" style={{marginLeft:8,fontSize:10}}>チップ {n%2?'あり':'なし'}</span>
                  <span style={{marginLeft:'auto',fontSize:11,textDecoration:'underline'}}>詳細 ▸</span>
                </div>
                <table className="wf-tbl" style={{marginTop:4}}>
                  <tbody>
                    {[['1','山田','+86.5','#0e5a3c'],['2','佐藤','+17.5','#0e5a3c'],['3','鈴木','−21.8','#c8312b'],['4','田中','−82.0','#c8312b']].map((r,i)=>(
                      <tr key={i}><td style={{width:24}}>{r[0]}</td><td>{r[1]}</td><td className="num" style={{color:r[3]}}>{r[2]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsB(){
  // 累計タブ + グラフ
  return (
    <div className="wf">
      <TopBar tab={2}/>
      <div style={{padding:'14px 20px'}}>
        <Hdr sub="RESULTS">成績確認</Hdr>
        <div className="tabs" style={{marginTop:6}}>
          <div className="tab">日別</div>
          <div className="tab active">累計</div>
        </div>
        <div style={{display:'flex',gap:8,marginTop:10,alignItems:'center'}}>
          <span className="label">期間</span>
          <div className="chip">全期間</div>
          <div className="chip">2026年</div>
          <div className="chip green">5月</div>
          <div className="chip">4月</div>
          <div style={{flex:1}}/>
          <span className="label">対象: 自分</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginTop:10}}>
          {[['累計P','+1,420','42戦','#0e5a3c'],['平均P/戦','+33.8','/半荘','#0e5a3c'],['最高/最低','+186 / −94','best/worst','#1a1a1a']].map((c,i)=>(
            <div key={i} className="ink" style={{padding:'8px 10px',background:'#fdfbf4'}}>
              <div className="label">{c[0]}</div>
              <div className="mono" style={{fontSize:18,color:c[3]}}>{c[1]}</div>
              <div className="label">{c[2]}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:10,display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:10}}>
          <LineChart w={360} h={140} title="累計ポイント推移" series={[0,30,18,55,42,88,75,120,108,140,128,165]}/>
          <BarChart w={250} h={140} title="月別収支" data={[40,-22,18,55,-12,80]}/>
        </div>
        <div className="ann" style={{right:24,top:90}}>タブ切替<br/>(useState)</div>
      </div>
    </div>
  );
}

// ═══════════ 5. ランキング ══════════════════════════════════════════
function RankingA(){
  // シンプル順位＋棒グラフ
  return (
    <div className="wf">
      <TopBar tab={3}/>
      <div style={{padding:'14px 20px'}}>
        <div style={{display:'flex',alignItems:'center'}}>
          <Hdr sub="RANKING">ランキング</Hdr>
          <div style={{flex:1}}/>
          <div className="chip green">5月</div>
          <div className="chip" style={{marginLeft:4}}>全期間</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:6}}>
          <table className="wf-tbl">
            <thead><tr><th>#</th><th>部員</th><th style={{textAlign:'right'}}>累計P</th><th style={{textAlign:'right'}}>試合</th><th style={{textAlign:'right'}}>平均</th></tr></thead>
            <tbody>
              {MEMBERS.map((m,i)=>(
                <tr key={i}>
                  <td><span className="tile" style={{width:18,height:24,fontSize:12,color:i===0?'#c8312b':i<3?'#a8893a':'#1a1a1a'}}>{i+1}</span></td>
                  <td>{m[0]}</td>
                  <td className="num" style={{color:m[1].startsWith('-')?'#c8312b':'#0e5a3c'}}>{m[1]}</td>
                  <td className="num">{m[2]}</td>
                  <td className="num">{(parseFloat(m[1].replace(',',''))/parseInt(m[2])).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <BarChart w={280} h={150} title="累計ポイント比較" data={[1420,820,540,220,-310,-1120].map(v=>v/30)}/>
            <div style={{marginTop:10}}>
              <DistChart w={280} h={120} title="順位分布（自分）"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RankingB(){
  // 表彰台＋推移グラフ
  const podium = (rank, name, pts, h)=>(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
      <div className="tile" style={{width:32,height:42,fontSize:18,color:rank===1?'#c8312b':rank===2?'#a8893a':'#0e5a3c'}}>{rank}</div>
      <div style={{fontSize:12}}>{name}</div>
      <div className="mono" style={{fontSize:12,color:'#0e5a3c'}}>{pts}</div>
      <div className="ink hatch-green" style={{width:60,height:h,background:'rgba(14,90,60,.15)'}}/>
    </div>
  );
  return (
    <div className="wf">
      <TopBar tab={3}/>
      <div style={{padding:'14px 20px'}}>
        <div style={{display:'flex',alignItems:'center'}}>
          <Hdr sub="RANKING">ランキング</Hdr>
          <div style={{flex:1}}/>
          <div className="chip">全期間</div>
          <div className="chip green" style={{marginLeft:4}}>2026年</div>
          <div className="chip" style={{marginLeft:4}}>月別</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:8}}>
          {/* 表彰台 */}
          <div className="ink" style={{padding:'14px 12px',background:'#fdfbf4'}}>
            <div className="label" style={{marginBottom:10}}>TOP 3 ✨</div>
            <div style={{display:'flex',alignItems:'flex-end',justifyContent:'center',gap:8,height:140}}>
              {podium(2,'佐藤 花子','+820',60)}
              {podium(1,'山田 太郎','+1,420',90)}
              {podium(3,'田中 二郎','+540',40)}
            </div>
            <div className="label" style={{marginTop:8}}>4位以下</div>
            <table className="wf-tbl" style={{marginTop:2}}>
              <tbody>
                {MEMBERS.slice(3).map((m,i)=>(
                  <tr key={i}>
                    <td style={{width:24}}>{i+4}</td>
                    <td>{m[0]}</td>
                    <td className="num" style={{color:m[1].startsWith('-')?'#c8312b':'#0e5a3c'}}>{m[1]}</td>
                    <td className="num">{m[2]}戦</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <LineChart w={300} h={150} title="累計ポイント推移 (全員)" series={[0,20,45,30,65,50,90,80,110,120,140,165]}/>
            <DistChart w={300} h={120} title="順位分布"/>
            <div className="label">※ Rechartsで実装予定</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════ 6. 幹部用管理画面 ═══════════════════════════════════════
function AdminA(){
  // 部員管理
  return (
    <div className="wf" style={{display:'flex'}}>
      <Sidebar active="部員管理"/>
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar tab={-1} tabs={[]} role="幹部"/>
        <div style={{padding:'14px 18px'}}>
          <div style={{display:'flex',alignItems:'center'}}>
            <Hdr sub="MANAGE MEMBERS">部員管理</Hdr>
            <div style={{flex:1}}/>
            <button className="btn primary" style={{fontSize:12,padding:'4px 10px'}}>＋ 部員追加</button>
          </div>
          <table className="wf-tbl" style={{marginTop:6}}>
            <thead><tr><th>名前</th><th>メール</th><th>ロール</th><th style={{textAlign:'right'}}>試合数</th><th style={{textAlign:'right'}}>操作</th></tr></thead>
            <tbody>
              {MEMBERS.map((m,i)=>(
                <tr key={i}>
                  <td>{m[0]}</td>
                  <td className="mono" style={{fontSize:10}}>{m[0].split(' ').join('').toLowerCase()}@club.jp</td>
                  <td>
                    <span className={'chip '+(i<2?'red':'green')} style={{fontSize:10}}>{i<2?'幹部':'部員'}</span>
                  </td>
                  <td className="num">{m[2]}</td>
                  <td style={{textAlign:'right',whiteSpace:'nowrap'}}>
                    <span style={{textDecoration:'underline',fontSize:11,marginRight:8}}>編集</span>
                    <span style={{textDecoration:'underline',fontSize:11,color:'#c8312b'}}>削除</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="ann" style={{left:8,bottom:8}}>サイドバー切替<br/>(要件通り)</div>
    </div>
  );
}

function AdminB(){
  // スコア管理
  return (
    <div className="wf" style={{display:'flex'}}>
      <Sidebar active="スコア管理"/>
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        <TopBar tab={-1} tabs={[]} role="幹部"/>
        <div style={{padding:'14px 18px'}}>
          <div style={{display:'flex',alignItems:'center'}}>
            <Hdr sub="MANAGE SCORES">スコア管理</Hdr>
            <div style={{flex:1}}/>
            <div className="chip">2026/05</div>
            <div className="chip green" style={{marginLeft:4}}>🔍 検索</div>
          </div>
          <table className="wf-tbl" style={{marginTop:6}}>
            <thead><tr><th>日付</th><th>1着</th><th>2着</th><th>3着</th><th>4着</th><th>チップ</th><th style={{textAlign:'right'}}>操作</th></tr></thead>
            <tbody>
              {[
                ['05/19 20:11','山田 +86.5','佐藤 +17.5','鈴木 −21.8','田中 −82.0','3枚'],
                ['05/19 21:22','佐藤 +72.0','山田 +12.0','田中 −20.0','鈴木 −64.0','—'],
                ['05/18 19:40','鈴木 +90.5','田中 +28.0','佐藤 −18.5','山田 −100.0','2枚'],
                ['05/16 22:03','山田 +66.0','田中 +14.0','佐藤 −22.0','鈴木 −58.0','—'],
                ['05/15 20:15','佐藤 +84.0','鈴木 +20.0','山田 −18.0','田中 −86.0','1枚'],
              ].map((r,i)=>(
                <tr key={i}>
                  <td className="mono" style={{fontSize:10}}>{r[0]}</td>
                  <td className="mono" style={{fontSize:11,color:'#0e5a3c'}}>{r[1]}</td>
                  <td className="mono" style={{fontSize:11}}>{r[2]}</td>
                  <td className="mono" style={{fontSize:11}}>{r[3]}</td>
                  <td className="mono" style={{fontSize:11,color:'#c8312b'}}>{r[4]}</td>
                  <td>{r[5]}</td>
                  <td style={{textAlign:'right',whiteSpace:'nowrap'}}>
                    <span style={{textDecoration:'underline',fontSize:11,marginRight:8}}>編集</span>
                    <span style={{textDecoration:'underline',fontSize:11,color:'#c8312b'}}>削除</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="label" style={{marginTop:10}}>※ 編集ボタンで素点を直接書き換え可能。ポイントは自動再計算。</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  LoginA, LoginB, MembersA, MembersB, ScoreInputA, ScoreInputB,
  ResultsA, ResultsB, RankingA, RankingB, AdminA, AdminB
});
