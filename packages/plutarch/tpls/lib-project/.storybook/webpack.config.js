module.exports = ({config}) => {
  config.module.rules.shift();
  const jsloader = {
  "test": /\.(js|jsx|mjs)$/,
  "loader": [
    {
      "loader": "/Users/alfred/Desktop/dvp/plutarch/packages/webpackrc-cfg/node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js",
      "options": {
        "babelrc": false,
        "presets": [
          [
            "/Users/alfred/Desktop/dvp/plutarch/packages/babel-preset-plu/lib/index.js",
            {
              "isBrowser": true,
              "isTS": true,
              "transformRuntime": true
            }
          ]
        ],
        "cacheDirectory": true,
        "plugins": [
        ]
      }
    }
  ],
  "exclude": [
    /node_modules/
  ]
};
  config.module.rules.unshift(jsloader);
  config.module.rules.push({
    test: /.tsx?$/,
    use: [
      ...jsloader.loader,
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
        },
      },
      require.resolve('react-docgen-typescript-loader'),
    ],
  });
  config.module.rules.push({
    test: /.less$/,
    use: [
      require.resolve('style-loader'), 
      {
  "loader": "/Users/alfred/Desktop/dvp/plutarch/packages/webpackrc-cfg/node_modules/_css-loader@1.0.1@css-loader/index.js",
  "options": {
    "modules": true,
    "camelCase": true,
    "localIdentName": "[local]",
    "importLoaders": 2
  }
},
      { loader: require.resolve('postcss-loader'), 
        options: {
          plugins: [require("autoprefixer")("last 100 versions")]
        },
      },
      require.resolve('less-loader')
    ],
  });
  config.resolve.alias = {
    ...config.resolve.alias, 
    ...{"lib":"/Users/alfred/Desktop/dvp/plutarch/packages/plutarch/tpls/lib-project/src"}
  };
  config.resolve.extensions = [
    ...config.resolve.extensions, 
    ...[".web.js",".js",".jsx",".ts",".tsx",".json"]
  ];
  return config;
};