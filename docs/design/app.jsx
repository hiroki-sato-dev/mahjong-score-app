// Compose all artboards inside the design canvas.

const { useState } = React;

function App(){
  return (
    <DesignCanvas>
      <DCSection id="intro" title="麻雀部スコア管理アプリ" subtitle="ワイヤーフレーム / 6画面 × 2案 + モバイル">
        <DCArtboard id="brief" label="設計メモ" width={420} height={620}>
          <div style={{padding:'22px 24px',background:'#fdfbf4',height:'100%',fontFamily:'var(--hand)',color:'#1a1a1a',fontSize:13,lineHeight:1.6,overflow:'hidden',position:'relative'}}>
            <div className="stamp" style={{position:'absolute',top:14,right:14}}>DRAFT v1</div>
            <div style={{fontSize:20,marginBottom:6}}>麻雀部スコア管理</div>
            <div className="label" style={{marginBottom:14}}>WIREFRAME / 2026.05</div>
            <div style={{fontSize:15,marginTop:6}}>📌 デザイン方針</div>
            <ul style={{paddingLeft:18,margin:'4px 0 12px'}}>
              <li>手描きスケッチ風で構造に集中</li>
              <li>麻雀カラー：紙 / 墨 / 雀卓グリーン / 中の赤</li>
              <li>レスポンシブ前提 (PC + スマホ)</li>
              <li>上部タブ + サイドバー(幹部) のハイブリッド</li>
            </ul>
            <div style={{fontSize:15,marginTop:6}}>📌 重視するUX</div>
            <ul style={{paddingLeft:18,margin:'4px 0 12px'}}>
              <li>スコア入力は <b>卓を囲む雰囲気</b></li>
              <li>4人分入れたら <b>馬岡＋P自動計算</b></li>
              <li>チップは <b>トグルスイッチ</b></li>
              <li>ランキングは <b>グラフ付き</b>（Recharts想定）</li>
            </ul>
            <div style={{fontSize:15,marginTop:6}}>📌 計算ルール</div>
            <div className="ink" style={{padding:'6px 8px',background:'#f4ece0',marginTop:4,fontFamily:'var(--mono)',fontSize:11,lineHeight:1.7}}>
              1000点 = 50P<br/>
              チップ = 100P / 枚<br/>
              返し = 30,000点<br/>
              ウマ = +20 / +10 / −10 / −20
            </div>
            <div className="note" style={{marginTop:14}}>
              各画面 2 案ずつ。気に入った方向性を<br/>選んでいただければ次は中・高解像度へ進めます。
            </div>
          </div>
        </DCArtboard>
        <DCArtboard id="legend" label="記号の凡例" width={260} height={620}>
          <div style={{padding:'18px 18px',background:'#fdfbf4',height:'100%',fontFamily:'var(--hand)',fontSize:12,lineHeight:1.5}}>
            <div className="label" style={{marginBottom:10}}>LEGEND</div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <div><div className="ink" style={{padding:'4px 8px',background:'#fdfbf4',display:'inline-block',fontFamily:'var(--mono)',fontSize:11}}>入力欄</div>
                <div className="label">テキスト入力</div></div>
              <div><button className="btn primary" style={{pointerEvents:'none'}}>主要アクション</button></div>
              <div><button className="btn" style={{pointerEvents:'none'}}>副次アクション</button></div>
              <div><Toggle on label="ON状態"/><br/><Toggle label="OFF状態"/></div>
              <div>
                <div style={{display:'flex',gap:4,marginBottom:4}}>
                  <span className="chip">通常</span><span className="chip green">選択中</span><span className="chip red">注意</span>
                </div>
              </div>
              <div className="ph" style={{height:50,width:'100%'}}><span>image placeholder</span></div>
              <div className="note">手書き赤メモ = 補足説明</div>
              <div className="ann" style={{position:'static',display:'inline-flex',alignItems:'center',gap:4}}><Arrow d="M0,0 C8,-4 14,-6 22,-2"/></div>
              <div style={{display:'flex',gap:4}}>
                <span className="tile">1</span>
                <span className="tile red">中</span>
                <span className="tile green">發</span>
              </div>
            </div>
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="login" title="1. ログイン画面" subtitle="メール＋パスワード認証">
        <DCArtboard id="login-a" label="A · シンプル中央寄せ" width={720} height={520}><LoginA/></DCArtboard>
        <DCArtboard id="login-b" label="B · 雀牌ヒーロー左右分割" width={720} height={520}><LoginB/></DCArtboard>
      </DCSection>

      <DCSection id="members" title="2. 部員一覧" subtitle="累計P / 試合数 / 最終対戦日">
        <DCArtboard id="members-a" label="A · テーブル形式" width={820} height={520}><MembersA/></DCArtboard>
        <DCArtboard id="members-b" label="B · カードグリッド (推移ミニグラフ付)" width={820} height={520}><MembersB/></DCArtboard>
      </DCSection>

      <DCSection id="score" title="3. 半荘スコア入力" subtitle="4人入力 → 自動計算">
        <DCArtboard id="score-a" label="A · 卓を上から見たレイアウト" width={820} height={580}><ScoreInputA/></DCArtboard>
        <DCArtboard id="score-b" label="B · 縦リスト + ウマ/オカ列表示" width={820} height={580}><ScoreInputB/></DCArtboard>
      </DCSection>

      <DCSection id="results" title="4. 成績確認" subtitle="日別 / 累計 タブ切替">
        <DCArtboard id="res-a" label="A · 日別タブ表示" width={820} height={560}><ResultsA/></DCArtboard>
        <DCArtboard id="res-b" label="B · 累計タブ + サマリーカード + グラフ" width={820} height={560}><ResultsB/></DCArtboard>
      </DCSection>

      <DCSection id="ranking" title="5. ランキング" subtitle="グラフ付き (Recharts想定)">
        <DCArtboard id="rank-a" label="A · 表＋棒グラフ＋順位分布" width={820} height={560}><RankingA/></DCArtboard>
        <DCArtboard id="rank-b" label="B · 表彰台＋累計推移折れ線" width={820} height={560}><RankingB/></DCArtboard>
      </DCSection>

      <DCSection id="admin" title="6. 幹部用管理画面" subtitle="左サイドバーで切替">
        <DCArtboard id="admin-a" label="A · 部員管理" width={900} height={560}><AdminA/></DCArtboard>
        <DCArtboard id="admin-b" label="B · スコア管理" width={900} height={560}><AdminB/></DCArtboard>
      </DCSection>

      <DCSection id="mobile" title="📱 モバイル版" subtitle="スマホでの主要3画面（参考）">
        <DCArtboard id="m-login" label="ログイン (mobile)" width={300} height={580}><MLogin/></DCArtboard>
        <DCArtboard id="m-score" label="スコア入力 (mobile)" width={300} height={580}><MScore/></DCArtboard>
        <DCArtboard id="m-ranking" label="ランキング (mobile)" width={300} height={580}><MRanking/></DCArtboard>
      </DCSection>

      <DCPostIt x={40} y={40}>
        全ての画面はあくまで「叩き台」のラフです。<br/>
        気に入ったA/Bや要素を教えてください — 次は中解像度に詰めていきます。
      </DCPostIt>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
