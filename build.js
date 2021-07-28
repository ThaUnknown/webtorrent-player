// I can't get this to work https://github.com/remorses/esbuild-plugins/issues/8 will switch to esbuild if I find a fix
// type module in package.json
// "@esbuild-plugins/node-globals-polyfill": "^0.1.0",
// "@esbuild-plugins/node-modules-polyfill": "^0.1.1",
// "esbuild": "^0.12.16",
// "esbuild-plugin-node-polyfills": "^1.0.2",
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill'
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'
import ESBuild from 'esbuild'

ESBuild.build({
  plugins: [NodeModulesPolyfillPlugin.default(),
    NodeGlobalsPolyfillPlugin.default({
      process: true,
      buffer: true
    })],
  entryPoints: ['index.js'],
  bundle: true,
  sourcemap: true,
  format: 'esm',
  target: ['esnext'],
  platform: 'browser',
  outfile: 'out.js',
  define: {
    global: 'globalThis'
  }
}).catch(() => process.exit(1))
