<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        class="column"
        v-for="column in board.columns"
        :key="column.id"
        draggable="true"
        @drop="moveTaskOrColumn($event, column.tasks, column)"
        @dragover.prevent=""
        @dragenter.prevent=""
        @dragstart.self="pickupColumn($event, column.id)"
      >
        <div class="flex items-center">
          <input
            type="text"
            class="block p-2 w-full bg-transparent outline-none font-bold cursor-pointer"
            placeholder="Column name"
            :value="column.name"
            @keyup.enter="updateColumnName($event, column)"
          />
        </div>

        <div class="list-reset">
          <div
            class="task cursor-pointer"
            v-for="task in column.tasks"
            :key="task.id"
            draggable="true"
            @dragstart="pickupTask($event, task.id, column.id)"
            @drop.stop="moveTaskOrColumn($event, column.tasks, column, task)"
            @dragover.prevent=""
            @dragenter.prevent=""
            @click="openTaskModal(task)"
          >
            <div class="task-content">
              <span class="w-full flex-no-shrink font-bold">
                {{ task.name }}
              </span>
              <p
                v-if="task.description"
                class="w-full flex-no-shrink mt-1 text-sm"
              >
                {{ task.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="new-task--input pt-2">
          <input
            type="text"
            class="block p-2 w-full bg-transparent outline-none text-gray-500"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </div>

      <div class="column flex">
        <input
          type="text"
          class="p-2 flex-grow rounded outline-none text-gray-500"
          placeholder="New column name"
          v-model.trim="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>

    <div v-if="isTaskOpen" class="task-modal" @click.self="closeTaskModal">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Board-View',
  data() {
    return {
      newColumnName: null
    };
  },
  computed: {
    ...mapState({
      board: 'board'
    }),
    isTaskOpen() {
      return this.$route.name === 'task';
    }
  },
  methods: {
    openTaskModal(task) {
      this.$router.push({
        name: 'task',
        params: {
          id: task.id
        }
      });
    },
    closeTaskModal() {
      this.$router.push({
        name: 'board'
      });
    },
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      });

      e.target.value = null;
    },
    createColumn() {
      if (!this.newColumnName) return;

      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      });

      this.newColumnName = null;
    },
    pickupTask(e, taskId, columnId) {
      const column = this.board.columns.find(column => column.id === columnId);
      const columnIndex = this.board.columns.indexOf(column);
      const task = column.tasks.find(task => task.id === taskId);
      const taskIndex = column.tasks.indexOf(task);

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('task-index', taskIndex);
      e.dataTransfer.setData('from-column-index', columnIndex);
      e.dataTransfer.setData('type', 'task');
    },
    pickupColumn(e, columnId) {
      const column = this.board.columns.find(column => column.id === columnId);
      const columnIndex = this.board.columns.indexOf(column);

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('from-column-index', columnIndex);
      e.dataTransfer.setData('type', 'column');
    },
    moveTaskOrColumn(e, toTasks, toColumn, toTask) {
      const type = e.dataTransfer.getData('type');

      switch (type) {
        case 'task':
          this.moveTask(e, toTasks, toTask);
          break;

        default:
          this.moveColumn(e, toColumn);
          break;
      }
    },
    moveTask(e, toTasks, toTask = undefined) {
      const fromIndex = e.dataTransfer.getData('from-column-index');
      const taskIndex = e.dataTransfer.getData('task-index');
      const fromTasks = this.board.columns[fromIndex].tasks;
      const toTaskIndex = toTasks.indexOf(toTask);

      this.$store.commit('MOVE_TASK', {
        from: fromTasks,
        fromIndex: taskIndex,
        to: toTasks,
        toIndex: toTaskIndex
      });
    },
    moveColumn(e, toColumn) {
      const fromIndex = e.dataTransfer.getData('from-column-index');
      const toIndex = this.board.columns.indexOf(toColumn);

      this.$store.commit('MOVE_COLUMN', {
        fromIndex,
        toIndex
      });
    },
    updateColumnName(e, column) {
      if (!e.target.value.trim() || !column) return;

      this.$store.commit('UPDATE_COLUMN_NAME', {
        name: e.target.value.trim(),
        column
      });

      e.target.blur();
    }
  }
};
</script>

<style lang="postcss">
.task {
  @apply pt-2;
}

.task-content {
  @apply flex items-center flex-wrap shadow py-2 px-2 rounded bg-white text-gray-700 no-underline;
}

.task:first {
  @apply pt-0;
}

.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-400 h-full overflow-auto;
}

.task-modal {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
