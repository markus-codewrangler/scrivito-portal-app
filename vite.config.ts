import fs from 'fs/promises'

import dns from 'dns'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// Ensure, that vite prints "localhost" instead of 127.0.0.1
// See https://vitejs.dev/config/server-options.html#server-host
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          _scrivito_extensions: resolve(__dirname, '_scrivito_extensions.html'),
        },
      },
    },
    define: {
      'import.meta.env.SCRIVITO_TENANT': JSON.stringify(
        env.SCRIVITO_TENANT_DEMO1
      ),
    },

    // https://github.com/vitejs/vite/discussions/3448
    esbuild: {
      loader: 'tsx',
      include: /src\/.*\.[jt]sx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: 'load-js-files-as-jsx',
            setup(build) {
              build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                loader: 'jsx',
                contents: await fs.readFile(args.path, 'utf8'),
              }))
            },
          },
        ],
      },
    },

    plugins: [react()],
    preview: {
      port: 8080,
      strictPort: true,
    },
    resolve: {
      alias: {
        // ensure that a shared React instance is used
        // this is necessary, if package.json references scrivito via "file:"
        // compare:
        // https://medium.com/@penx/managing-dependencies-in-a-node-package-so-that-they-are-compatible-with-npm-link-61befa5aaca7
        react: resolve(__dirname, './node_modules/react'),
        'react-dom': resolve(__dirname, './node_modules/react-dom'),
      },
    },
    server: {
      port: 8080,
      strictPort: true,
    },
  }
})
