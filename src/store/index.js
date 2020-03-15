import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import defaultBoard from '@/dummy/default-board';
import { saveStatePlugin, uuid } from '@/utils';

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
            if (task.id === id) return task;
          }
        }
      };
    }
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    MOVE_TASK(state, { from, to, taskIndex }) {
      const taskToMove = from.splice(taskIndex, 1)[0];
      to.push(taskToMove);
    }
  },
  actions: {},
  modules: {}
});
