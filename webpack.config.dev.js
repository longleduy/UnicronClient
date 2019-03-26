

const path = require('path')
// TODO: Export file css ra file riêng
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { HOST, CLIENT_PORT } = require('./src/utils/contants/host_contants')
const dotenv = require('dotenv');
const fs = require('fs')
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
module.exports = env => {
  const currentPath = path.join(__dirname);
  const basePath = currentPath + '/.env';
  const envPath = basePath + '.' + env.ENVIRONMENT;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
    return {
        resolve: {
            alias: {
                'react-dom': 'react-dom/profiling',
                'schedule/tracing': 'schedule/tracing-profiling',
            }
        },
        entry: {
            bundle: './src/index.js',
            vendor: VENDOR_LIBS
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[chunkhash].js',
            //Todo: Sử dụng cho nested route (môi trường dev), mất cả buổi sáng vọc, khổ vlin
            publicPath: `${process.env.HOST}:${process.env.CLIENT_PORT}/`
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
                   Thêm manifest: khi build lại project sẽ chỉ load lại những gói file có sự thay đổi ( thường là bundle.js) */
            // Todo: Sinh ra file index.html trong gói bundle
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new webpack.DefinePlugin(envKeys)
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
        mode: 'development',
        //Todo: Trace log
        devtool: '#source-map',
        devServer,
    }
}
