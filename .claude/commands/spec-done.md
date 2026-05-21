$ARGUMENTS の機能仕様を SPEC.md にマージし、ドキュメント更新PRを作成してください。

## 前提確認

実装PRが develop にマージ済みであることを確認する。
未マージの場合はユーザーに確認する。

## 手順

1. `docs/spec/features/$ARGUMENTS/spec.md` を読む
2. `docs/spec/SPEC.md` を読む
3. spec.md の内容を SPEC.md の適切なセクションにマージする
   - 新しい画面・機能であれば該当セクションに追記
   - 既存仕様の更新であれば該当箇所を上書き
   - マージ後に全体として一貫して読めるか確認する
4. `docs/spec/features/$ARGUMENTS/` ディレクトリを削除する
5. ドキュメント更新用ブランチを作成・プッシュしてPRを出す：
   - ブランチ名: `docs/$ARGUMENTS`
   - base: `develop`
   - タイトル: `docs: $ARGUMENTS の仕様書を SPEC.md にマージ`
   - body: マージした内容のサマリー

## PR body のフォーマット

```
## 概要
$ARGUMENTS の実装完了に伴い、機能仕様を SPEC.md にマージします。

## 変更内容
- docs/spec/SPEC.md に $ARGUMENTS の仕様を追記
- docs/spec/features/$ARGUMENTS/ を削除

## 関連PR
（実装PRのURL）
```

PR作成後、URLをユーザーに共有する。
