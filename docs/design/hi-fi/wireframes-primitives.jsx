// Shared building blocks for the mahjong score app wireframes.
// All styles are wireframe-y: dashed/solid ink lines, monospace data, hand-drawn touches.
// Exposed via window.* at the bottom because each <script type="text/babel"> is its own scope.

const WF_PALETTE = {
  paper:'#f4ece0', ink:'#1a1a1a', felt:'#0e5a3c', red:'#c8312b', gold:'#a8893a',
};

// ── Top bar (used on every "real" screen artboard) ─────────────────
function TopBar({ title='麻雀部スコア', tab=0, role='部員', tabs=['部員一覧','スコア入力','成績','ランキング'] }){
  return (
    <div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 14px',borderBottom:'1.5px solid #1a1a1a',background:'#f4ece0'}}>
      <div style={{display:'flex',alignItems:'center',gap:6}}>
        <span className="tile green">中</span>
        <span style={{fontSize:14}}>{title}</span>
      </div>
      <div style={{display:'flex',gap:0,marginLeft:18,alignSelf:'flex-end'}}>
        {tabs.map((t,i)=>(
          <div key={i} className={"tab"+(i===tab?" active":"")} style={{fontSize:11,padding:'4px 10px'}}>{t}</div>
        ))}
      </div>
      <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:8}}>
        <span className="chip green" style={{fontSize:10}}>● {role}</span>
        <span className="label">山田 太郎</span>
        <div className="ink" style={{width:22,height:22,borderRadius:'50%',background:'#efe7d8'}}/>
      </div>
    </div>
  );
}

// ── Sidebar (admin) ────────────────────────────────────────────────
function Sidebar({ active='部員管理', items=['部員管理','スコア管理','設定'] }){
  return (
    <div style={{width:140,padding:'12px 8px',borderRight:'1.5px solid #1a1a1a',background:'#efe7d8',display:'flex',flexDirection:'column',gap:4}}>
      <div className="label" style={{margin:'4px 6px 8px'}}>幹部メニュー</div>
      {items.map(it=>(
        <div key={it} className={'nav-item'+(it===active?' active':'')}>
          <span className="dot"/>{it}
        </div>
      ))}
      <div style={{flex:1}}/>
      <div className="label" style={{margin:'8px 6px 2px'}}>切替</div>
      <div className="nav-item"><span className="dot"/>通常画面へ</div>
    </div>
  );
}

// ── Hand-drawn arrow used for annotations ──────────────────────────
function Arrow({ d='M0,0 C10,-6 18,-10 28,-4', flip=false }){
  return (
    <svg width="36" height="22" viewBox="-4 -14 36 22" style={{overflow:'visible',transform:flip?'scaleX(-1)':'none'}}>
      <path d={d} stroke="#c8312b" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <path d="M24,-6 L30,-4 L26,1" stroke="#c8312b" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Section header inside an artboard ──────────────────────────────
function Hdr({ children, sub }){
  return (
    <div style={{display:'flex',alignItems:'baseline',gap:8,marginBottom:6}}>
      <div style={{fontSize:16}} className="uline">{children}</div>
      {sub && <div className="label">{sub}</div>}
    </div>
  );
}

// ── Input field placeholder ────────────────────────────────────────
function Field({ label, value='', w='100%', placeholder, type, sub }){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:3,width:w}}>
      {label && <div className="label">{label}</div>}
      <div className="ink" style={{padding:'5px 8px',background:'#fdfbf4',fontFamily:'var(--mono)',fontSize:12,minHeight:24,display:'flex',alignItems:'center',color:value?'#1a1a1a':'#7a7368'}}>
        {value || placeholder || ' '}
        {type==='date' && <span style={{marginLeft:'auto',opacity:.5}}>📅</span>}
      </div>
      {sub && <div className="label" style={{color:'#7a7368'}}>{sub}</div>}
    </div>
  );
}

// ── Toggle ─────────────────────────────────────────────────────────
function Toggle({ on, label }){
  return (
    <div className={'toggle'+(on?' on':'')}>
      <div className="track"><div className="knob"/></div>
      <span>{label}</span>
    </div>
  );
}

// ── Small SVG bar chart placeholder ───────────────────────────────
function BarChart({ w=260, h=90, data=[8,14,5,-3,11,7,-6,9,12,4], title }){
  const max = Math.max(...data.map(Math.abs))*1.2;
  const bw = (w-20)/data.length - 3;
  const mid = h/2;
  return (
    <div>
      {title && <div className="label" style={{marginBottom:2}}>{title}</div>}
      <svg width={w} height={h} className="ink" style={{background:'#fdfbf4',display:'block'}}>
        <line className="axis" x1="6" y1={mid} x2={w-6} y2={mid} strokeDasharray="2,2"/>
        {data.map((v,i)=>{
          const x = 10 + i*(bw+3);
          const bh = (Math.abs(v)/max)*(h/2-6);
          const y = v>=0 ? mid-bh : mid;
          return <rect key={i} x={x} y={y} width={bw} height={bh} className={v>=0?'bar':'bar alt'}/>;
        })}
      </svg>
    </div>
  );
}

// ── Small line chart placeholder ──────────────────────────────────
function LineChart({ w=260, h=100, series=[0,12,8,22,18,30,26,42,38,55], title }){
  const min = Math.min(...series, 0), max = Math.max(...series);
  const range = max-min || 1;
  const sx = (i)=> 10 + i*((w-20)/(series.length-1));
  const sy = (v)=> h-10 - ((v-min)/range)*(h-20);
  const d = series.map((v,i)=>`${i===0?'M':'L'}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(' ');
  return (
    <div>
      {title && <div className="label" style={{marginBottom:2}}>{title}</div>}
      <svg width={w} height={h} className="ink" style={{background:'#fdfbf4',display:'block'}}>
        <line className="axis" x1="6" y1={sy(0)} x2={w-6} y2={sy(0)} strokeDasharray="2,2"/>
        <path d={d} className="ln"/>
        {series.map((v,i)=>(
          <circle key={i} cx={sx(i)} cy={sy(v)} r="2.5" className="dot"/>
        ))}
      </svg>
    </div>
  );
}

// ── Distribution / box-ish chart ──────────────────────────────────
function DistChart({ w=260, h=90, title='ポイント分布' }){
  // simple histogram placeholder
  const bins=[2,5,8,12,9,6,3,1];
  const max = Math.max(...bins);
  const bw = (w-20)/bins.length-2;
  return (
    <div>
      {title && <div className="label" style={{marginBottom:2}}>{title}</div>}
      <svg width={w} height={h} className="ink" style={{background:'#fdfbf4',display:'block'}}>
        <line className="axis" x1="6" y1={h-10} x2={w-6} y2={h-10}/>
        {bins.map((v,i)=>{
          const x=10+i*(bw+2);
          const bh=(v/max)*(h-22);
          return <rect key={i} x={x} y={h-10-bh} width={bw} height={bh} className="hatch-green" stroke="#1a1a1a" strokeWidth="1" fill="rgba(14,90,60,.2)"/>;
        })}
      </svg>
    </div>
  );
}

// expose
Object.assign(window, { TopBar, Sidebar, Arrow, Hdr, Field, Toggle, BarChart, LineChart, DistChart, WF_PALETTE });
