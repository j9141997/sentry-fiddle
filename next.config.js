const { withSentryConfig } = require("@sentry/nextjs");

let isServer = false;

const moduleExports = {
  webpack: (config, options) => {
    isServer = options.isServer;

    return config;
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
  // ref: https://github.com/getsentry/sentry-javascript/pull/4047
  include: isServer
    ? [
        { paths: [".next/server/pages/"], urlPrefix: "~/_next/server/pages" },
        { paths: [".next/server/chunks"], urlPrefix: "~/_next/server/chunks" },
      ]
    : [{ paths: [".next/static/chunks"], urlPrefix: "~/_next/static/chunks" }],
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
