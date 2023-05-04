import commonjs from '@rollup/plugin-typescript'
import typescript from '@rollup/plugin-typescript'
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";

export default {
    input: './src/main.ts',
    output: {
        file: './dist/miryth.js',
        format: 'es',
        name: 'miryth'
    },
    plugins: [typescript(), resolve(), json(), commonjs()]
};