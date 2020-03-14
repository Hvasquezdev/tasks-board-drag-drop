import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import defaultBoard from '@/dummy/default-board';
import { saveStatePlugin } from '@/utils';

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {},
  actions: {},
  modules: {}
});
