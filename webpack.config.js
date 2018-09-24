const isDev = process.env.NODE_ENV === "development";

module.exports = {
  mode: "development",
  entry: [
    "@babel/polyfill", // enables async-await
    "./client/webCam.js"
  ],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
