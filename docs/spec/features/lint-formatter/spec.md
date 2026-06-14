# lint-formatter 仕様

## 概要

ESLint + Prettier + pre-commit フック（husky + lint-staged）を導入し、コミット時に自動でフォーマット・lint を実行する開発環境を整備する。FEスキルLv.2「フォーマッター/リンター」の試験範囲を実装で網羅することが目的。

## 学習目的・対応する試験範囲

`[[FEスキルLv2_試験範囲_フロントエンド共通]]` の「フォーマッター/リンター」より：

- 【Lv.2 共通】プロジェクトにフォーマッター/リンターを導入し、設定ファイルを作成できる
- 【Lv.2 共通】pre-commit フックを設定し、コミット時に自動でフォーマット/lint 実行できる
- 【Lv.2 共通】既存のルールセットに加え、プロジェクト要件に応じてルールをカスタマイズできる
- 【Lv.2 FE固有】ESLint/Prettier の設定ファイル（`.eslintrc.js`、`.prettierrc.json` 等）を作成できる
- 【Lv.2 FE固有】FE向けプラグイン（`eslint-plugin-react-hooks` 等）を導入できる

加えて Lv.1 範囲（フォーマッター/リンターの役割の違い、コード統一のメリット）も解説に含める。

## 要件

### 機能要件

- **Prettier 導入**
  - `prettier` を devDependencies に追加
  - `.prettierrc.json` で整形ルールを定義
  - `.prettierignore` で対象外を指定（`.next/`、`node_modules/`、`prisma/migrations/` 等）
  - `npm run format` / `npm run format:check` を提供

- **ESLint 拡張**
  - 既存の `eslint-config-next`（`core-web-vitals` + `typescript` + `react-hooks` 内包）を維持
  - Prettier との競合回避: `eslint-config-prettier` を末尾に追加
  - カスタムルールを最低3つ追加し、それぞれ「なぜこのプロジェクトでこのルールにしたか」を README に記述
    - 例: `@typescript-eslint/consistent-type-definitions: ["error", "type"]`（CLAUDE.md の `type` 統一規約を強制）
    - 例: `no-console: ["warn", { allow: ["warn", "error"] }]`（本番に `console.log` を残さない）
    - 例: `import/order`（インポート順統一、`eslint-plugin-import` 導入）
  - `npm run lint` / `npm run lint:fix` を提供

- **pre-commit フック**
  - `husky` を導入し `.husky/pre-commit` を作成
  - `lint-staged` でステージ済みファイルだけに format + lint を実行
  - `*.{ts,tsx,js,jsx}` → `eslint --fix` + `prettier --write`
  - `*.{json,css,md}` → `prettier --write`

- **解説ドキュメント**
  - `docs/spec/features/lint-formatter/notes.md` に試験項目との対応・各ツールの役割・カスタムルールの理由を整理
  - SPEC.md マージ時にここから抜粋

### 非機能要件

- 既存コードを壊さないこと（既存ファイルの fix は別コミットで実施し差分を可視化）
- pre-commit フックは1秒〜数秒程度で完了すること（lint-staged により対象を限定）
- CI 未導入のため、ローカル実行で品質担保する

## 画面・UI

該当なし（開発環境整備のため画面変更なし）。

## API・データ

該当なし。

## 考慮事項

- **husky v9** のセットアップ方式（`husky install` ではなく `husky` コマンド一発、`prepare` スクリプトで自動初期化）
- **ESLint v9 flat config** との互換性: 各 plugin/config が flat config に対応しているか確認
  - `eslint-config-prettier` v9+ は flat config 対応
  - `eslint-plugin-import` は flat config 用の export を使う
- **Prettier と Tailwind** の衝突回避: `prettier-plugin-tailwindcss` 導入を検討（クラス順を自動ソート、Lv.2 試験範囲の「プロジェクト要件に応じたカスタマイズ」にも該当）
- **既存ファイルの整形差分**: 初回フォーマットでまとめて差分が出るので、設定追加コミットとフォーマット適用コミットを分ける
- **エディタ統合**: VS Code 用 `.vscode/settings.json` 案を notes.md に記載（必須ではない）
