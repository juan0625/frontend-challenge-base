module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Solo aplica esto a archivos TS
      rules: {
        // Tus reglas de ESLint específicas para TypeScript
      },
    },
    {
      files: ['*.js'], // Configuración para archivos JS
      rules: {
        // Opcionalmente, puedes agregar reglas para archivos JS
      },
    },
  ],
};
