const loaderUtils = require('loader-utils');
const path = require('path');
const babel = require('babel-core');

module.exports = function (content) {
  return content;
};

module.exports.pitch = function (remainingRequest) {
  if (this.cacheable) this.cacheable();

  const code = babel.transformFileSync(path.resolve(__dirname, './css-to-react-loader.dev.js')).code;

  return `
    var content = require(${loaderUtils.stringifyRequest(this, "!!" + remainingRequest)});
    if(typeof content === 'string') content = [[module.id, content, '']];
    
    ${code}
  `.replace('\\', '\\\\');
}
