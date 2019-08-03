import { configure } from '@storybook/react';

const req = require.context('../stories', true, /\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename).default)
}

configure(loadStories, module);