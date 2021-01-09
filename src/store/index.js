import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'

Vue.use(Vuex)

//导入state/actions/mutations/getters摸快
import state from './state.js'
import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

// const store = new Vuex.Store({state,getters,actions,mutations})
const store = new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
	plugins: [
		createVuexAlong(),
	],
});

export default store;
