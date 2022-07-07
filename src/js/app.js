import Memory from './memory';
import Tracker from './tracker';

console.log('app started');

const memory = new Memory();
const tracker = new Tracker(memory);

tracker.renderDom();

tracker.init(document.querySelector('.input-text'));
