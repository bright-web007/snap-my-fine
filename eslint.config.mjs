import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // Allow usage of 'any'
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow empty interfaces (or relax)
      '@typescript-eslint/no-empty-object-type': 'off',
      // Disable unescaped entities rule to avoid forcing HTML entity replacements in simple text
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default eslintConfig;
