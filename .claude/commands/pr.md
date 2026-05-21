$ARGUMENTS の実装PRを作成してください。

## 手順

1. 現在のブランチが `feature/$ARGUMENTS` であることを確認する
   - 違う場合はユーザーに確認する
2. `git status` で未コミットの変更がないか確認する
   - ある場合はユーザーに確認してからコミットするか聞く
3. `git diff develop...HEAD` で変更内容を確認する
4. `git push -u origin feature/$ARGUMENTS` でプッシュする
5. 以下の形式でPRを作成する：
   - タイトル: `feat: $ARGUMENTS の実装`
   - base: `develop`
   - body: 変更内容のサマリー・実装した機能・テスト内容

## PR body のフォーマット

```
## 概要
（何を実装したか）

## 変更内容
（主な変更点をリストで）

## 動作確認
- [ ] （確認項目）

## 関連
- docs/spec/features/$ARGUMENTS/spec.md
```

PR作成後、URLをユーザーに共有する。
