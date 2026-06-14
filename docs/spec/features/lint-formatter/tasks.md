# lint-formatter タスクリスト

## ステータス凡例

- [ ] 未着手
- [x] 完了

## タスク

### Prettier 導入

- [ ] `prettier` `prettier-plugin-tailwindcss` を devDependencies に追加
- [ ] `.prettierrc.json` を作成（semi/quotes/printWidth/plugins 等）
- [ ] `.prettierignore` を作成
- [ ] `package.json` に `format` / `format:check` スクリプト追加

### ESLint 拡張

- [ ] `eslint-config-prettier` `eslint-plugin-import` を devDependencies に追加
- [ ] `eslint.config.mjs` に Prettier 競合回避設定を追記（末尾）
- [ ] カスタムルール3件以上を追加
  - [ ] `@typescript-eslint/consistent-type-definitions: ["error", "type"]`
  - [ ] `no-console: ["warn", { allow: ["warn", "error"] }]`
  - [ ] `import/order`（グループ順・改行ルール）
- [ ] `package.json` に `lint:fix` スクリプト追加

### pre-commit フック

- [ ] `husky` `lint-staged` を devDependencies に追加
- [ ] `npm pkg set scripts.prepare="husky"` で `prepare` スクリプト追加
- [ ] `.husky/pre-commit` を作成し `npx lint-staged` を実行
- [ ] `package.json` に `lint-staged` 設定を追記

### 既存コードへの適用

- [ ] `npm run format` で全ファイルを整形（別コミット）
- [ ] `npm run lint:fix` で自動修正可能な lint 警告を解消（別コミット）
- [ ] 残った警告/エラーを手動修正

### 動作確認

- [ ] わざとフォーマット崩しした状態でコミット → pre-commit が修正することを確認
- [ ] わざと lint エラーになるコード（未使用変数等）を入れてコミットがブロックされることを確認
- [ ] `npm run lint` が clean に通る
- [ ] `npm run format:check` が clean に通る

### 解説ドキュメント

- [ ] `docs/spec/features/lint-formatter/notes.md` を作成
  - [ ] フォーマッター vs リンター の役割の違い
  - [ ] コードスタイル統一のメリット
  - [ ] 各カスタムルールの「なぜ」
  - [ ] husky + lint-staged の仕組み（pre-commit hook の動き）
  - [ ] flat config と legacy config の違い

## 完了条件

- [ ] 動作確認済み（pre-commit が format/lint を実行する）
- [ ] `npm run lint` `npm run format:check` がエラーなく通る
- [ ] spec.md と実装が一致している
- [ ] notes.md を読めば試験項目を口頭で説明できる状態になっている
