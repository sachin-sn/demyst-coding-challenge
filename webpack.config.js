const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/src/index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "./client/dist"), // Output directory
    filename: "bundle.js", // Output bundle filename
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use Babel for transpiling JSX and ES6
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // Handle CSS files
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/public/index.html", // Use this HTML template
    }),
  ],
  devServer: {
    compress: true,
    port: 3000, // Port for development server
    historyApiFallback: true, // Enable HTML5 history API fallback for React Router
  },
};
