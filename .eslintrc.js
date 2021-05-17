module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/typedef': [
      'off',
      {
        // type definition 적용
        arrowParameter: true,
        memberVariableDeclaration: true,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
      },
    ],
    '@typescript-eslint/member-ordering': 'error', // 클래스 내부 멤버의 배치순서
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 리턴타입 명시 (아래의 overrides 항목 참고)
    '@typescript-eslint/no-explicit-any': 'off', // any 쓰는거 허용 (어쩔수 없을때만!!)
    '@typescript-eslint/no-inferrable-types': 'off', // 추론하기 쉬운 타입에 대한 타입명시를 하지 않도록 하는 설정을 사용하지 않도록 설정
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }], // 연속된 빈줄에 대한 경고
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['warn'], // 함수 리턴타입 명시 (ts, tsx의 경우 경고)
      },
    },
  ],
};
