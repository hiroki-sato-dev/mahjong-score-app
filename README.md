# 麻雀部スコア管理アプリ

麻雀部のメンバーが半荘ごとのスコアを記録・管理し、成績やランキングを確認できるWebアプリケーション。  
フロントエンドLv.2試験対策の学習用プロジェクト。

## ドキュメント

- [要件定義・仕様書](docs/spec/SPEC.md)
- [デザインリファレンス](docs/design/REFERENCE.md)
- [開発ガイド](DEVELOPMENT.md)

## 技術スタック

| 項目 | 技術 |
|---|---|
| フレームワーク | Next.js (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS + SCSS |
| 状態管理 | Zustand |
| テスト | Vitest + React Testing Library |
| DB | PostgreSQL + Prisma |

## セットアップ

```bash
npm install
```

## 起動

```bash
# 開発サーバー
npm run dev

# Docker（DB含む）
docker compose up
```

開発サーバーは [http://localhost:3000](http://localhost:3000) で起動します。
