<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',

  mounted () {
    let env = process.env
    console.log('Current env:', this._get(env, 'NODE_ENV'))
    console.log('Running with Electron', !!this._isElectron)
  }
}
</script>

<style lang="scss">
@import '~animate.css';
@import './style/index.scss';

#app {
  font-family: $family-primary;
  background-color: $grey-light;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.animated {
  animation-duration: .377s;
}

</style>
