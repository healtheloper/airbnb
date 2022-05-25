module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react/require-default-props': 'off',
    // 화살표 함수의 파라미터가 하나일때 괄호 생략
    'arrow-parens': ['warn', 'as-needed'],
    // 사용하지 않는 변수가 있을때 빌드에러가 나던 규칙 해제
    'no-unused-vars': 'warn',
    // export const 문을 쓸때 에러를 내는 규칙 해제
    'import/prefer-default-export': 'off',
    // hooks의 의존성배열이 충분하지 않을때 강제로 의존성을 추가하는 규칙을 완화
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': ['warn', { extensions: ['ts', 'tsx'] }],
    // React v17 부터는 React 를 import 하지 않아도 되어 off
    'react/react-in-jsx-scope': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'index'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
