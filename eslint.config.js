
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import { plugins, rules } from 'eslint-config-airbnb-extended';
import prettier from 'eslint-config-prettier/flat';

const { base } = rules;

// Reglas de Airbnb sin las reglas de formato que gestiona Prettier
const airbnbBase = [
  base.bestPractices,
  base.errors,
  base.es6,
  base.imports,
  base.strict,
  base.style,
  base.variables,
].map((ruleSet) => ({
  name: ruleSet.name,
  rules: ruleSet.rules,
}));

export default defineConfig([
  // Archivos que ESLint debe ignorar
  globalIgnores([
    'dist/**',
    'node_modules/**',
    '.devcontainer/**',
    '.vscode/**',
    '.github/**',
    '*.config.js',
  ]),

  // Configuración general de JavaScript
  {
    files: ['**/*.{js,mjs}'],
    plugins: { js, ...plugins.importX.plugins },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import-x/resolver-next': [
        plugins.importX.plugins['import-x'].createNodeResolver(),
      ],
    },
  },

  ...airbnbBase,

  // Backend: Node.js y mensajes de consola permitidos
  {
    files: ['server/**/*.{js,mjs}'],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      'no-console': [
        'warn',
        { allow: ['warn', 'error', 'info', 'log', 'debug'] },
      ],
    },
  },

  // Frontend: navegador
  {
    files: ['src/**/*.{js,mjs}', 'public/**/*.{js,mjs}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },

  // Reglas generales del proyecto
  {
    rules: {
      'no-underscore-dangle': [
        'error',
        { allow: ['__filename', '__dirname'] },
      ],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'import-x/no-rename-default': 'off',
      'import-x/extensions': ['error', 'ignorePackages'],
      'import-x/no-unresolved': ['error', { ignore: ['^#'] }],
      'import-x/no-extraneous-dependencies': [
        'error',
        { devDependencies: [] },
      ],
    },
  },

  // Frontend: permite determinados mensajes de consola
  {
    files: ['src/**/*.{js,mjs}'],
    rules: {
      'no-console': [
        'warn',
        { allow: ['warn', 'error', 'info'] },
      ],
    },
  },

  // Prettier al final para evitar conflictos de formato
  prettier,
]);
