export default {
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
  methods: {
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
    }
  }
};
