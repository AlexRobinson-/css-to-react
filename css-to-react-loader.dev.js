import React from 'react';
import classNames from 'classnames';
import { parse } from 'postcss';

const result = parse(content);

const combineArrays = (arr1, arr2) => [...arr1, ...arr2];

const doesNotHaveSpace = string => string.indexOf(' ') === -1;
const doesNotHaveMultipleClasses = string => string.split('.').length === 2;
const ignorePseudo = string => string.indexOf(':') === -1;

const extractElement = selector => {
  if (selector[0] === '.') {
    return {
      Element: 'div',
      component: selector.substr(1)
    }
  }

  const [Element, component] = selector.split('.');
  return {
    Element,
    component
  }
};

const reverseLookup = content.locals && Object
    .keys(content.locals)
    .reduce(
      (all, className) => ({
        ...all,
        [content.locals[className]]: className
      }), {}
    );

const extractClassName = ({ component, ...rest }) => {
  if (!reverseLookup || !reverseLookup[component]) {
    return {
      ...rest,
      component,
      className: component
    };
  }

  return {
    ...rest,
    component: reverseLookup[component],
    className: component
  };
};

const componentIsValid = ({ component }) => /^[A-Z]/.test(component);

const byComponent = (config, { component, Element, className }) => ({
  ...config,
  [component]: config[component] || (props => <Element {...props} className={classNames(className, props.className)} />)
});

const components = result.nodes
  .map(node => node.selectors)
  .reduce(combineArrays, [])
  .filter(doesNotHaveSpace)
  .filter(doesNotHaveMultipleClasses)
  .filter(ignorePseudo)
  .map(extractElement)
  .map(extractClassName)
  .filter(componentIsValid)
  .reduce(byComponent, {});

content.locals = {
  ...(content.locals || {}),
  ...components
};

module.exports = content;
