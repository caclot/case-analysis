// src/store/index.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		login: false,
		username: '未登录',
		uid: '请先登录',
		phone: '',
		mail: '',
		area: '',
	},
	mutations: {
		userLogin(state, payload) {
			state.login = true;
			state.username = payload.username;
			state.uid = payload.uid;
			state.phone = payload.phone;
			state.mail = payload.mail;
			state.area = payload.area;
		},
		userLogout(state) {
			state.login = false;
			state.username = '未登录';
			state.uid = '请先登录';
			state.phone = '';
			state.mail = '';
			state.area = '';
		},
		setLogin(state, status) {
			state.login = status;
		}
	},
	actions: {
		updateLogin({ commit }, status) {
			commit('setLogin', status);
		}
	},
});
