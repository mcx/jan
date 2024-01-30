/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const webpack = require('webpack')

const packageJson = require('./package.json')

const nextConfig = {
  output: 'export',
  assetPrefix: '.',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    // do some stuff here
    config.optimization.minimize = false
    config.optimization.minimizer = []
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(packageJson.version),
        ANALYTICS_ID:
          JSON.stringify(process.env.ANALYTICS_ID) ?? JSON.stringify('xxx'),
        ANALYTICS_HOST:
          JSON.stringify(process.env.ANALYTICS_HOST) ?? JSON.stringify('xxx'),
        API_BASE_URL: JSON.stringify('http://localhost:1337'),
        isMac: process.platform === 'darwin',
        isWindows: process.platform === 'win32',
        isLinux: process.platform === 'linux',
      }),
    ]
    return config
  },
}

module.exports = nextConfig
