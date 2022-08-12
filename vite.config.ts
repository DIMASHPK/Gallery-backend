import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import * as path from 'path';

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/index.ts',
    }),
  ],
});
