const path = require('path')
// TODO: Export file css ra file riêng
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {HOST,CLIENT_PORT} = require('./src/utils/contants/host_contants')
const dotenv = require('dotenv'); 
const VENDOR_LIBS = [
    "jquery",
    "react",
    "react-dom",
];
const devServer = {
    port: 8086,
    disableHostCheck: true,
    historyApiFallback: true,
    overlay: true,
    stats: 'minimal',
    inline: true,
    compress: true,
    contentBase: path.resolve(__dirname, 'dist')
};
module.exports = () => {
    // call dotenv and it will return an Object with a parsed key 
    const env = dotenv.config().parsed;
    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
    return {
      plugins: [
        new webpack.DefinePlugin(envKeys)
      ]
    };
}
module.exports = {
    resolve: {
        alias: {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }
    },
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
        //publicPath: 'D:/jsDev/UnicronApp/UnicronClient/dist/'
        //Todo: Sử dụng cho nested route (môi trường dev)
        //publicPath: `${HOST}:${CLIENT_PORT}/`
    },
    module: {
        rules: [

            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            },
            // TODO: Load css
            {
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", 
                    query: {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                      }
                }, {
                    loader: "sass-loader", 
                    query: {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                      }
                }],
                test: /\.(s*)css$/
            },
            //Todo: Load các loại file ( font, img...)
            {
                loader: 'file-loader',
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf|\.mp3$|\.wav$/
            }
        ],
    },
    plugins: [
        //Todo: Cấu hình để sử dụng đc jquery
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'windown.$': 'jquery',
            'windown.jQuery': 'jquery'
        }),
        /* Todo: Optimize bundle.js và vendor.js => giảm kích thước file
               Thêm manifest: khi dist lại project sẽ chỉ load lại những gói file có sự thay đổi ( thường là bundle.js) */
        // Todo: Sinh ra file index.html trong gói bundle
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/
                  },
            }
        },
        runtimeChunk: {
            name: "manifest",
          },
    },
    mode: 'production',
    //Todo: Trace log
    //devtool: '#source-map',
    //devServer,

}