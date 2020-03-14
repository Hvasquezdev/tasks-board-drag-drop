<template>
  <div class="task-view">
    <div
      v-if="task"
      class="flex flex-col flex-grow items-start justify-between px-4"
    >
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
import { mapGetters } from 'vuex';

export default {
  name: 'Task-View',
  computed: {
    ...mapGetters({
      getTask: 'getTask'
    }),
    task() {
      return this.getTask(this.$route.params.id);
    }
  }
};
</script>

<style lang="postcss">
.task-view {
  @apply relative flex flex-row bg-white mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
