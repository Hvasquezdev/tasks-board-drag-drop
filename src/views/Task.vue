<template>
  <div class="task-view">
    <div
      v-if="clonedTask"
      class="flex flex-col flex-grow items-start justify-between px-4"
    >
      <input
        type="text"
        class="w-full p-2 mb-2 text-xl font-bold border-2 border-transparent rounded outline-none"
        :class="{
          'border-yellow-400': isChanged.name,
          'border-green-300': updatedKey === 'name'
        }"
        placeholder="Task name"
        v-model="clonedTask.name"
        @keyup.enter="onUpdateTaskProperty('name')"
      />
      <textarea
        name="description"
        class="w-full p-2 bg-transparent relative border-2 border-transparent leading-none h-64 rounded outline-none"
        :class="{
          'border-yellow-400': isChanged.description,
          'border-green-300': updatedKey === 'description'
        }"
        placeholder="Task description"
        v-model="clonedTask.description"
        @keyup.enter="onUpdateTaskProperty('description')"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Task-View',
  data() {
    return {
      clonedTask: null,
      updatedKey: null
    };
  },
  mounted() {
    const task = this.getTask(this.$route.params.id);
    this.clonedTask = { ...task };
  },
  computed: {
    ...mapGetters({
      getTask: 'getTask'
    }),
    task() {
      return this.getTask(this.$route.params.id);
    },
    isChanged() {
      return {
        name: this.clonedTask.name !== this.task.name,
        description: this.clonedTask.description !== this.task.description
      };
    }
  },
  methods: {
    onUpdateTaskProperty(key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: this.clonedTask[key]
      });

      this.updatedKey = key;

      setTimeout(() => {
        this.updatedKey = null;
      }, 1000);
    }
  }
};
</script>

<style lang="postcss">
.task-view {
  @apply relative flex flex-row bg-white mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
.task-view input,
.task-view textarea {
  transition: all 0.3s;
}
</style>
