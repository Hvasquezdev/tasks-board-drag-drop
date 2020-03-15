<template>
  <div
    class="column"
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

    <div v-if="column.tasks.length > 0" class="list-reset">
      <board-column-task
        v-for="task in column.tasks"
        :key="task.id"
        :task="task"
        :column="column"
        :board="board"
      />
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
</template>

<script>
export default {
  name: 'board-column',
  props: {
    column: {
      type: Object,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  components: {
    BoardColumnTask: () => import('@/components/BoardColumnTask')
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      });

      e.target.value = null;
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
.column {
  @apply bg-gray-100 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
