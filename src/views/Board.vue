<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <board-column
        v-for="column in board.columns"
        :key="column.id"
        :column="column"
        :board="board"
      />

      <div class="create-column flex">
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
  components: {
    BoardColumn: () => import('@/components/BoardColumn')
  },
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
    closeTaskModal() {
      this.$router.push({
        name: 'board'
      });
    }
  }
};
</script>

<style lang="postcss">
.create-column {
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
