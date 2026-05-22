# CLAUDE.md

## プロジェクト概要

麻雀部スコア管理アプリ。
フロントエンドLv.2試験対策として、試験範囲を網羅することを目的とした学習用プロジェクト。

## 技術スタック

- Next.js (App Router)
- TypeScript
- Tailwind CSS + SCSS
- Zustand
- Vitest + React Testing Library
- PostgreSQL + Prisma

## ディレクトリ構成

- app/ : ページ・APIルート
- components/ : 共通コンポーネント
- docs/ : 設計書・デザインファイル

## ドキュメント構成

| ファイル | 内容 |
|---|---|
| `docs/spec/SPEC.md` | マスター仕様書（要件・画面定義・計算ルール） |
| `docs/design/REFERENCE.md` | デザイントークン・コンポーネントProps・型定義・ロジック |
| `docs/design/hi-fi/` | デザイン原本（ブラウザで視覚確認できるHTMLプロトタイプ） |
| `DEVELOPMENT.md` | 開発フロー・カスタムコマンドの説明 |

## コーディング規約

### TypeScript

- 型定義は `interface` ではなく `type` を使う
- HTML要素を拡張する場合はインターセクション型を使う: `type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { ... }`

## 開発スタイル

**スペック駆動開発**を採用。詳細は `DEVELOPMENT.md` を参照。

- 機能着手前に `docs/spec/features/<機能名>/` に仕様を書く
- 実装完了後に `docs/spec/SPEC.md` にマージする

## Git ワークフロー

- ベースブランチは `develop`（`main` は現在使用しない）
- `feature/<機能名>` で実装 → `/pr` で実装PR → レビュー・マージ → `/spec-done` でドキュメントPR
- 詳細は `.claude/skills/git-workflow.md` を参照

## カスタムコマンド

| コマンド | 説明 |
|---|---|
| `/spec-new <機能名>` | 機能仕様ディレクトリをテンプレート付きで作成 |
| `/pr <機能名>` | 実装PRを作成（feature/<機能名> → develop） |
| `/spec-done <機能名>` | 仕様を SPEC.md にマージしてドキュメントPRを作成 |
| `/doc-sync` | REFERENCE.md を最新の実装に合わせて更新 |

## セッション開始時

新しいセッションでは作業前に以下を読み込むこと：
1. `docs/spec/SPEC.md` — 現在の仕様・実装状況
2. `docs/design/REFERENCE.md` — デザイン・型・ロジックの定義
3. `docs/spec/features/` — 作業中の機能があれば該当ディレクトリ

## 学習目的・試験範囲

このプロジェクトは以下のFEスキルLv.2試験項目を実践的に学ぶために作成しています。

### フロントエンド共通

- [ ] AIリテラシー
- [ ] システム要件定義/基本設計
- [ ] 環境構築/Docker
- [ ] アーキテクチャ（CSR/SSR/SSG・コンポーネント設計）
- [ ] 凝集と結合
- [ ] セキュリティ（認証・認可・OWASP）
- [ ] 通信規格（REST/GraphQL/WebSocket）
- [ ] フォーマッター/リンター
- [ ] ビルドツール
- [ ] パッケージマネージャー
- [ ] Git応用
- [ ] テスト
- [ ] ブラウザ/HTML
- [ ] CSS/SCSS
- [ ] JavaScript応用
- [ ] TypeScript応用

### React / Next.js

- [ ] コンポーネント設計
- [ ] ライフサイクル/メモ化
- [ ] レンダリング（CSR/SSR/SG/ISR）
- [ ] 状態管理
- [ ] React Router / Next.js ルーティング
- [ ] テスト（RTL）
- [ ] Next.js Middleware・next/dynamic
