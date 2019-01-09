<template>
  <nav :class="classes">
    <div>
      <section style="background-image: url(static/image/logo.png)" />
      <RouteButton to="/">
        Home
      </RouteButton>
      <RouteButton to="/httpDemo">
        HttpDemo
      </RouteButton>
    </div>
    <div v-show="_isElectron" class="is-pulled-right">
      <i class="minimize" @click="minimizeWindow" />
      <i class="close" @click="closeWindow" />
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import RouteButton from '../widgets/RouteButton'

export default {
  name: 'AppHeader',

  components: {
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
@import "~@/style/mixins.scss";

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
    display: flex;

    i, section {
      display: flex;
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.5rem;
      background-repeat: no-repeat;
      background-size: 100%;

      &:hover {
        cursor: pointer;
      }
    }

    .minimize {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ2OTMyMzU3MDY3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM3MTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODUzLjMzMzMzMyA1OTcuMzMzMzMzIDE3MC42NjY2NjcgNTk3LjMzMzMzMyAxNzAuNjY2NjY3IDQyNi42NjY2NjcgODUzLjMzMzMzMyA0MjYuNjY2NjY3IiBwLWlkPSIzNzIwIj48L3BhdGg+PC9zdmc+);
    }

    .close {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ2OTMyMzI2NzM0IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMxNTQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTc5Ljg4OCA1MTJsMTkwLjA2NC0xOTAuMDY0YTQ4IDQ4IDAgMCAwLTY3Ljg4OC02Ny44NzJMNTEyIDQ0NC4xMTIgMzIxLjkzNiAyNTQuMDY0YTQ4IDQ4IDAgMSAwLTY3Ljg3MiA2Ny44NzJMNDQ0LjExMiA1MTIgMjU0LjA2NCA3MDIuMDY0YTQ4IDQ4IDAgMSAwIDY3Ljg3MiA2Ny44NzJMNTEyIDU3OS44ODhsMTkwLjA2NCAxOTAuMDY0YTQ4IDQ4IDAgMCAwIDY3Ljg3Mi02Ny44ODhMNTc5Ljg4OCA1MTJ6IiBmaWxsPSIiIHAtaWQ9IjMxNTUiPjwvcGF0aD48L3N2Zz4=);
    }

    .r-btn {
      line-height: 1.5;
      padding: 0.5rem;
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
