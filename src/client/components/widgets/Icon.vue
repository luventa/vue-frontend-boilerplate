<template>
  <span :class="classes" :style="styles" @click="handleClick">
    <i :class="`${category} ${type}`" :style="iStyles" />
  </span>
</template>

<script>
const iconPrefix = 'we-icon'

export default {
  name: 'Icon',

  props: {
    type: {
      type: String,
      default: null
    },
    category: {
      type: String,
      default: 'weicon'
    },
    size: {
      type: [ String, Number ],
      default: 14
    },
    color: {
      type: String,
      default: 'inherit'
    },
    zoom: {
      type: Number,
      default: 1
    }
  },

  computed: {
    classes () {
      return [ iconPrefix ]
    },
    styles () {
      let size = `${this.size}px`
      return { height: size, width: size }
    },
    iStyles () {
      let iconSize = `${this.size * this.zoom}px`
      return { 'font-size': iconSize, 'line-height': iconSize }
    }
  },

  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
/* Variables */
$icon-prefix: 'we-icon';

.#{$icon-prefix} {
  align-items: center;
  display: inline-flex;
  justify-content: center;
}
</style>
