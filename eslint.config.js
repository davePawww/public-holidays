import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      {
        ...reactPlugin.configs.flat.recommended,
        settings: {
          react: {
            version: "detect",
          },
        },
      },
      reactPlugin.configs.flat["jsx-runtime"],
      ...pluginQuery.configs["flat/recommended"],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
    },
  },
  prettier,
]);
