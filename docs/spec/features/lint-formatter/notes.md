# lint-formatter 解説ノート

> FEスキルLv.2「フォーマッター/リンター」を口頭で説明できるようにするための整理。

## 1. フォーマッターとリンターの役割の違い

| 観点       | フォーマッター（Prettier）               | リンター（ESLint）                        |
| ---------- | ---------------------------------------- | ----------------------------------------- |
| 目的       | コードスタイルの自動統一                 | 静的解析でバグや非推奨パターンを検出      |
| 対象       | 見た目（インデント、改行、引用符、空白） | 中身（未使用変数、Hooksルール違反、型）   |
| 出力       | 整形後のコード                           | 警告/エラー（修正提案、一部は自動修正可） |
| 設定の主眼 | スタイル（semi / quote / printWidth）    | ルール（error / warn / off）              |

**棲み分け：** スタイルはPrettier、ロジック・品質はESLintに任せる。両方を混ぜると競合するため、`eslint-config-prettier` で整形系ESLintルールを無効化して衝突を防ぐ。

## 2. コードスタイル統一のメリット

- **可読性向上**: 誰が書いても同じ見た目になり、コードを読む認知コストが下がる
- **レビュー効率化**: スタイル指摘がゼロになり、本質的な議論に集中できる
- **属人性排除**: 「この人のコードはこういう書き方」という個人色を消し、誰でも保守できる
- **コンフリクト減**: 改行・引用符の好みでdiffが膨らむのを防ぐ

## 3. このプロジェクトの構成

```
.prettierrc.json         # Prettier 設定
.prettierignore          # Prettier 対象外
eslint.config.mjs        # ESLint flat config
.husky/pre-commit        # コミット時に npx lint-staged を実行
package.json
  ├── scripts            # lint / lint:fix / format / format:check / prepare
  └── lint-staged        # ステージ済みファイルだけに format+lint を適用
```

### 3.1 Prettier 設定の意図

```json
{
  "semi": false, // セミコロン不要（JavaScriptのASIに任せる）
  "singleQuote": true, // 文字列はシングルクォート
  "trailingComma": "all", // 末尾カンマ常時（diff最小化）
  "printWidth": 100, // 1行100文字（モニター幅とのバランス）
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf", // CRLF混在を防ぐ
  "plugins": ["prettier-plugin-tailwindcss"] // Tailwindクラス順を自動ソート
}
```

### 3.2 ESLint 構成

`eslint.config.mjs`（ESLint v9 flat config）の積み上げ順：

1. `eslint-config-next/core-web-vitals` — Next.js推奨ルール + Core Web Vitals
2. `eslint-config-next/typescript` — TypeScript対応ルール
3. プロジェクト独自のカスタムルール（次節）
4. `eslint-config-prettier` — Prettierと競合する整形系ルールを無効化（**必ず末尾**）
5. `globalIgnores` — `.next/`、`docs/design/hi-fi/` 等を除外

`eslint-config-next` は内部で `eslint-plugin-react-hooks`、`eslint-plugin-jsx-a11y` 等のFE向けプラグインを含んでいる。

## 4. カスタムルール3件の「なぜ」

### 4.1 `@typescript-eslint/consistent-type-definitions: ["error", "type"]`

**何をする：** `interface X {}` を書いたらエラーにし、`type X = {}` 形式に統一する。

**なぜこのプロジェクトでこのルール：**

- CLAUDE.md のコーディング規約で「型定義は `interface` ではなく `type` を使う」と明文化しているため、機械的に強制する
- 麻雀アプリは Props 定義で HTML要素を拡張するインターセクション型（`React.ButtonHTMLAttributes<HTMLButtonElement> & { ... }`）を多用する。`interface` だと拡張記述が二段階になり読みづらい
- レビューで毎回指摘するのは無駄なので lint で防ぐ

### 4.2 `no-console: ["warn", { allow: ["warn", "error"] }]`

**何をする：** `console.log` を警告（`console.warn` `console.error` は許容）。

**なぜこのプロジェクトでこのルール：**

- 本番コードに `console.log` を残すと情報漏洩・パフォーマンス劣化の原因になる
- 一方、開発中のデバッグ用に完全禁止（error）にすると不便。`warn` に留めて気づける状態にする
- `console.warn` / `console.error` は意図的なログとして残るケースがあるため allow

### 4.3 `import/order`

**何をする：** import 文を builtin → external → internal → parent → sibling → index の順に並べ、グループ間に空行を入れ、グループ内はアルファベット順にする。

**なぜこのプロジェクトでこのルール：**

- 麻雀アプリは Next.js / React / Tailwind / Prisma / 自作モジュール など import が増える
- 順序が揃っていると「何に依存しているか」が一目で分かりレビューが速い
- 自動修正できるので開発者の負担はゼロ

## 5. pre-commit フック（husky + lint-staged）の仕組み

