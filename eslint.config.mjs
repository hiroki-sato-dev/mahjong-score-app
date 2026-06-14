import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // CLAUDE.md の規約に合わせ、type alias で統一する（interface は不可）
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // 本番コードに console.log を残さない。デバッグ用の warn/error は許容
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // import 順を builtin → external → internal → 親 → 兄弟 → index の順に並べる
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // Prettier と競合する整形系ルールを無効化（最後に置く）
  prettierConfig,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // デザイン原本（ブラウザ動作確認用のプロトタイプ、ビルド対象外）
    'docs/design/hi-fi/**',
  ]),
])

export default eslintConfig
