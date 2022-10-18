const resolve = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");
const ts = require("rollup-plugin-typescript2");
// import ts from "rollup-plugin-typescript2";

const path = require("path");

module.exports = {
  input: "src/index.ts", // 打包入口
  output: [
    {
      file: "dist/index.js",
      format: "esm", //
      name: "@savage181855/mini-store",
    },
  ],
  plugins: [
    // 打包插件
    resolve(), // 查找和打包node_modules中的第三方模块
    // terser(), // 压缩代码和去除注释
    ts({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      extensions: [".js", ".ts", ".tsx"],
    }),
  ],
};
