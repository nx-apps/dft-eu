module.exports = {
    entry: [
        './src/main.js'
    ],
    output: {
        filename: './public/bundle.js'
    },
    module:{
        /*loaders:[
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: [
                'babel-loader'
                ]
            }
        ]*/
    },
    watch: true,
    devtool:"inline-source-map"
};