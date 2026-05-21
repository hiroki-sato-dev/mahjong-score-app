---
name: git-workflow
description: このプロジェクトのGit運用ルール。ブランチ戦略・コミット粒度・PR作成のタイミングと手順。
type: project
---

# Git ワークフロー

## ブランチ戦略

| ブランチ | 用途 |
|---|---|
| `develop` | ベースブランチ。全PRのマージ先 |
| `feature/<機能名>` | 機能実装ブランチ |
| `docs/<機能名>` | ドキュメント更新ブランチ（/spec-done で作成） |
| `fix/<内容>` | バグ修正ブランチ |

- `main` は現在使用しない
- ブランチは `develop` から切る

## コミットの粒度

`docs/spec/features/<機能名>/tasks.md` の1タスク = 1コミットを基本とする。

コミットメッセージ形式（グローバルルール準拠）：
```
feat: ○○を実装
fix: ○○のバグを修正
refactor: ○○をリファクタリング
docs: ○○のドキュメントを更新
test: ○○のテストを追加
chore: ○○の設定を変更
```

## ワークフロー全体

```
1. /spec-new <機能名>
   → docs/spec/features/<機能名>/ 作成
   → git checkout -b feature/<機能名>

2. 仕様を書く（spec.md・tasks.md）

3. tasks.md を見ながら実装・コミット
   （1タスク = 1コミットを目安に）

4. /pr <機能名>
   → feature/<機能名> → develop のPR作成

5. レビュー → develop にマージ

6. /spec-done <機能名>
   → SPEC.md に仕様をマージ
   → features/<機能名>/ 削除
   → docs/<機能名> → develop のドキュメントPR作成

7. ドキュメントPRをマージ
```

## PR 作成ルール

### 実装PR（/pr）
- base: `develop`
- タイトル: `feat: <機能名> の実装`
- 動作確認チェックリストを含める
- `docs/spec/features/<機能名>/spec.md` へのリンクを含める

### ドキュメントPR（/spec-done）
- base: `develop`
- タイトル: `docs: <機能名> の仕様書を SPEC.md にマージ`
- 対応する実装PRのURLを含める
- コードの変更は含めない（ドキュメントのみ）
