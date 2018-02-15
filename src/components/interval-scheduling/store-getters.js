import globals from '../../scripts/globalStore';

const storeGetters = {};

// copy the global state values into state
Object.assign(storeGetters, globals.getters);

export default storeGetters;
