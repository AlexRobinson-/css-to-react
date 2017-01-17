import React from 'react';
import classNames from 'classnames';

const content = {
  toString: () => `._3tm50djVeMVyzgKEEuOIbA {
      background-color: #efefef;
  }

  ._1dqMeCxKdQ-mMQo5DSjOyQ {
      padding: 20px;
  }

  ._1wQF7ey2pufkSgu87Ae7jl {
      min-width: 500px;
  }

  ._1oyMM3zpYbCV97styqG2pC {
      border: 4px solid blue;
      display: inline-block;
  }

  image._3pYwWnO_i_DZ4oq5aRcdCP {
      background-color: blue;
  }`,
  locals: {
    CatImage: "_3pYwWnO_i_DZ4oq5aRcdCP",
    Container: "_3tm50djVeMVyzgKEEuOIbA",
    ImageContainer: "_1oyMM3zpYbCV97styqG2pC",
    h2_Header: "_1dqMeCxKdQ-mMQo5DSjOyQ",
    img_Logo: "_1wQF7ey2pufkSgu87Ae7jl"
  }
};

const string = content.toString();

const elementMatches = (string.match(/^(\s+[a-z]|[a-z])+\.[^{]*{[^}]*}$/mg) || []).map(x => x.trim()).filter(x => x.length);
const divMatches = (string.match(/^(\s+\.|\.)([^{])+{[^}]+}$/mg) || []).map(x => x.trim()).filter(x => x.length);

const reverseLookup = content.locals && Object
    .keys(content.locals)
    .reduce(
      (all, className) => ({
        ...all,
        [content.locals[className]]: className
      }), {}
    );

const canBeComponent = ({ component }) => component[0].toUpperCase() === component[0];

const extractElement = string => {
  const dotIndex = string.indexOf('.');
  const Element = string.substr(0, dotIndex);
  const rest = string.substr(dotIndex + 1);
  const blockIndex = rest.indexOf('{');
  const component = rest.substr(0, blockIndex).trim();

  return { Element, component };
};

const createDivDef = string => {
  const blockIndex = string.indexOf('{');
  return {
    Element: 'div',
    component: string.substr(1, blockIndex - 1).trim()
  }
};

const useModules = def => {
  if (!reverseLookup) return {
    ...def,
    className: def.component
  };

  if (reverseLookup[def.component]) {
    return {
      ...def,
      component: reverseLookup[def.component],
      className: def.component
    }
  }
}

const addComponent = (config, { component, Element, className }) => ({
  ...config,
  [component]: props => <Element {...props} className={classNames(className, props.className)} />
});

const elementDefs = elementMatches
  .map(match => extractElement(match))
  .map(def => useModules(def))
  .filter(Boolean)
  .filter(def => canBeComponent(def))
  .reduce((locals, { component, Element, className }) => ({
    ...locals,
    [component]: props => <Element {...props} className={classNames(className, props.className)} />
  }), {});

const print = x => {
  console.log(x);
  return x;
}

const divDefs = divMatches
  .map(createDivDef)
  .map(useModules)
  .filter(Boolean)
  .filter(canBeComponent)
  .reduce(addComponent, {});

const toExport = {
  ...(content.locals || {}),
  ...elementDefs,
  ...divDefs
};

module.exports = toExport;

