const path = require("path");

const resolve = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");
const ts = require("rollup-plugin-typescript2");


module.exports = {
  input: "src/index.ts", // 打包入口
  output: [
    {
      file: "dist/index.js", // 输出的文件
      format: "cjs", // 文件模块规范
      name: "@savage181855/utils", // 模块变量名 Var @savage181855/utils=模块内容
    },
  ],
  plugins: [
    // 打包插件
    resolve(), // 查找和打包node_modules中的第三方模块
    // terser(), // 压缩代码和去除注释
    ts({ // 解析 typescript
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      extensions: [".js", ".ts", ".tsx"], // 解析的扩展名
    }),
  ],
};
