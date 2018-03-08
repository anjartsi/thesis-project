import globals from '../global/index';

const getters = {};
// copy the global state values into state
Object.assign(getters, globals.getters);

// Get the left or right child canvas of a given problem
getters.getLeftChildCanvas = (state) => (canvasNum) => state.problems[2 * canvasNum + 1] || null;
getters.getLeftChildCanvas = (state) => (canvasNum) => state.problems[2 * canvasNum + 2] || null;

export default getters;
