import globals from '../global/index';

const getters = {};
// copy the global state values into state
Object.assign(getters, globals.getters);

// Get the left or right child canvas of a given problem
getters.getLeftChildCanvasNum = () => (index) => 2 * index + 1;
getters.getRightChildCanvasNum = () => (index) => 2 * index + 2;
getters.getParentCanvasNum = () => (index) => {
  const even = index % 2 === 0;
  if (even) return (index - 2) / 2;
  return (index - 1) / 2;
};
getters.finished = (state) => (canvasNum) => state.problemTree[canvasNum].finished;
export default getters;
