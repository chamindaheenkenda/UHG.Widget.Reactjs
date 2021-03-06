var path = require("path");

module.exports = {
    entry: ["./src/index.tsx"],
    output:{
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map",
    resolve:{
        extensions:[".ts", ".tsx", ".js", ".json"]
    },
    module:{
        loaders:[{
            test:/\.tsx?$/,
            loader:"ts-loader"
        }]
    }
};