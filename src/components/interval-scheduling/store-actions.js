import globals from '../../scripts/globalStore';

const actions = {};
// copy the global state values into state
Object.assign(actions, globals.state);

export default actions;
