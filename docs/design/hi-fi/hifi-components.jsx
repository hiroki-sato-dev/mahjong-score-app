// Shared design tokens, primitives, charts for the hi-fi design.
// Every <script type="text/babel"> has its own scope, so we expose to window at the end.

const Icon = {
  // 軽量SVGアイコン群 (lucide風)
  user: (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>,
  users: (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="7" r="3"/><path d="M22 19c0-3-2-5-5-5"/></svg>,
  plus: (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  edit: (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 20h4l11-11-4-4L4 16v4Z"/><path d="M14 6l4 4"/></svg>,
  trash: (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>,
  search:(p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  cal:   (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  chart: (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 20V8M10 20V4M16 20v-8M22 20H2"/></svg>,
  trophy:(p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 4h8v4a4 4 0 1 1-8 0V4Z"/><path d="M8 6H5a3 3 0 0 0 3 5M16 6h3a3 3 0 0 1-3 5"/><path d="M10 14h4l-1 4h-2l-1-4ZM8 21h8"/></svg>,
  settings:(p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.3 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 7 4.3l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1A2 2 0 1 1 19.7 7l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1Z"/></svg>,
  filter:(p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 5h18l-7 9v6l-4-2v-4L3 5Z"/></svg>,
  logout:(p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M16 17l5-5-5-5M21 12H9"/></svg>,
  bell:  (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9ZM10 21a2 2 0 0 0 4 0"/></svg>,
  chevron:(p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 6 6 6-6 6"/></svg>,
  check: (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m5 12 5 5 9-11"/></svg>,
  alert: (p)=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 9v4M12 17h.01M10.3 3.9 2.5 17a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>,
};

// ══════════════ Brand / Logo ══════════════
function Logo({ size=20 }){
  return (
    <div className="flex items-center gap-2">
      <span className="pai red" style={{width:size*1.05,height:size*1.4,fontSize:size*.75}}>中</span>
      <span className="font-semibold tracking-tight text-ink-1" style={{fontSize:size*.85}}>麻雀部スコア</span>
    </div>
  );
}

// ══════════════ Top navigation ══════════════
function TopNav({ active=0, role='部員', name='山田 太郎' }){
  const items = [
    { label:'部員一覧', icon:Icon.users },
    { label:'スコア入力', icon:Icon.plus },
    { label:'成績', icon:Icon.chart },
    { label:'ランキング', icon:Icon.trophy },
  ];
  return (
    <header className="h-14 px-6 bg-surface border-b border-line flex items-center gap-1">
      <Logo size={20}/>
      <nav className="ml-8 flex items-center gap-1">
        {items.map((it,i)=>{
          const Ico = it.icon;
          const on = i===active;
          return (
            <div key={it.label}
              className={"px-3 h-9 rounded-md text-[13px] font-medium flex items-center gap-1.5 cursor-default "+
                (on ? "bg-felt-soft text-felt" : "text-ink-2 hover:text-ink-1 hover:bg-paper")}>
              <Ico width="15" height="15"/>
              {it.label}
            </div>
          );
        })}
      </nav>
      <div className="ml-auto flex items-center gap-3">
        {role==='幹部' && (
          <a className="text-[12px] text-ink-3 ulink">管理画面へ</a>
        )}
        <div className="flex items-center gap-2">
          <span className={"text-[11px] px-2 py-0.5 rounded-full border "+(role==='幹部'?'border-gold text-gold bg-gold-soft':'border-felt/30 text-felt bg-felt-soft')}>
            {role}
          </span>
          <span className="text-[13px] text-ink-2">{name}</span>
          <div className="w-7 h-7 rounded-full bg-felt-soft text-felt flex items-center justify-center text-[11px] font-semibold">
            {name[0]}
          </div>
        </div>
      </div>
    </header>
  );
}

// ══════════════ Admin sidebar ══════════════
function AdminSidebar({ active='部員管理' }){
  const items = [
    { label:'部員管理', icon:Icon.users },
    { label:'スコア管理', icon:Icon.chart },
    { label:'設定', icon:Icon.settings },
  ];
  return (
    <aside className="w-56 shrink-0 bg-surface border-r border-line h-full flex flex-col">
      <div className="px-5 h-14 flex items-center border-b border-line">
        <Logo size={20}/>
      </div>
      <div className="px-3 py-4">
        <div className="text-[10px] tracking-[.12em] font-medium text-ink-3 px-2 mb-2">幹部メニュー</div>
        <div className="flex flex-col gap-0.5">
          {items.map(it=>{
            const Ico = it.icon;
            const on = it.label===active;
            return (
              <div key={it.label}
                className={"px-2.5 h-9 rounded-md text-[13px] font-medium flex items-center gap-2 cursor-default "+
                  (on ? "bg-felt text-white" : "text-ink-2 hover:bg-paper")}>
                <Ico width="15" height="15"/>{it.label}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-auto px-3 py-4 border-t border-line">
        <div className="px-2 text-[12px] text-ink-3 mb-2">— 山田 太郎 (幹部)</div>
        <div className="flex flex-col gap-0.5">
          <div className="px-2.5 h-9 rounded-md text-[13px] text-ink-2 hover:bg-paper flex items-center gap-2 cursor-default">
            <Icon.chevron width="14" height="14" style={{transform:'rotate(180deg)'}}/>通常画面へ戻る
          </div>
          <div className="px-2.5 h-9 rounded-md text-[13px] text-ink-2 hover:bg-paper flex items-center gap-2 cursor-default">
            <Icon.logout width="14" height="14"/>ログアウト
          </div>
        </div>
      </div>
    </aside>
  );
}

// ══════════════ Primitives ══════════════
function Card({ children, className='', title, action, sub, pad=true }){
  return (
    <section className={"bg-surface border border-line rounded-md shadow-card "+className}>
      {(title || action) && (
        <header className="flex items-baseline gap-3 px-5 pt-4 pb-3 border-b border-line">
          {title && <h3 className="text-[14px] font-semibold text-ink-1">{title}</h3>}
          {sub && <span className="text-[11px] text-ink-3">{sub}</span>}
          <div className="ml-auto">{action}</div>
        </header>
      )}
      <div className={pad? "p-5":""}>{children}</div>
    </section>
  );
}

function Button({ children, kind='secondary', size='md', icon:I, className='', ...p }){
  const base = "inline-flex items-center justify-center gap-1.5 font-medium rounded-md transition-colors";
  const sizes = { sm:'h-8 px-3 text-[12px]', md:'h-9 px-4 text-[13px]', lg:'h-10 px-5 text-[14px]' };
  const kinds = {
    primary:'bg-felt text-white hover:bg-felt-deep',
    secondary:'bg-surface text-ink-1 border border-line-strong hover:bg-paper',
    ghost:'text-ink-2 hover:bg-paper',
    danger:'bg-neg text-white hover:bg-neg/90',
    'danger-ghost':'text-neg hover:bg-neg-soft',
  };
  return (
    <button className={`${base} ${sizes[size]} ${kinds[kind]} ${className}`} {...p}>
      {I && <I width="14" height="14"/>}
      {children}
    </button>
  );
}

function Field({ label, value='', placeholder='', type='text', leadingIcon:LI, trailingIcon:TI, hint, error, className='' }){
  return (
    <label className={"flex flex-col gap-1.5 "+className}>
      {label && <span className="text-[12px] font-medium text-ink-2">{label}</span>}
      <div className={"relative h-10 rounded-md border bg-surface flex items-center "+(error?'border-neg':'border-line-strong focus-within:border-felt')}>
        {LI && <LI width="15" height="15" className="ml-3 text-ink-3"/>}
        <span className={"flex-1 px-3 text-[13px] "+(value? 'num text-ink-1' : 'text-ink-3')}>{value || placeholder}</span>
        {TI && <TI width="15" height="15" className="mr-3 text-ink-3"/>}
      </div>
      {hint && !error && <span className="text-[11px] text-ink-3">{hint}</span>}
      {error && <span className="text-[11px] text-neg">{error}</span>}
    </label>
  );
}

function NumField({ label, value, suffix='点', placeholder='0', className='' }){
  return (
    <label className={"flex flex-col gap-1.5 "+className}>
      {label && <span className="text-[12px] font-medium text-ink-2">{label}</span>}
      <div className="h-11 rounded-md border border-line-strong bg-surface flex items-baseline px-3">
        <span className={"flex-1 num text-[18px] font-medium "+(value!==undefined?'text-ink-1':'text-ink-3')}>{value!==undefined ? value : placeholder}</span>
        <span className="text-[12px] text-ink-3 ml-2">{suffix}</span>
      </div>
    </label>
  );
}

function Toggle({ on=false, label, size='md' }){
  const sz = size==='lg' ? { w:46, h:24, knob:18 } : { w:38, h:20, knob:16 };
  return (
    <span className="inline-flex items-center gap-2 text-[13px] text-ink-1">
      <span className={"relative rounded-full transition-colors "+(on?'bg-felt':'bg-line-strong')} style={{width:sz.w,height:sz.h}}>
        <span className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-card transition-all"
          style={{width:sz.knob,height:sz.knob,left: on ? sz.w-sz.knob-2 : 2}}/>
      </span>
      {label && <span>{label}</span>}
    </span>
  );
}

function Tabs({ tabs, active=0 }){
  return (
    <div className="flex items-center gap-0 border-b border-line">
      {tabs.map((t,i)=>(
        <div key={t} className={
          "px-4 h-10 flex items-center text-[13px] font-medium border-b-2 -mb-px cursor-default "+
          (i===active ? "border-felt text-felt" : "border-transparent text-ink-3 hover:text-ink-1")}>
          {t}
        </div>
      ))}
    </div>
  );
}

function Chip({ children, tone='neutral', size='md', selected=false }){
  const tones = {
    neutral: selected ? 'bg-ink-1 text-white border-ink-1' : 'bg-surface text-ink-2 border-line-strong',
    felt:    selected ? 'bg-felt text-white border-felt' : 'bg-felt-soft text-felt border-felt/30',
    neg:     'bg-neg-soft text-neg border-neg/30',
    gold:    'bg-gold-soft text-gold border-gold/40',
  };
  const sizes = { sm:'h-6 px-2 text-[11px]', md:'h-7 px-3 text-[12px]' };
  return (
    <span className={"inline-flex items-center gap-1 rounded-full border font-medium "+tones[tone]+" "+sizes[size]}>{children}</span>
  );
}

function Stat({ label, value, sub, tone='neutral', big=false }){
  const tones = { neutral:'text-ink-1', pos:'text-felt', neg:'text-neg', gold:'text-gold' };
  return (
    <div className="flex flex-col">
      <div className="text-[11px] tracking-wider text-ink-3 uppercase">{label}</div>
      <div className={"num font-semibold "+tones[tone]+" "+(big?'text-[32px] leading-[1.1]':'text-[22px] leading-tight')}>{value}</div>
      {sub && <div className="text-[11px] text-ink-3 mt-0.5">{sub}</div>}
    </div>
  );
}

// ══════════════ Charts (Recharts-shaped SVG) ══════════════
// 横棒グラフ (累計ポイント比較用)
function HBar({ data, width=460, rowH=28, max }){
  const labels = data.map(d=>d.name);
  const values = data.map(d=>d.v);
  const absMax = max ?? Math.max(...values.map(v=>Math.abs(v)))*1.15;
  const labelW = 84;
  const valueW = 64;
  const chartW = width - labelW - valueW - 20;
  const mid = labelW + chartW/2;
  return (
    <svg width={width} height={rowH*data.length+10} className="block">
      <line x1={mid} x2={mid} y1={4} y2={rowH*data.length+4} stroke="#e8e5dc"/>
      {data.map((d,i)=>{
        const y = i*rowH + 8;
        const w = (Math.abs(d.v)/absMax)*(chartW/2);
        const pos = d.v>=0;
        return (
          <g key={d.name}>
            <text x={labelW-8} y={y+12} textAnchor="end" className="fill-ink-2" style={{font:'500 12px "Noto Sans JP"'}}>{d.name}</text>
            <rect x={pos? mid : mid-w} y={y+2} width={w} height={rowH-12} rx="3"
              fill={pos?'#0e5a3c':'#c8312b'} opacity=".85"/>
            <text x={width-valueW+8} y={y+12} className={pos?'fill-felt':'fill-neg'}
              style={{font:'600 12px "JetBrains Mono"',fontFeatureSettings:'"tnum"'}}>
              {pos?'+':''}{d.v.toLocaleString()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// 折れ線グラフ (累計推移)
function LineGraph({ width=460, height=200, series, multi=false }){
  // series: number[] or {name, color, points:number[]}[]
  const lines = multi ? series : [{ name:'累計P', color:'#0e5a3c', points:series }];
  const all = lines.flatMap(l=>l.points);
  const min = Math.min(...all, 0);
  const max = Math.max(...all, 0);
  const range = max-min || 1;
  const padL=44, padR=12, padT=14, padB=24;
  const W = width-padL-padR, H = height-padT-padB;
  const n = lines[0].points.length;
  const sx = i=> padL + (i*(W/(n-1)));
  const sy = v=> padT + H - ((v-min)/range)*H;
  // y ticks
  const ticks = 4;
  const tickVals = Array.from({length:ticks+1},(_,i)=> min + (range*i/ticks));
  return (
    <svg width={width} height={height} className="block">
      {tickVals.map((v,i)=>(
        <g key={i}>
          <line x1={padL} x2={width-padR} y1={sy(v)} y2={sy(v)} stroke="#f0ede4" strokeDasharray={v===0?'0':'2,3'}/>
          <text x={padL-6} y={sy(v)+4} textAnchor="end" className="fill-ink-3"
            style={{font:'500 10px "JetBrains Mono"'}}>{Math.round(v)}</text>
        </g>
      ))}
      {/* x axis labels (months) */}
      {['1月','3月','5月','7月','9月','11月'].map((m,i,arr)=>{
        const x = padL + i*(W/(arr.length-1));
        return <text key={m} x={x} y={height-6} textAnchor="middle" className="fill-ink-3" style={{font:'500 10px "Noto Sans JP"'}}>{m}</text>;
      })}
      {lines.map(l=>{
        const d = l.points.map((v,i)=>`${i===0?'M':'L'}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(' ');
        return (
          <g key={l.name}>
            <path d={d} fill="none" stroke={l.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
            {l.points.map((v,i)=>(
              <circle key={i} cx={sx(i)} cy={sy(v)} r="3" fill="#fff" stroke={l.color} strokeWidth="1.5"/>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// シンプル縦棒グラフ
function VBar({ width=300, height=140, data, color='#0e5a3c' }){
  const max = Math.max(...data.map(d=>Math.abs(d.v)))*1.2;
  const padL=30, padR=8, padT=8, padB=22;
  const W = width-padL-padR, H = height-padT-padB;
  const bw = W/data.length - 8;
  const mid = padT + H/2;
  return (
    <svg width={width} height={height} className="block">
      <line x1={padL} x2={width-padR} y1={mid} y2={mid} stroke="#e8e5dc"/>
      <text x={padL-4} y={padT+8} textAnchor="end" className="fill-ink-3" style={{font:'500 9px "JetBrains Mono"'}}>+{Math.round(max)}</text>
      <text x={padL-4} y={padT+H} textAnchor="end" className="fill-ink-3" style={{font:'500 9px "JetBrains Mono"'}}>−{Math.round(max)}</text>
      {data.map((d,i)=>{
        const x = padL + i*(W/data.length) + 4;
        const bh = (Math.abs(d.v)/max)*(H/2-2);
        const y = d.v>=0 ? mid-bh : mid;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} rx="2" fill={d.v>=0?color:'#c8312b'} opacity=".85"/>
            <text x={x+bw/2} y={height-6} textAnchor="middle" className="fill-ink-3" style={{font:'500 10px "Noto Sans JP"'}}>{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

// 順位分布（積み上げ風シンプル）
function RankDist({ width=300, height=120, dist=[0.32,0.28,0.22,0.18] }){
  // dist: [1位率,2位,3位,4位]
  const colors = ['#c8312b','#a8893a','#0e5a3c','#52524d'];
  const ranks = ['1位','2位','3位','4位'];
  const padL=44, padR=8, padT=8, padB=24;
  const W = width-padL-padR, H = height-padT-padB;
  const bw = W/4 - 14;
  return (
    <svg width={width} height={height} className="block">
      <line x1={padL} x2={width-padR} y1={padT+H} y2={padT+H} stroke="#e8e5dc"/>
      {dist.map((p,i)=>{
        const x = padL + i*(W/4) + 7;
        const bh = p*H;
        return (
          <g key={i}>
            <rect x={x} y={padT+H-bh} width={bw} height={bh} rx="2" fill={colors[i]} opacity=".85"/>
            <text x={x+bw/2} y={padT+H-bh-4} textAnchor="middle" className="fill-ink-2" style={{font:'600 10px "JetBrains Mono"'}}>{Math.round(p*100)}%</text>
            <text x={x+bw/2} y={height-8} textAnchor="middle" className="fill-ink-3" style={{font:'500 11px "Noto Sans JP"'}}>{ranks[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ミニスパークライン (部員カード用)
function Spark({ width=200, height=32, points }){
  const min = Math.min(...points), max = Math.max(...points);
  const range = max-min || 1;
  const sx = i => i*(width/(points.length-1));
  const sy = v => height-3 - ((v-min)/range)*(height-6);
  const d = points.map((v,i)=>`${i===0?'M':'L'}${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(' ');
  const zero = sy(0);
  const last = points[points.length-1];
  const up = last >= points[0];
  return (
    <svg width={width} height={height} className="block">
      <line x1="0" x2={width} y1={zero} y2={zero} stroke="#e8e5dc" strokeDasharray="2,2"/>
      <path d={d} fill="none" stroke={up?'#0e5a3c':'#c8312b'} strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx={sx(points.length-1)} cy={sy(last)} r="2.5" fill={up?'#0e5a3c':'#c8312b'}/>
    </svg>
  );
}

// ══════════════ 共通モックデータ ══════════════
const MEMBERS = [
  { name:'山田 太郎', initial:'山', total:1420, games:42, last:'2026/05/18', avg:33.8, role:'幹部',
    trend:[0,12,8,22,18,30,26,42,38,55,48,62,70,82,75,90,98,110,118,142] },
  { name:'佐藤 花子', initial:'佐', total:820, games:38, last:'2026/05/18', avg:21.6, role:'幹部',
    trend:[0,8,18,14,28,22,36,30,42,38,50,46,58,52,62,70,76,72,80,82] },
  { name:'田中 二郎', initial:'田', total:540, games:30, last:'2026/05/15', avg:18.0, role:'部員',
    trend:[0,-4,8,2,14,8,20,16,26,22,30,28,36,40,44,48,52,50,52,54] },
  { name:'伊藤 四郎', initial:'伊', total:220, games:26, last:'2026/05/10', avg:8.5, role:'部員',
    trend:[0,-8,-2,4,-2,8,4,12,8,18,14,20,16,22,18,24,20,18,22,22] },
  { name:'鈴木 一郎', initial:'鈴', total:-310, games:35, last:'2026/05/16', avg:-8.9, role:'部員',
    trend:[0,8,4,-2,-8,-4,-12,-8,-18,-14,-22,-18,-26,-22,-28,-32,-28,-32,-28,-31] },
  { name:'高橋 三郎', initial:'高', total:-1120, games:28, last:'2026/05/12', avg:-40.0, role:'部員',
    trend:[0,-12,-8,-22,-16,-32,-28,-48,-42,-62,-58,-78,-72,-88,-82,-98,-92,-104,-108,-112] },
];

const fmtP = v => `${v>=0?'+':''}${v.toLocaleString()}`;
const cls = (...xs)=> xs.filter(Boolean).join(' ');

Object.assign(window, {
  Icon, Logo, TopNav, AdminSidebar,
  Card, Button, Field, NumField, Toggle, Tabs, Chip, Stat,
  HBar, LineGraph, VBar, RankDist, Spark,
  MEMBERS, fmtP, cls,
});
