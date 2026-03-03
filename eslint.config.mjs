import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'jsx-a11y': pluginJsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      // PropTypes are not used in this JS project
      'react/prop-types': 'off',
      // styled-jsx uses jsx and global attributes on <style> tags
      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
      // React.memo wrapping an anonymous arrow component cannot infer a display name
      'react/display-name': 'off',
    },
  },
  {
    ignores: ['.next/', 'node_modules/'],
  },
];
