import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://backend:4000',
  documents: ['src/**/*.{ts,tsx}', 'src/pages/**/*.{ts,tsx}'],
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
