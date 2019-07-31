<template>
  <div class="hello">
    <gl-row>
      <gl-component template="First" title="FirstTab" />
      <template slot="First">
        <span>
          第一个tab
        </span>
        <button @click="openButton">
          展示底部
        </button>
        <button @click="addTabe">
          新增一个tab
        </button>
        <router-link to="/task/list">
          打开TaskList
        </router-link>
      </template>
      <div slot="addAndRmove" slot-scope="{ stackSub }" class="test-template">
        被新增出来的Tab
        <span style="display: block;">
          (id: {{ stackSub }})
        </span>
        <a style="display: block; font-size: 17px;">
          gl-component与对应slot通过slot-scope和sate通信
        </a>
        <button @click="removeTab(stackSub)">
          关闭这个Tba
        </button>
      </div>
      <gl-dstack ref="myStack" dstack-id="dynamics">
        <gl-component title="不可拖拽 不可关闭" :closable="false" :reorder-enabled="false">
          这是一个不可拖拽，不可关闭的tab
          <router-link to="/task/routeTab">
            打开RouteTab
          </router-link>
        </gl-component>
        <gl-component v-for="stackSub in tabList" :key="stackSub" template="addAndRmove" :title="'newTab'+stackSub" :state="{stackSub}" @destroy="removeTab(stackSub)" />
      </gl-dstack>
    </gl-row>
  </div>
</template>

<script>
// import Vue from 'vue'
const vgl = require('vue-golden-layout')
const com = {
  name: 'FunnyCom',
  components: {
  },
  data () {
    return {
      tabList: ['1', '2'],
      testText: ''
    }
  },
  mounted () {
  },
  methods: {
    openButton () {
      this.$emit('showBottom')
    },
    removeTab (id) {
      const index = this.tabList.indexOf(id)
      if (index !== -1) {
        this.tabList.splice(index, 1)
      }
    },
    addTabe () {
      if (this.tabList.slice(-1).length === 0) {
        this.tabList.push('1')
      } else {
        this.tabList.push(parseInt(this.tabList.slice(-1)) + 1)
      }
    }
  }
}
const FunnyCom = vgl.glCustomContainer.extend(com)
export default FunnyCom
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
</style>
