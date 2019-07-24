<template>
  <nav :class="classes">
    <div>
      <section style="background-image: url(static/image/logo.png);" />
      <RouteButton to="/">
        Home
      </RouteButton>
      <RouteButton to="/httpDemo">
        HttpDemo
      </RouteButton>
      <RouteButton to="/task/list">
        TaskList
      </RouteButton>
      <RouteButton to="/404">
        404
      </RouteButton>
    </div>
    <div v-if="_isElectron" class="is-pulled-right">
      <Icon type="close" size="24" @click="closeWindow" />
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from '../widgets/Icon'
import RouteButton from '../widgets/RouteButton'

export default {
  name: 'AppHeader',

  components: {
    Icon,
    RouteButton
  },

  computed: {
    ...mapGetters({
      _trace: '_trace'
    }),
    classes () {
      return [
        'app-header',
        'animated',
        {
          slideInDown: !this._trace.inLandpage
        }
      ]
    }
  },

  methods: {
    minimizeWindow () {
      this.$app.remote.getCurrentWindow().minimize()
    },
    closeWindow () {
      this.$app.remote.getCurrentWindow().close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/style/mixins.scss';

.app-header {
  @include dragable;
  height: 2.5rem;
  background-color: white;
  position: relative;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, .1);
  display: none;
  flex: 1 1 auto;
  justify-content: space-between;
  -webkit-user-select: none;
  -webkit-app-region: drag;

  &.slideInDown {
    display: flex;
  }

  > div {
    @include undragable;
    padding: 0 .5rem;
    display: flex;
    align-items: center;

    section {
      display: flex;
      width: 2.5rem;
      height: 2.5rem;
      padding: .5rem;
      background-repeat: no-repeat;
      background-size: 100%;

      &:hover {
        cursor: pointer;
      }
    }

    .r-btn {
      line-height: 1.5;
      padding: .5rem;
      position: relative;
      display: flex;
      align-items: center;
      -webkit-app-region: no-drag;

      &:hover {
        background-color: #d7dbde;
      }
    }
  }
}
</style>
