<template>
  <div >
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>
<script>

import ProductManager from "./components/ProductManager.vue"
import LayoutUser from '@/layout/layoutUser.vue'

const default_layout = 'User'
export default {
  name: "App",
  components: {
    ProductManager,
    LayoutUser,

  },
  computed: {
    layout() {
      return 'Layout' + (this.$route.meta.layout || default_layout)
    }
  }
}
</script>

<style scoped>

</style>