import globals from '../global/index';

const getters = {};
// copy the global state values into state
Object.assign(getters, globals.getters);

// Get the left or right child canvas of a given problem
getters.getLeftChildCanvasNum = () => (index) => 2 * index + 1;
getters.getRightChildCanvasNum = () => (index) => 2 * index + 2;

export default getters;
