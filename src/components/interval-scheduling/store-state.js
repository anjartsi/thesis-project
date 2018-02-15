import globals from '../../scripts/globalStore';


const state = {};
// copy the global state values into state
Object.assign(state, globals.state);

export default state;
