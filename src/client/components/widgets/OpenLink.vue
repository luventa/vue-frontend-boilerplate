<template>
  <span class="open-link" @click="open">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'OpenLink',

  props: {
    url: {
      type: String,
      required: true
    }
  },

  methods: {
    open () {
      this.$electron.shell.openExternal(this.url)
    }
  }
}
</script>

<style lang="scss">
.open-link {
  color: grey;
  user-select: none;
  cursor: pointer;

  &:hover {
    color: green;
  }
}
</style>
