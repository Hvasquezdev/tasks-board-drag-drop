<template>
  <div
    class="task cursor-pointer"
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
      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
        {{ task.description }}
      </p>
    </div>
  </div>
</template>

<script>
import movingTasksAndColumns from '@/mixins/movingTasksAndColumns';

export default {
  name: 'board-column-task',
  mixins: [movingTasksAndColumns],
  props: {
    task: {
      type: Object,
      required: true
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
</style>
