import globals from '../../scripts/globalStore';


const storeGetters = {};
Object.assign(storeGetters, globals.getters);

storeGetters.getInterval = (state) => (index) => state.intervals[index];

export default storeGetters;
