<template>
  <gl-component title="RouteMain">
    RouteMain
  </gl-component>
</template>

<script>
// import Vue from 'vue'
const vgl = require('vue-golden-layout')
const com = {
  name: 'RouteTab',
  data () {
    return {
      checked: 'Hello'
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {
  }
}
const RouteTab = vgl.glCustomContainer.extend(com)
export default RouteTab
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
