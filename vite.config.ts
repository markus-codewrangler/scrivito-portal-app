import dns from 'dns'
import fs from 'fs/promises'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { productionHeaders, developmentHeaders } from './headers.config'

// Ensure, that vite prints "localhost" instead of 127.0.0.1
// See https://vitejs.dev/config/server-options.html#server-host
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const outDir = 'dist'

  return {
    build: {
      outDir,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          _scrivito_extensions: resolve(__dirname, '_scrivito_extensions.html'),
        },
      },
    },
    define: {
      'import.meta.env.SCRIVITO_TENANT': JSON.stringify(env.SCRIVITO_TENANT),
      'import.meta.env.ENABLE_NEOLETTER_FORM_BUILDER_SUBSCRIPTION_FEATURE':
        JSON.stringify(env.ENABLE_NEOLETTER_FORM_BUILDER_SUBSCRIPTION_FEATURE),
    },
    // https://github.com/vitejs/vite/discussions/3448
    esbuild: {
      loader: 'tsx',
      include: /src\/.*\.[jt]sx?$/,
      exclude: [],
    },
    optimizeDeps: {
      include: ['scrivito'],
      force: true,
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
    plugins: [react(), writeProductionHeaders(outDir)],
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
      headers: developmentHeaders(),
      proxy: {
        '/jr-api': {
          target: 'https://api.justrelate.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/jr-api/, ''),
          headers: { 'X-JR-API-Location': 'http://localhost:8080/jr-api' },
        },

        /**
         * Example Proxy
         *
         * This is the configuration for localhost/127.0.0.1.
         * For Cloudflare Pages see `/functions/example-proxy/[[catchall]].ts`.
         * Please also adjust `const RELOAD_SUBPATHS` in `NotFoundErrorPage.tsx`.
         *
         * Example usage: `Scrivito.unstable_JrRestApi.fetch('../example-proxy/some.json')`
         */
        '/example-proxy': {
          target: 'https://myservice.example.com/api',
          rewrite: (path) => {
            // TODO: 🛑🚧🛑 Remove the following Error, once target and
            // the `/example-proxy` prefix are adjusted to your needs.
            throw new Error(
              'Incomplete example-proxy configuration! See `vite.config.ts` for details.',
            )

            return path.replace(/^\/example-proxy/, '')
          },

          changeOrigin: true,
        },
      },
    },
  }
})

function writeProductionHeaders(outDir: string) {
  return {
    name: 'write-production-headers',
    apply: 'build' as const,
    async writeBundle() {
      await fs.writeFile(
        resolve(__dirname, outDir, '_headers'),
        productionHeaders(),
      )
    },
  }
}
