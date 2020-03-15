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
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        id: uuid(),
        tasks: []
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
    UPDATE_COLUMN_NAME(state, { column, name }) {
      column.name = name;
    },
    MOVE_TASK(state, { from, fromIndex, to, toIndex }) {
      const taskToMove = from.splice(fromIndex, 1)[0];
      const spliceIndex = toIndex >= 0 ? toIndex : to.length;

      to.splice(spliceIndex, 0, taskToMove);
    },
    MOVE_COLUMN(state, { fromIndex, toIndex }) {
      const columnList = state.board.columns;
      const columnToMove = columnList.splice(fromIndex, 1)[0];

      columnList.splice(toIndex, 0, columnToMove);
    }
  },
  actions: {},
  modules: {}
});
