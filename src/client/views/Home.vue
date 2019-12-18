<template>
  <section class="view text-center">
    <h1 class="demo-text">
      DEMO TEXT
    </h1>
    <img style="height: 30rem;" src="static/image/fuckyou.jpg">
  </section>
</template>

<script>
export default {
  name: 'HomePage',

  async mounted () {
    console.log('test', this.$app.store.setPassword)
    try {
      await this.$app.store.setPassword('test', 'u1', 'p1')
      const password = await this.$app.store.getPassword('test', 'u1')
      console.log('Got password:', password)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: map-get($demo-colors, $platform);
}
</style>
