<template>
  <div class="hello">
    <golden-layout style="height: 100vh; width: 100vw;">
      <template slot="bottom">
        <a>
          这是底部
        </a>
      </template>
      <gl-col :closeable="false">
        <gl-router empty-route="/task/routeTab" :routes="routes">
          <template slot="route" slot-scope="{ meta }">
            <p>
              打开的页面是{{ meta }}
            </p>
            <main />
          </template>
        </gl-router>
        <funny-com @showBottom="showBottom" />
        <gl-component v-if="showBottomIf" template="bottom" />
      </gl-col>
    </golden-layout>
  </div>
</template>

<script>
import FunnyCom from './FunnyCom'
export default {
  name: 'Home',
  components: {
    FunnyCom
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showBottomIf: false,
      routes: [{ path: '/task/routeTab' }]
    }
  },
  methods: {
    showBottom () {
      this.showBottomIf = !this.showBottomIf
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: black;
}
</style>
