const loaderUtils = require('loader-utils');
const path = require('path');

module.exports = (content) => content;
module.exports.pitch = function (remainingRequest) {
  if (this.cacheable) this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  console.log(remainingRequest);
  return `
    // style-loader: Adds some css to the DOM by adding a <style> tag
    
    // load the styles
    var content = require(${loaderUtils.stringifyRequest(this, "!!" + remainingRequest)});
    if(typeof content === 'string') content = [[module.id, content, '']];
    console.log('got content', content.toString());
    
    

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var string = content.toString();

var elementMatches = (string.match(/^(\s+[a-z]|[a-z])+\.[^{]*{[^}]*}$/mg) || []).map(function (x) {
  return x.trim();
}).filter(function (x) {
  return x.length;
});
var divMatches = (string.match(/^(\s+\.|\.)([^{])+{[^}]+}$/mg) || []).map(function (x) {
  return x.trim();
}).filter(function (x) {
  return x.length;
});

var reverseLookup = content.locals && Object.keys(content.locals).reduce(function (all, className) {
  return _extends({}, all, _defineProperty({}, content.locals[className], className));
}, {});

var canBeComponent = function canBeComponent(_ref) {
  var component = _ref.component;
  return component[0].toUpperCase() === component[0];
};

var extractElement = function extractElement(string) {
  var dotIndex = string.indexOf('.');
  var Element = string.substr(0, dotIndex);
  var rest = string.substr(dotIndex + 1);
  var blockIndex = rest.indexOf('{');
  var component = rest.substr(0, blockIndex).trim();

  return { Element: Element, component: component };
};

var createDivDef = function createDivDef(string) {
  var blockIndex = string.indexOf('{');
  return {
    Element: 'div',
    component: string.substr(1, blockIndex - 1).trim()
  };
};

var useModules = function useModules(def) {
  if (!reverseLookup) return _extends({}, def, {
    className: def.component
  });

  if (reverseLookup[def.component]) {
    return _extends({}, def, {
      component: reverseLookup[def.component],
      className: def.component
    });
  }
};

var addComponent = function addComponent(config, _ref2) {
  var component = _ref2.component,
      Element = _ref2.Element,
      className = _ref2.className;
  return _extends({}, config, _defineProperty({}, component, function (props) {
    return _react2.default.createElement(Element, _extends({}, props, { className: (0, _classnames2.default)(className, props.className) }));
  }));
};

var elementDefs = elementMatches.map(function (match) {
  return extractElement(match);
}).map(function (def) {
  return useModules(def);
}).filter(Boolean).filter(function (def) {
  return canBeComponent(def);
}).reduce(function (locals, _ref3) {
  var component = _ref3.component,
      Element = _ref3.Element,
      className = _ref3.className;
  return _extends({}, locals, _defineProperty({}, component, function (props) {
    return _react2.default.createElement(Element, _extends({}, props, { className: (0, _classnames2.default)(className, props.className) }));
  }));
}, {});

var print = function print(x) {
  console.log(x);
  return x;
};

var potential = [].concat(_toConsumableArray(elementMatches.map(function (match) {
  return extractElement(match);
})), _toConsumableArray(divMatches.map(createDivDef)));

var divDefs = divMatches.map(createDivDef).map(useModules).filter(Boolean).filter(canBeComponent).reduce(addComponent, {});

var elements = potential.map(useModules).filter(Boolean).filter(canBeComponent).reduce(addComponent, {});

content.locals = _extends({}, content.locals || {}, elements);

module.exports = content;
  `.replace('\\', '\\\\');
}
