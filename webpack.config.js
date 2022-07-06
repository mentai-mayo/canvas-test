
const _path = require('path');
const path = process.platform == 'win32' ? _path.win32 : _path;

module.exports = {
  entry: './tsbuild/index.mjs',
  output: {
    path: path.resolve(__dirname, 'client'),
    filename: 'bundle.mjs',
  },
  cache: true,
};
