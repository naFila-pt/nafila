const path = require("path");
const { fixBabelImports, override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  fixBabelImports("@material-ui/core", {
    libraryDirectory: "esm",
    camel2DashComponentName: false
  }),

  fixBabelImports("@material-ui/icons", {
    libraryDirectory: "esm",
    camel2DashComponentName: false
  }),

  addWebpackAlias({
    "@src": path.resolve(__dirname, "./src/")
  })
);
