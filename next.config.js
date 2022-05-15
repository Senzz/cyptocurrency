/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
  // async rewrites() {
  //   return [
  //     { source: '/huobi/:path*', destination: `https://www.huobi.com/-/x/pro/v2/beta/common/symbols` }
  //   ]
  // }
}

module.exports = nextConfig
