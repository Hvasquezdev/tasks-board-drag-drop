<template>
  <button
    type="button"
    class="button inline-flex px-4 py-2 text-white font-bold rounded items-center"
    :class="className"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: ''
    }
  },
  computed: {
    className() {
      switch (this.theme) {
        case 'danger':
          return 'bg-red';
        default:
          return 'bg-teal';
      }
    }
  }
};
</script>
