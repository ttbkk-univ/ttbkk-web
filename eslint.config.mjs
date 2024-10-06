import stylisticTs from "@stylistic/eslint-plugin-ts";
import stylisticJsx from "@stylistic/eslint-plugin-jsx";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
  ),
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      "@stylistic/ts": stylisticTs,
      "@stylistic/jsx": stylisticJsx,
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      "eol-last": "error",
      "brace-style": ["error", "1tbs"],

      "@stylistic/jsx/jsx-tag-spacing": [
        "error",
        {
          beforeSelfClosing: "always",
        },
      ],

      "no-unused-vars": "off",
      "react/prop-types": "off",
    },

    ignores: ["node_modules/*", "dist/*", "build/*"],
  },
];
