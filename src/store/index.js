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
  getters: {
    getTask(state) {
      return id => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            console.log('ID', task.id === id);
            if (task.id === id) return task;
          }
        }
      };
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
