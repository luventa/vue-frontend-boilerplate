<template>
  <section>
    <img style="height: 30rem;" src="~@/assets/images/test.png?inline">
    <div>
      <h1>Normal Request</h1>
      <button @click="test1">
        Send
      </button>
      <div>
        Result: {{ response1 }}
      </div>
    </div>
    <div>
      <h1>Encrypted Request</h1>
      <button @click="test2">
        Send
      </button>
      <div>Result: {{ response2 }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HttpDemoPage',

  data () {
    return {
      response1: null,
      response2: null
    }
  },

  methods: {
    test1 () {
      console.log(this._get)
      this.$http.post('/trade/book').then(res => {
        this.response1 = res.data.rtnMsg
      }).catch(e => {
        console.error(e)
      })
    },
    test2 () {
      this.$https.post('/user/login', {
        test: 'hahaha'
      }).then(res => {
        this.response2 = res.data.content
      }).catch(e => {
        console.error(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  min-height: 40rem;
}
</style>
