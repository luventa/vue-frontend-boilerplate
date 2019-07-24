<template>
  <button type="button" class="r-btn" @click="handleClick">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'RouteButton',

  props: {
    to: {
      type: [String, Object],
      required: true
    },
    type: {
      type: String,
      validator: val => (val === null || ['window', 'external'].indexOf(val) > -1),
      default: null
    }
  },

  methods: {
    handleClick () {
      if (this.type === null) {
        this.$router.push(this.to)
        return
      }

      if (this.type === 'window') {
        const { href, route } = this.$router.resolve(this.to)
        const url = `${location.protocol}//${location.host}/${href}`
        if (!this._isElectron) {
          /* eslint-disable*/
          window.open('javascript:window.name;', `<script>location.replace("${url}")<\/script>`)
        } else {
          this.$app.ipcRenderer.send('open-window', { name: route.name, url, ...this.to.window })
        }        
      } else if (this.type === 'external') {
        this.$app.shell.openExternal(this.to)
      }
    }
  }
}
</script>

<style lang="scss">
.r-btn {
  cursor: pointer;
  border-style: none;
  display: inline-flex;
  background-color: transparent !important;
  font: inherit;
  position: relative;
  vertical-align: middle;
  will-change: box-shadow;
  user-select: none;
  outline: 0;
  flex: 0 1 auto;
  font-size: 14px;
  height: 36px;
  align-items: center;
  -webkit-box-align: center;
  -webkit-app-region: no-drag;

  &:before {
    border-radius: inherit;
    color: inherit;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    opacity: .12;
    transition: .3s cubic-bezier(.25, .8, .5, 1);
    width: 100%;
  }
}
</style>
