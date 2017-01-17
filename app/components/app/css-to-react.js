import React from 'react';
import classNames from 'classnames'

const process = (originalName, className) => {
  if (originalName[0].toLowerCase() !== originalName[0]) {
    return { [originalName]: (props = {}) => <div {...props} className={classNames(className, props.className) } /> }
  }

  const split = originalName.indexOf('_');

  if (split === -1) {
    throw new Error('Class names must begin with a capital letter unless specifying element type, ' + originalName);
  }

  const Element = originalName.slice(0, split);
  const name = originalName.slice(split + 1);

  return { [name]: (props = {}) => <Element {...props} className={classNames(className, props.className) } /> }
}

const generate = styles => Object.keys(styles).reduce(
  (all, Component) => ({
    ...all,
    ...process(Component, styles[Component])
  }), {}
);

export default generate
