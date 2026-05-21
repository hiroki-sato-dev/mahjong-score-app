# 開発ガイド

## 開発方針

**スペック駆動開発（Spec-Driven Development）**を採用。  
実装の前に仕様を書き、実装完了後にマスター仕様書へマージする。

---

## ディレクトリ構成

```
docs/
├── design/
│   ├── hi-fi/          # デザイン原本（ブラウザで視覚確認）
│   └── REFERENCE.md    # 実装リファレンス（トークン・Props・ロジック）
└── spec/
    ├── SPEC.md          # マスター仕様書（実装済み仕様が集約）
    └── features/        # 作業中の機能仕様（実装完了でSPEC.mdにマージ）
        └── <機能名>/
            ├── spec.md
            ├── tasks.md
            └── design.md（任意）
```

---

## 機能追加のワークフロー

```
1. /spec-new <機能名>
   → docs/spec/features/<機能名>/ を作成、仕様テンプレートを生成

2. spec.md・tasks.md を書いて仕様を固める

3. tasks.md を見ながら実装（TDD推奨）

4. /spec-done <機能名>
   → SPEC.md にマージ → features/<機能名>/ を削除
```

---

## カスタムコマンド

| コマンド | 説明 |
|---|---|
| `/spec-new <機能名>` | 機能仕様ディレクトリをテンプレート付きで作成 |
| `/spec-done <機能名>` | 仕様をSPEC.mdにマージして作業ディレクトリを削除 |
| `/doc-sync` | REFERENCE.mdを最新の実装に合わせて更新 |

---

## 参考ドキュメント

- [仕様書](docs/spec/SPEC.md) — 要件・画面定義・計算ルール
- [デザインリファレンス](docs/design/REFERENCE.md) — トークン・Props・型定義
- [CLAUDE.md](CLAUDE.md) — AIとの協業ルール・学習目的の試験範囲

---

## コミットメッセージ

```
feat: 機能追加
fix: バグ修正
refactor: リファクタリング
docs: ドキュメント更新
test: テスト追加・修正
chore: 設定・環境
```
