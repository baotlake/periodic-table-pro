const { resolve } = require('path')

const config = {
  projectName: 'periodic-table-pro',
  date: '2021-11-7',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html', resolve('./plugin/weapp/wxmlInject.ts')],
  presets: [],
  defineConstants: {},

  copy: {
    patterns: [
      {
        from: 'src/public',
        to: 'dist/',
      },
    ],
    options: {},
  },
  framework: 'react',
  compiler: 'webpack5',
  mini: {
    output: {
      path: resolve(__dirname, '../dist/'),
    },
    experimental: {
      compileMode: true,
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1000, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    // webpackChain(chain, webpack) {
    //   chain.merge({
    //     experiments: {
    //       backCompat: true,
    //     },
    //     module: {
    //       rules: [
    //         {
    //           test: /\.(png|jpe?g|gif)$/i,
    //           use: [
    //             {
    //               loader: 'file-loader',
    //               options: {
    //                 name: '[name]-[hash].[ext]',
    //               },
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   })
    // },
    // prerender: {
    //   include: [
    //     'pages/index/index',
    //     'pages/detail/index',
    //   ],
    //   exclude: []
    // },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    router: { mode: 'browser' },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
