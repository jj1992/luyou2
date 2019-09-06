const webpack = require('webpack')
// vue.config.js
module.exports = {
    // 修改的配置
    devServer: {

        proxy: {
            '/api': {
                // 目标 API 地址
                // target: 'http://localhost:8010',
                //测试
                target: 'http://10.12.158.72:8002',
                // 如果要代理 websockets
                ws: true,
                // 将主机标头的原点更改为目标URL
                changeOrigin: false,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/proxy':{
                target: 'http://10.12.158.72:8002',
                pathRewrite: {
                }
            },
            '/arcgis_server':{
                target: 'http://202.96.18.90:8064',
                pathRewrite: {
                '^/arcgis_server': '/arcgis'
                }
            }
        }
 
 
    },

    configureWebpack: {
        devtool: 'source-map'
    },

    lintOnSave: undefined,

    configureWebpack: {

       plugins: [
    
          new webpack.ProvidePlugin({
    
            $:"jquery",
    
            jQuery:"jquery",
    
            "windows.jQuery":"jquery"
    
          })
    
        ]
    
    }
}