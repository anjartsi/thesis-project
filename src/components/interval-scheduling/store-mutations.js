import globals from '../../scripts/globalStore';

const mutations = {};
// copy the global state values into state
Object.assign(mutations, globals.mutations);

export default mutations;
