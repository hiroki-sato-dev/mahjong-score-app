// Mobile variants of the key screens (one variation per screen — responsive sketch).

function MobileFrame({ children }){
  return (
    <div className="wf" style={{padding:0,display:'flex',flexDirection:'column'}}>
      {/* status bar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'4px 12px',fontFamily:'var(--mono)',fontSize:10,borderBottom:'1px dashed #1a1a1a'}}>
        <span>9:41</span>
        <span>●●●  100%</span>
      </div>
      {children}
    </div>
  );
}

function BottomNav({ active=0 }){
  const items = [['一覧','📋'],['入力','✏️'],['成績','📊'],['順位','🏆']];
  return (
    <div style={{marginTop:'auto',display:'flex',borderTop:'1.5px solid #1a1a1a',background:'#fdfbf4'}}>
      {items.map((it,i)=>(
        <div key={i} style={{flex:1,padding:'8px 4px',textAlign:'center',background:i===active?'#1a1a1a':'transparent',color:i===active?'#f4ece0':'#1a1a1a',fontSize:11}}>
          <div style={{fontSize:14}}>{it[1]}</div>
          {it[0]}
        </div>
      ))}
    </div>
  );
}

// Mobile: ログイン
function MLogin(){
  return (
    <MobileFrame>
      <div style={{padding:'30px 22px',flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
        <span className="tile green" style={{width:34,height:44,fontSize:22,marginTop:20}}>中</span>
        <div style={{fontSize:18,marginBottom:14}}>麻雀部スコア</div>
        <Field label="メール" placeholder="you@example.com"/>
        <Field label="パスワード" placeholder="••••••••"/>
        <button className="btn primary" style={{width:'100%',marginTop:8}}>ログイン</button>
        <div style={{fontSize:11,textDecoration:'underline',marginTop:6}}>新規登録</div>
      </div>
    </MobileFrame>
  );
}

// Mobile: スコア入力（卓レイアウト縦版）
function MScore(){
  const seat = (label,name,score,pos)=>(
    <div style={{position:'absolute',display:'flex',flexDirection:'column',alignItems:'center',gap:3,...pos}}>
      <div className="chip green" style={{fontSize:10}}>{label}</div>
      <div className="ink" style={{padding:'2px 4px',background:'#fdfbf4',fontSize:10,minWidth:70,textAlign:'center'}}>{name}</div>
      <div className="ink mono" style={{padding:'2px 4px',background:'#fdfbf4',fontSize:11,minWidth:70,textAlign:'center'}}>{score}</div>
    </div>
  );
  return (
    <MobileFrame>
      <div style={{padding:'8px 10px',borderBottom:'1.5px solid #1a1a1a',display:'flex',alignItems:'center',gap:6}}>
        <span style={{fontSize:14}}>← 半荘入力</span>
        <div style={{flex:1}}/>
        <span className="label">2026/05/19</span>
      </div>
      <div style={{padding:10,flex:1,display:'flex',flexDirection:'column',gap:10,overflow:'hidden'}}>
        <div style={{position:'relative',aspectRatio:'1/1',background:'#0e5a3c',border:'1.5px solid #1a1a1a',borderRadius:6}}>
          <div style={{position:'absolute',inset:'25% 22%',border:'1px dashed rgba(244,236,224,.6)',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',color:'#f4ece0',fontSize:10}}>合計 100,000 ✓</div>
          {seat('東','山田','42,300',{top:4,left:'50%',transform:'translateX(-50%)'})}
          {seat('南','佐藤','31,500',{top:'50%',right:4,transform:'translateY(-50%)'})}
          {seat('西','鈴木','18,200',{bottom:4,left:'50%',transform:'translateX(-50%)'})}
          {seat('北','田中','8,000',{top:'50%',left:4,transform:'translateY(-50%)'})}
        </div>
        <div className="ink" style={{padding:'6px 8px',background:'#fdfbf4',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Toggle on label="チップ あり 3枚"/>
        </div>
        <button className="btn primary" style={{width:'100%'}}>登録する（自動計算）</button>
      </div>
      <BottomNav active={1}/>
    </MobileFrame>
  );
}

// Mobile: ランキング
function MRanking(){
  return (
    <MobileFrame>
      <div style={{padding:'8px 12px',borderBottom:'1.5px solid #1a1a1a',display:'flex',alignItems:'center',gap:6}}>
        <span style={{fontSize:14}}>🏆 ランキング</span>
        <div style={{flex:1}}/>
        <div className="chip green" style={{fontSize:10}}>5月</div>
      </div>
      <div style={{padding:10,flex:1,overflow:'hidden',display:'flex',flexDirection:'column',gap:8}}>
        <BarChart w={250} h={70} data={[1420,820,540,220,-310,-1120].map(v=>v/30)} title="累計ポイント"/>
        <div className="ink" style={{background:'#fdfbf4'}}>
          {[
            ['1','山田 太郎','+1,420','42戦'],
            ['2','佐藤 花子','+820','38戦'],
            ['3','田中 二郎','+540','30戦'],
            ['4','伊藤 四郎','+220','26戦'],
            ['5','鈴木 一郎','−310','35戦'],
            ['6','高橋 三郎','−1,120','28戦'],
          ].map((r,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'6px 8px',borderBottom:i<5?'1px dashed #1a1a1a':'none'}}>
              <span className="tile" style={{width:18,height:24,fontSize:11,color:i===0?'#c8312b':i<3?'#a8893a':'#1a1a1a'}}>{r[0]}</span>
              <span style={{fontSize:12,flex:1}}>{r[1]}</span>
              <span className="mono" style={{fontSize:12,color:r[2].startsWith('−')?'#c8312b':'#0e5a3c'}}>{r[2]}</span>
              <span className="label">{r[3]}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active={3}/>
    </MobileFrame>
  );
}

Object.assign(window, { MLogin, MScore, MRanking });
