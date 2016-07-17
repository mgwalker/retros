'use strict';
const path = require('path');

const paths = [ ];
paths.push(path.join(require.resolve('uswds'), '../..', 'stylesheets'));

console.log(paths.join(':'));
