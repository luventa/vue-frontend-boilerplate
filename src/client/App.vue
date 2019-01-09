<template>
  <div id="app">
    <AppHeader />
    <AppMain />
    <AppFooter />
  </div>
</template>

<script>
import { AppHeader, AppMain, AppFooter } from '@comp/layout'

export default {
  name: 'App',

  components: {
    AppHeader,
    AppMain,
    AppFooter
  },

  mounted () {
    let env = process.env
    console.log('Current env:', this._get(env, 'NODE_ENV'))
    console.log('Running with Electron', !!this._isElectron)
  }
}
</script>

<style lang="scss">
@import '~animate.css';
@import "./style/index.scss";

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
