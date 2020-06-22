module.exports = {
    "transpileDependencies": [
        "vuetify", "vuex-persist"
    ],
    // dev mode
    devServer: {
        proxy: {
            "/gists": {
                target: "https://api.github.com",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/gists': ''
                },

            },
            "/goo": {
                target: "https://www.google.co.th/",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/goo': ''
                },
            },
            "/api/*": {
                target: "http://localhost:5000/api",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': ''
                },
            },
            "/compiler": {
                target: "http://localhost:4906/compiler",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/compiler': ''
                },
            }
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'CE-BoostUp 8'
                return args
            })
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                    @import "@/css/ova.scss";
                     `
            }
        }
    }
}