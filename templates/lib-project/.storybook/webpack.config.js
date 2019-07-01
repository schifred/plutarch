module.exports = ({config}) => {
  config.module.rules.shift();
  const jsloader = {
  "test": /\.(js|jsx|mjs)$/,
  "loader": [
    {
      "loader": "/Users/alfred/Desktop/dvp/plutarch/node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js",
      "options": {
        "babelrc": true,
        "presets": [
          [
            "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_preset-env@7.4.5@@babel/preset-env/lib/index.js",
            {
              "targets": {
                "browsers": [
                  "last 2 versions",
                  "IE >= 9",
                ],
              },
              "forceAllTransforms": true,
              "loose": true,
              "useBuiltIns": "usage",
              "corejs": "2",
              "modules": "commonjs",
            },
          ],
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_preset-react@7.0.0@@babel/preset-react/lib/index.js",
        ],
        "plugins": [
          [
            "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-transform-runtime@7.4.4@@babel/plugin-transform-runtime/lib/index.js",
            {
              "helpers": true,
              "regenerator": true,
              "corejs": "2",
            },
          ],
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_babel-plugin-add-module-exports@1.0.2@babel-plugin-add-module-exports/lib/index.js",
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-function-bind@7.2.0@@babel/plugin-proposal-function-bind/lib/index.js",
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-export-default-from@7.2.0@@babel/plugin-proposal-export-default-from/lib/index.js",
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-logical-assignment-operators@7.2.0@@babel/plugin-proposal-logical-assignment-operators/lib/index.js",
          [
            "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-pipeline-operator@7.3.2@@babel/plugin-proposal-pipeline-operator/lib/index.js",
            {
              "proposal": "minimal",
            },
          ],
          [
            "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-nullish-coalescing-operator@7.4.4@@babel/plugin-proposal-nullish-coalescing-operator/lib/index.js",
            {
              "loose": false,
            },
          ],
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-do-expressions@7.2.0@@babel/plugin-proposal-do-expressions/lib/index.js",
          [
            "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-decorators@7.4.4@@babel/plugin-proposal-decorators/lib/index.js",
            {
              "legacy": true,
            },
          ],
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-function-sent@7.2.0@@babel/plugin-proposal-function-sent/lib/index.js",
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-export-namespace-from@7.2.0@@babel/plugin-proposal-export-namespace-from/lib/index.js",
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-numeric-separator@7.2.0@@babel/plugin-proposal-numeric-separator/lib/index.js",
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-throw-expressions@7.2.0@@babel/plugin-proposal-throw-expressions/lib/index.js",
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-syntax-dynamic-import@7.2.0@@babel/plugin-syntax-dynamic-import/lib/index.js",
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-syntax-import-meta@7.2.0@@babel/plugin-syntax-import-meta/lib/index.js",
          [
            "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-class-properties@7.4.4@@babel/plugin-proposal-class-properties/lib/index.js",
            {
              "loose": true,
            },
          ],
          "/Users/alfred/Desktop/dvp/plutarch/node_modules/_@babel_plugin-proposal-json-strings@7.2.0@@babel/plugin-proposal-json-strings/lib/index.js",
        ],
        "cacheDirectory": true,
      },
    },
  ],
  "exclude": [
    /node_modules/,
  ],
};
  config.module.rules.unshift(jsloader);
  config.module.rules.push({
    test: /.tsx?$/,
    use: [
      ...jsloader.loader,
      {
        loader: "/Users/alfred/Desktop/dvp/plutarch/node_modules/_ts-loader@5.4.5@ts-loader/index.js",
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
      'style-loader', 
      {
  "loader": "/Users/alfred/Desktop/dvp/plutarch/node_modules/_css-loader@1.0.1@css-loader/index.js",
  "options": {
    "modules": true,
    "camelCase": true,
    "localIdentName": "[local]",
    "importLoaders": 2,
  },
},
      { loader: "/Users/alfred/Desktop/dvp/plutarch/node_modules/_postcss-loader@2.1.6@postcss-loader/lib/index.js", 
        options: {
          plugins: [require("autoprefixer")("last 100 versions")]
        },
      },
      "/Users/alfred/Desktop/dvp/plutarch/node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js"
    ],
  });
  config.resolve.alias = {
    ...config.resolve.alias, 
    ...{"@babel/runtime-corejs2":"/Users/alfred/Desktop/dvp/plutarch/node_modules/_webpackrc-cfg@1.1.19@webpackrc-cfg/node_modules/@babel/runtime-corejs2","@babel/plugin-transform-runtime":"/Users/alfred/Desktop/dvp/plutarch/node_modules/_webpackrc-cfg@1.1.19@webpackrc-cfg/node_modules/@babel/plugin-transform-runtime","lib":"/Users/alfred/Desktop/dvp/plutarch/templates/lib-project/src"}
  };
  config.resolve.extensions = [
    ...config.resolve.extensions, 
    ...[".web.js",".js",".jsx",".tsx",".json"]
  ];
  return config;
};