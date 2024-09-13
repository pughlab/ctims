// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // nx: {
  //   // Set this to true if you would like to to use SVGR
  //   // See: https://github.com/gregberge/svgr
  //   svgr: false,
  // },
  swcMinify: false,
  publicRuntimeConfig: {
    // Will be available on both server and client
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    NEXT_PUBLIC_SIGNOUT_REDIRECT_URL: process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_API_URL: process.env.NEXTAUTH_API_URL,
    NEXT_PUBLIC_TRIAL_LOCK_PING_TIME: process.env.TRIAL_LOCK_PING_INTERVAL
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // You can also set it to 'DENY' if you prefer
          },
        ],
      },
    ];
  }
};

module.exports = withNx(nextConfig);
