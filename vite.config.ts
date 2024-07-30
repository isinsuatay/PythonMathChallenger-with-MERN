import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global polyfills
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin()
      ],
    },
  },
  resolve: {
    alias: {
      // These aliasing will make sure `util` and other node modules will be polyfilled correctly.
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
    },
  },
}); 