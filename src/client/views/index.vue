<template>
  <div>
    <AppHeader />
    <AppMain />
    <AppFooter />
  </div>
</template>

<script>
import { AppHeader, AppMain, AppFooter } from '@comp/layout'

export default {
  name: 'Index',

  components: {
    AppHeader,
    AppMain,
    AppFooter
  }
}
</script>
