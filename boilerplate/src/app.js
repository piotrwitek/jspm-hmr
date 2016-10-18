import { getMessage } from './es6module.js';

const el = document.querySelector('#app-container');
el.innerHTML = 'Open app.js change this text and save the file.' +
  '<br /> Look at the browser all the time for Hot-Reload Magic :)';
el.innerHTML += getMessage();