const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
module.exports = {
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename:"main.[hash:8].js"
    },
    module: {
        rules: [
          {
            test: /\.png$/,
            type: "asset/resource",
            //自定义文件夹及文件名  方式2 优先级高于方式1
            generator: {
              // filename:'images/my.png',//自己取目录名和文件名
              filename: "images/[hash][ext]",
            },
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader,  "css-loader", "postcss-loader" ],
          },
          
      
          {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader,  "css-loader", "postcss-loader" ,"less-loader"],
          },
          {
          // 导入字体图标/自定义字体
           test:/\.(woff | eot | ttf | otf | svg)$/,//字体的格式
           type:'asset/resource'
          },    
        ],
      },
    
    mode:process.env.NODE_ENV,
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    externals: {
        jquery: "jQuery",
        lodash: "_"
    },
    devServer: {
        open: true,
        //配置前端请求代理
        proxy: {
            "^/api": {
                target: process.env.NODE_ENV === "development"
                 ? "http://127.0.0.1:3000"
                 : process.nev.NODE_ENV==="production"
                 ?"http://api.cc0820.top:3000"
                 :"",
                pathRewrite: { "/api": "" }
            },
            "^/api1": {
                target: "http://127.0.0.1:3001",
                pathRewrite: { "/api1": "" }
            }
        },
        client: {
            overlay: false
        }
    },


    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            cdn: {
                script: [
                    "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js",
                    "https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js"
                ],
                style: [

                ]
            }
        }),
        new MiniCssExtractPlugin({
            filename:"main.[contenthash:8].css"
        })
    ]
}