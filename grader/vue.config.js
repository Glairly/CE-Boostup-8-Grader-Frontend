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
                target: "https://deno.everythink.dev/api",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': ''
                },
            },
            "/compiler": {
                target: "https://bug.everythink.dev/compiler",
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