<template>
  <article class="app-main" :class="{ 'landpage': _trace.inLandpage }">
    <Transition name="fade" mode="out-in">
      <RouterView />
    </Transition>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppMain',

  computed: mapGetters({
    _trace: '_trace'
  })
}
</script>

<style lang="scss" scoped>
.app-main {
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 3.75rem);
  margin: 0 auto;
  background-color: white; 

  &.landpage {
    height: calc(100vh - 1.25rem);
  }
}
</style>
