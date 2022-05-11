module.exports = {
    env: {
        node_env: '"production"',
    },
    defineConstants: {
        STORAGE_HOST: '"cloud://periodictable-761124.7065-periodictable-761124-1253556794"',
        BUCKET_HOST: '"https://periodictablepro-1253556794.cos.ap-shanghai.myqcloud.com"',
        SEARCH_REWARDED_AD: '"adunit-46e75d263dbf34e4"',
    },
    mini: {},
    h5: {
        /**
         * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
         * 参考代码如下：
         * webpackChain (chain) {
         *   chain.plugin('analyzer')
         *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
         * }
         */
    },
};
