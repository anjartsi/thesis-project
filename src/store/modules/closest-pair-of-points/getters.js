import globals from '../global/index';

const getters = {};
// copy the global state values into state
Object.assign(getters, globals.getters);

export default getters;
