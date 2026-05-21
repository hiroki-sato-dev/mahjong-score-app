docs/design/REFERENCE.md を現在の実装状態に合わせて更新してください。

## 手順

1. `docs/design/REFERENCE.md` を読む
2. 以下を確認して差分があれば更新する：
   - `components/ui/` 配下のコンポーネントのProps定義
   - `components/layout/` 配下のProps定義
   - `components/mahjong/` 配下のProps定義
   - `types/index.ts` の型定義
   - `lib/points.ts` の計算ロジック
   - `app/` 配下のルーティング構成
   - `app/globals.css` のデザイントークン
3. 更新した箇所をユーザーに報告する

## 注意

- デザイントークン（カラー・フォント）は原則変更しない
- 実際のコードと乖離した記述は削除または修正する
- 新しく追加されたコンポーネントがあれば追記する
