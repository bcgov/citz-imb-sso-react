import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'build',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['react', 'react-dom'],
    plugins: [
      resolve(),
      commonjs(),
      json(),
      postcss({ extensions: ['.css'] }),
      typescript({ tsconfig: './tsconfig.json', outputToFilesystem: true }),
    ],
    onwarn: (warning, warn) => {
      // Suppress false warning
      if (warning.message.includes("package.json' is not listed within the file list of project"))
        return;

      // Use default for other warnings
      warn(warning);
    },
  },
];
