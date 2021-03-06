'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _postcss = require('postcss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var content = {
  toString: function toString() {
    return '._3tm50djVeMVyzgKEEuOIbA {\n      background-color: #efefef;\n  }\n\n  ._1dqMeCxKdQ-mMQo5DSjOyQ {\n      padding: 20px;\n  }\n\n  ._1wQF7ey2pufkSgu87Ae7jl {\n      min-width: 500px;\n  }\n\n  ._1oyMM3zpYbCV97styqG2pC {\n      border: 4px solid blue;\n      display: inline-block;\n  }\n  \n  div {\n    color: red;\n  }\n  \n  .Stuff.OtherStuff {\n    padding: 10px;\n  }\n  \n  .Block:hover {\n    color: blue;\n  }\n\n  image._3pYwWnO_i_DZ4oq5aRcdCP, image.Cat {\n      background-color: blue;\n  }';
  },
  locals: {
    Block: "_3pYwWnO_i_DZ4oq5akanwy",
    CatImage: "_3pYwWnO_i_DZ4oq5aRcdCP",
    Container: "_3tm50djVeMVyzgKEEuOIbA",
    ImageContainer: "_1oyMM3zpYbCV97styqG2pC",
    h2_Header: "_1dqMeCxKdQ-mMQo5DSjOyQ",
    img_Logo: "_1wQF7ey2pufkSgu87Ae7jl"
  }
};

var result = (0, _postcss.parse)(content);

var combineArrays = function combineArrays(arr1, arr2) {
  return [].concat(_toConsumableArray(arr1), _toConsumableArray(arr2));
};

var doesNotHaveSpace = function doesNotHaveSpace(string) {
  return string.indexOf(' ') === -1;
};
var doesNotHaveMultipleClasses = function doesNotHaveMultipleClasses(string) {
  return string.split('.').length === 2;
};
var ignorePseudo = function ignorePseudo(string) {
  return string.indexOf(':') === -1;
};

var extractElement = function extractElement(selector) {
  if (selector[0] === '.') {
    return {
      Element: 'div',
      component: selector.substr(1)
    };
  }

  var _selector$split = selector.split('.'),
      _selector$split2 = _slicedToArray(_selector$split, 2),
      Element = _selector$split2[0],
      component = _selector$split2[1];

  return {
    Element: Element,
    component: component
  };
};

var reverseLookup = content.locals && Object.keys(content.locals).reduce(function (all, className) {
  return _extends({}, all, _defineProperty({}, content.locals[className], className));
}, {});

var extractClassName = function extractClassName(_ref) {
  var component = _ref.component,
      rest = _objectWithoutProperties(_ref, ['component']);

  if (!reverseLookup || !reverseLookup[component]) {
    return _extends({}, rest, {
      component: component,
      className: component
    });
  }

  return _extends({}, rest, {
    component: reverseLookup[component],
    className: component
  });
};

var componentIsValid = function componentIsValid(_ref2) {
  var component = _ref2.component;
  return (/^[A-Z]/.test(component)
  );
};

var byComponent = function byComponent(config, _ref3) {
  var component = _ref3.component,
      Element = _ref3.Element,
      className = _ref3.className;
  return _extends({}, config, _defineProperty({}, component, config[component] || function (props) {
    return _react2.default.createElement(Element, _extends({}, props, { className: (0, _classnames2.default)(className, props.className) }));
  }));
};

var components = result.nodes.map(function (node) {
  return node.selectors;
}).reduce(combineArrays, []).filter(doesNotHaveSpace).filter(doesNotHaveMultipleClasses).filter(ignorePseudo).map(extractElement).map(extractClassName).filter(componentIsValid).reduce(byComponent, {});

content.locals = _extends({}, content.locals || {}, components);

module.exports = content;
