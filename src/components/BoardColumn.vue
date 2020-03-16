<template>
  <div
    class="column"
    draggable="true"
    @drop="moveTaskOrColumn($event, column.tasks, column)"
    @dragover.prevent=""
    @dragenter.prevent=""
    @dragstart.self="pickupColumn($event, column.id)"
  >
    <alert-remove-column v-if="isOpenRemoveAlert" class="mb-2" />

    <div class="flex items-center justify-between">
      <input
        type="text"
        class="block flex-grow p-2 w-full bg-transparent outline-none font-bold cursor-pointer"
        placeholder="Column name"
        :value="column.name"
        @keyup.enter="updateColumnName($event, column)"
      />

      <span
        v-if="!isOpenRemoveAlert"
        class="column--delete full-rounded"
        @click="isOpenRemoveAlert = true"
      >
        x
      </span>
      <span
        v-else
        class="column--delete py-1 rounded"
        @click="removeColumn(column)"
      >
        Confirm
      </span>
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
import movingTasksAndColumns from '@/mixins/movingTasksAndColumns';

export default {
  name: 'board-column',
  mixins: [movingTasksAndColumns],
  components: {
    BoardColumnTask: () => import('@/components/BoardColumnTask'),
    AlertRemoveColumn: () => import('@/components/AlertRemoveColumn')
  },
  data() {
    return {
      isOpenRemoveAlert: false
    };
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      });

      e.target.value = null;
    },
    removeColumn(column) {
      this.$store.commit('REMOVE_COLUMN', { column });
      this.isOpenRemoveAlert = false;
    },
    pickupColumn(e, columnId) {
      const column = this.board.columns.find(column => column.id === columnId);
      const columnIndex = this.board.columns.indexOf(column);

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';

      e.dataTransfer.setData('from-column-index', columnIndex);
      e.dataTransfer.setData('type', 'column');
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

.column--delete {
  @apply text-white bg-red-400 shadow font-bold ml-2 px-2;
  cursor: pointer;
}
.full-rounded {
  border-radius: 100%;
}
</style>
