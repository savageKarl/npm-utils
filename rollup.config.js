const ts = require("rollup-plugin-typescript2");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const del = require("rollup-plugin-delete");

module.exports = {
  input: "src/index.ts", // pack entry
  output: [
    {
      file: "dist/index.js", // ouput file
      format: "esm", // file module specifications
      sourcemap: true,
    },
  ],
  plugins: [
    del({ targets: "./dist/*" }),
    commonjs(), // parse the module of commonjs specifications
    resolve(), // parse third-party lib, because rollup only can parse local module
    ts({
      tsconfig: "./tsconfig.json", // specify tsconfig.json file, use to specify the packaging file range
    }),
  ],
};
