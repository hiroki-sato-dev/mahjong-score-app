# lint-formatter タスクリスト

## ステータス凡例

- [ ] 未着手
- [x] 完了

## タスク

### Prettier 導入

- [x] `prettier` `prettier-plugin-tailwindcss` を devDependencies に追加
- [x] `.prettierrc.json` を作成（semi/quotes/printWidth/plugins 等）
- [x] `.prettierignore` を作成
- [x] `package.json` に `format` / `format:check` スクリプト追加

### ESLint 拡張

- [x] `eslint-config-prettier` `eslint-plugin-import` を devDependencies に追加
- [x] `eslint.config.mjs` に Prettier 競合回避設定を追記（末尾）
- [x] カスタムルール3件以上を追加
  - [x] `@typescript-eslint/consistent-type-definitions: ["error", "type"]`
  - [x] `no-console: ["warn", { allow: ["warn", "error"] }]`
  - [x] `import/order`（グループ順・改行ルール）
- [x] `package.json` に `lint:fix` スクリプト追加

### pre-commit フック

- [x] `husky` `lint-staged` を devDependencies に追加
- [x] `npm pkg set scripts.prepare="husky"` で `prepare` スクリプト追加
- [x] `.husky/pre-commit` を作成し `npx lint-staged` を実行
- [x] `package.json` に `lint-staged` 設定を追記

### 既存コードへの適用

- [x] `npm run format` で全ファイルを整形（別コミット）
- [x] `npm run lint:fix` で自動修正可能な lint 警告を解消（別コミット）
- [x] 残った警告/エラーを手動修正

### 動作確認

- [x] わざとフォーマット崩しした状態でコミット → pre-commit が修正することを確認
- [x] わざと lint エラーになるコード（react-hooks 違反）を入れてコミットがブロックされることを確認
- [x] `npm run lint` が clean に通る
- [x] `npm run format:check` が clean に通る

### 解説ドキュメント

- [x] `docs/spec/features/lint-formatter/notes.md` を作成
  - [x] フォーマッター vs リンター の役割の違い
  - [x] コードスタイル統一のメリット
  - [x] 各カスタムルールの「なぜ」
  - [x] husky + lint-staged の仕組み（pre-commit hook の動き）
  - [x] flat config と legacy config の違い

## 完了条件

- [x] 動作確認済み（pre-commit が format/lint を実行する）
- [x] `npm run lint` `npm run format:check` がエラーなく通る
- [x] spec.md と実装が一致している
- [x] notes.md を読めば試験項目を口頭で説明できる状態になっている
