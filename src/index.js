import './index.css';

import numeral from 'numeral';

/* eslint-disable no-unused-vars */

const courseValue =  numeral(2020).format('$0,0.00');

/* eslint-disable no-console */

console.log('I would not pay ${courseValue} for this awesome course!');