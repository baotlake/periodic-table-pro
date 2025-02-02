import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack'
import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import devConfig from './dev'
import prodConfig from './prod'
import { resolve } from 'path'

export default defineConfig(async (merge, { command, mode }) => {
  console.log(command, mode)
  const config: UserConfigExport = {
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
    compiler: {
      type: 'webpack5',
      // 仅 webpack5 支持依赖预编译配置
      prebundle: {
        enable: true,
      },
    },
    mini: {
      output: {
        path: resolve(__dirname, '../dist/'),
        assetModuleFilename: './dist/assets/[hash][ext][query]',
      },
      experimental: {
        // compileMode: true,
      },
      postcss: {
        pxtransform: {
          enable: false,
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
      webpackChain(chain, webpack) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        // 复制这块区域到你的配置代码中 region start
        chain.merge({
          plugin: {
            install: {
              plugin: UnifiedWebpackPluginV5,
              args: [
                {
                  appType: 'taro',
                },
              ],
            },
          },
        })
      },
      imageUrlLoaderOption: {
        limit: 1000,
        // exclude: [path.resolve(__dirname, '../src/images/icons')],
        name: 'assets/[name]-[hash:8][ext]',
      },
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
    // alias: {
    //   '@periodic-table-pro/components': resolve(__dirname, '../../packages/components'),
    //   '@periodic-table-pro/data': resolve(__dirname, '../../packages/data'),
    // }
  }

  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, devConfig)
  }
  return merge({}, config, prodConfig)
})