### 5.1 全体の流れ

```
git commit
  ↓
.git/hooks/pre-commit が起動（husky が .husky/pre-commit を呼ぶように仕込んでいる）
  ↓
.husky/pre-commit が `npx lint-staged` を実行
  ↓
lint-staged が package.json の "lint-staged" 設定を読む
  ↓
ステージ済みファイル（git add 済み）の中から、glob にマッチするものだけに対し
  - *.{ts,tsx,js,jsx,mjs,cjs} → eslint --fix → prettier --write
  - *.{json,css,md}           → prettier --write
  ↓
変更されたファイルを git add で再ステージ
  ↓
- エラーがなければコミット成立
- エラー（exit code 非ゼロ）が出れば pre-commit が失敗、コミットは中止される
```

### 5.2 なぜ lint-staged を挟むのか

- **対象を最小化** ステージされたファイルだけ実行するので、リポジトリ全体に毎回かけるより圧倒的に速い
- **整形結果の再ステージ** Prettier/ESLint --fix で変更された内容を自動で git add し直すので、整形後のコードがそのままコミットされる
- **glob で出し分け** 拡張子ごとに違うコマンドを当てられる（コードはeslint＋prettier、JSON/MDはprettierだけ）

### 5.3 husky v9 のセットアップ

旧来の `husky install` 形式ではなく、v9 では：

1. `npm install --save-dev husky` で依存追加
2. `npm pkg set scripts.prepare="husky"` で `prepare` スクリプト登録（`npm install` 後に自動実行される）
3. `npx husky init` で `.husky/pre-commit` の雛形と `.git/hooks` への参照を作成
4. `.husky/pre-commit` の中身を `npx lint-staged` に書き換え

`prepare` スクリプトのおかげで、他の開発者が `git clone` → `npm install` した時点で husky が自動セットアップされる。

## 6. flat config と legacy config の違い

| 観点           | legacy config (`.eslintrc.*`)                    | flat config (`eslint.config.mjs`)                      |
| -------------- | ------------------------------------------------ | ------------------------------------------------------ |
| ファイル名     | `.eslintrc.json` / `.eslintrc.js` 等             | `eslint.config.{js,mjs,cjs,ts}`                        |
| 設定の合成     | `extends` で文字列指定                           | `import` で実体を取り込み配列で並べる                  |
| プラグイン指定 | 文字列キー（`"plugin:react-hooks/recommended"`） | オブジェクトとして `plugins: { import: importPlugin }` |
| 設定の優先順位 | 暗黙のマージルール                               | 配列の後に書いたものが上書き（明示的）                 |
| 適用範囲       | `overrides` で files 指定                        | 各設定オブジェクトに `files` プロパティ                |
| 対応バージョン | ESLint v8 以前のデフォルト                       | ESLint v9 のデフォルト                                 |

このプロジェクトは ESLint v9 を使うので flat config 一択。`eslint-config-next` も `core-web-vitals` / `typescript` の各エントリポイントが flat config 対応済みのものを公開している。

## 7. 試験範囲との対応マッピング

| 試験項目（Lv.2）                                                             | 本実装での該当箇所                                                                                |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| フォーマッター/リンターを導入し、設定ファイルを作成できる                    | `.prettierrc.json`、`eslint.config.mjs`                                                           |
| pre-commit フックを設定し、コミット時に自動でフォーマット/lint 実行できる    | `.husky/pre-commit` + `lint-staged` 設定                                                          |
| 既存のルールセットに加え、プロジェクト要件に応じてルールをカスタマイズできる | カスタムルール3件（4節）                                                                          |
| ESLint/Prettier の設定ファイルを作成できる                                   | `.prettierrc.json` + `eslint.config.mjs`                                                          |
| FE向けプラグインを導入できる                                                 | `eslint-config-next` に含まれる `eslint-plugin-react-hooks` 等、独自追加の `eslint-plugin-import` |

| 試験項目（Lv.1）                          | 本実装での該当箇所 |
| ----------------------------------------- | ------------------ |
| フォーマッター/リンターの役割を説明できる | 1節                |
| コードスタイル統一のメリットを説明できる  | 2節                |

## 8. 動作確認シナリオ

| シナリオ                                    | 期待動作                                                                  | 結果 |
| ------------------------------------------- | ------------------------------------------------------------------------- | ---- |
| フォーマット崩したファイルを `git commit`   | pre-commit で `prettier --write` が自動整形してコミット成立               | ✅   |
| `interface` を書いた状態でコミット          | `consistent-type-definitions` のautofixで `type` に変換されてコミット成立 | ✅   |
| `react-hooks/rules-of-hooks` 違反でコミット | pre-commit が失敗してコミットがブロックされる                             | ✅   |
| `npm run lint`                              | エラー0                                                                   | ✅   |
| `npm run format:check`                      | "All matched files use Prettier code style!"                              | ✅   |
