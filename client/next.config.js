// File loaded automatically by nextjs. Tells webpack watch file changes inside project directory every 300ms. 
// Config suppose to help Docker update pages, sometimes it's not working properly.
module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300
        return config
    }
}