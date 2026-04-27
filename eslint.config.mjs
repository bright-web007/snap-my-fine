import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow usage of 'any'
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow empty interfaces (or relax)
      '@typescript-eslint/no-empty-object-type': 'off',
      // Disable unescaped entities rule to avoid forcing HTML entity replacements in simple text
      'react/no-unescaped-entities': 'off',
      // Allow require() imports
      '@typescript-eslint/no-require-imports': 'off',
      // Allow @ts-ignore comments
      '@typescript-eslint/ban-ts-comment': 'off',
      // Allow unused variables (warnings only)
      '@typescript-eslint/no-unused-vars': 'warn',
      // Allow missing dependencies in useEffect
      'react-hooks/exhaustive-deps': 'warn',
      // Allow img elements
      '@next/next/no-img-element': 'warn',
      // Allow anonymous default exports
      'import/no-anonymous-default-export': 'warn',
    },
  },
];

export default eslintConfig;
