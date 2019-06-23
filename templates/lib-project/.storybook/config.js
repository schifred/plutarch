'use strict';

var _react = require('@storybook/react');

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

(0, _react.configure)(loadStories, module);