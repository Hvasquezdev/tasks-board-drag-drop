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
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>

        <div class="list-reset">
          <div
            class="task"
            v-for="task in column.tasks"
            :key="task.id"
            draggable="true"
            @dragstart="pickupTask($event, task.id, column.id)"
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

        <input
          type="text"
          class="block p-2 w-full bg-transparent outline-none text-gray-500 mt-2"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
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
    moveTaskOrColumn(e, toTasks, toColumn) {
      const type = e.dataTransfer.getData('type');

      switch (type) {
        case 'task':
          this.moveTask(e, toTasks);
          break;

        default:
          this.moveColumn(e, toColumn);
          break;
      }
    },
    moveTask(e, toTasks) {
      const fromIndex = e.dataTransfer.getData('from-column-index');
      const taskIndex = e.dataTransfer.getData('task-index');
      const fromTasks = this.board.columns[fromIndex].tasks;

      this.$store.commit('MOVE_TASK', {
        from: fromTasks,
        to: toTasks,
        taskIndex
      });
    },
    moveColumn(e, toColumn) {
      const fromIndex = e.dataTransfer.getData('from-column-index');
      const toIndex = this.board.columns.indexOf(toColumn);

      this.$store.commit('MOVE_COLUMN', {
        fromIndex,
        toIndex
      });
    }
  }
};
</script>

<style lang="postcss">
.task {
  @apply pb-2;
}

.task-content {
  @apply flex items-center flex-wrap shadow py-2 px-2 rounded bg-white text-gray-700 no-underline;
}

.task:last-child {
  @apply pb-0;
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
