module.exports = {
  module: {
    // …
    rules: [
      // …
      {
        test: /\.mdx?$/,
        use: [
          // `babel-loader` is optional:
          { loader: "babel-loader", options: {} },
          {
            loader: "@mdx-js/loader",
            /** @type {import('@mdx-js/loader').Options} */
            options: {
              providerImportSource: '@mdx-js/react'
            },
          },
        ],
      },
    ],
  },
};
