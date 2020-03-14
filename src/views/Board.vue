<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div class="column" v-for="column in board.columns" :key="column.id">
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>

        <div class="list-reset">
          <div
            class="task cursor-pointer"
            v-for="task in column.tasks"
            :key="task.id"
            @click="openTaskModal(task)"
          >
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
    </div>

    <div v-if="isTaskOpen" class="task-modal" @click="closeTaskModal">
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
    }
  }
};
</script>

<style lang="postcss">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-700 no-underline;
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
