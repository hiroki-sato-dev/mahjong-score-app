// Compose all hi-fi screens inside the design canvas.

const { useState } = React;

const ART_W = 1280;
const ART_H = 800;

function App(){
  return (
    <DesignCanvas>
      <DCSection id="intro" title="麻雀部スコア管理アプリ" subtitle="高解像度デザイン / 実装ファースト (Next.js + Tailwind)">
        <DCArtboard id="tokens" label="デザイントークン" width={860} height={760}>
          <DesignTokens/>
        </DCArtboard>
      </DCSection>

      <DCSection id="auth" title="認証">
        <DCArtboard id="login" label="1. ログイン" width={ART_W} height={ART_H}>
          <LoginScreen/>
        </DCArtboard>
      </DCSection>

      <DCSection id="members" title="部員一覧" subtitle="B案：カードグリッド + ミニスパークライン">
        <DCArtboard id="members" label="2. 部員一覧" width={ART_W} height={ART_H}>
          <MembersScreen/>
        </DCArtboard>
      </DCSection>

      <DCSection id="score" title="半荘スコア入力" subtitle="A案：卓を上から見たレイアウト・4人入力で自動計算">
        <DCArtboard id="score-input" label="3. スコア入力" width={ART_W} height={ART_H}>
          <ScoreInputScreen/>
        </DCArtboard>
      </DCSection>

      <DCSection id="results" title="成績確認" subtitle="日別タブ＝A案 / 累計タブ＝B案 (グラフ重視)">
        <DCArtboard id="results-daily" label="4-A. 成績確認 / 日別" width={ART_W} height={ART_H}>
          <ResultsDailyScreen/>
        </DCArtboard>
        <DCArtboard id="results-total" label="4-B. 成績確認 / 累計" width={ART_W} height={ART_H}>
          <ResultsTotalScreen/>
        </DCArtboard>
      </DCSection>

      <DCSection id="ranking" title="ランキング" subtitle="B案：表彰台 + 横棒グラフ (Recharts想定)">
        <DCArtboard id="ranking" label="5. ランキング" width={ART_W} height={ART_H}>
          <RankingScreen/>
        </DCArtboard>
      </DCSection>

      <DCSection id="admin" title="幹部用管理画面" subtitle="左サイドバーで「部員管理」「スコア管理」を切替">
        <DCArtboard id="admin-members" label="6-A. 部員管理" width={ART_W} height={ART_H}>
          <AdminMembersScreen/>
        </DCArtboard>
        <DCArtboard id="admin-scores" label="6-B. スコア管理" width={ART_W} height={ART_H}>
          <AdminScoresScreen/>
        </DCArtboard>
      </DCSection>

      <DCSection id="errors" title="エラーページ">
        <DCArtboard id="err-404" label="404 Not Found" width={ART_W} height={ART_H}>
          <NotFoundScreen/>
        </DCArtboard>
        <DCArtboard id="err-500" label="500 Server Error" width={ART_W} height={ART_H}>
          <ServerErrorScreen/>
        </DCArtboard>
      </DCSection>

      <DCSection id="mobile" title="📱 スマホ版" subtitle="iPhone 14 サイズ (390×844) ・ Tailwind の sm: 未満で適用">
        <DCArtboard id="m-login" label="M-1. ログイン" width={420} height={874}>
          <div className="w-full h-full flex items-center justify-center bg-paper" style={{padding:9}}>
            <IOSDevice><MLoginScreen/></IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="m-members" label="M-2. 部員一覧" width={420} height={874}>
          <div className="w-full h-full flex items-center justify-center bg-paper" style={{padding:9}}>
            <IOSDevice><MMembersScreen/></IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="m-score" label="M-3. スコア入力 (卓レイアウト)" width={420} height={874}>
          <div className="w-full h-full flex items-center justify-center bg-paper" style={{padding:9}}>
            <IOSDevice><MScoreInputScreen/></IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="m-results-d" label="M-4-A. 成績 / 日別" width={420} height={874}>
          <div className="w-full h-full flex items-center justify-center bg-paper" style={{padding:9}}>
            <IOSDevice><MResultsDailyScreen/></IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="m-results-t" label="M-4-B. 成績 / 累計" width={420} height={874}>
          <div className="w-full h-full flex items-center justify-center bg-paper" style={{padding:9}}>
            <IOSDevice><MResultsTotalScreen/></IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="m-ranking" label="M-5. ランキング" width={420} height={874}>
          <div className="w-full h-full flex items-center justify-center bg-paper" style={{padding:9}}>
            <IOSDevice><MRankingScreen/></IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="m-admin" label="M-6. 幹部メニュー" width={420} height={874}>
          <div className="w-full h-full flex items-center justify-center bg-paper" style={{padding:9}}>
            <IOSDevice><MAdminMenuScreen/></IOSDevice>
          </div>
        </DCArtboard>
        <DCArtboard id="m-404" label="M-7. 404" width={420} height={874}>
          <div className="w-full h-full flex items-center justify-center bg-paper" style={{padding:9}}>
            <IOSDevice><MNotFoundScreen/></IOSDevice>
          </div>
        </DCArtboard>
      </DCSection>

      <DCPostIt x={40} y={40}>
        Tailwind CDN で描画中。<br/>
        Next.js 移植時はトークンを<br/>
        <span className="num">tailwind.config.ts</span> に転記してください。
      </DCPostIt>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
