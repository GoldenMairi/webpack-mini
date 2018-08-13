<template>
  <div :class="[skin+'-skin h-100 d-flex flex-column']">
    <div class="flex-shrink-0 navbar navbar-expand-md navbar-light bg-light border-bottom shadow-sm">
      <a href="#" class="navbar-brand">
        <img src="./assets/logo.png" style="height:2rem" class="align-top" alt="logo">
        template-mini
      </a>
      <small class="navbar-text loading">loading:\{{loadNum}}</small>
      <div class="navbar-collapse justify-content-end">
        <nav class="nav justify-content-center">
          <span class="btn btn-sm btn-outline-primary mx-2" @click="tabskin">换肤</span>
          <span class="btn btn-sm btn-outline-primary" v-if="$store.state.userInf" @click="toLoginOut">退出</span>
          <router-link class="btn btn-sm btn-outline-primary" v-else :to="loginRouter">登录</router-link>
        </nav>
      </div>
    </div>
    <div class="flex-fill d-flex">
      <div id="asider-nav">
        <h-asider :leftLevel="1" class="flex-shrink-0"></h-asider>
      </div>
      <div class="flex-fill d-flex flex-column">
        <ul class="flex-shrink-0 breadcrumb mb-0 rounded-0 bg-dark text-light">
          <li v-for="p in $route.matched" :key="p.path" class="breadcrumb-item">\{{p.meta&&p.meta.name?p.meta.name:p.path.split('/').pop()}}</li>
        </ul>
        <div class="flex-fill" style="overflow: auto;">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN_OUT } from '@/store/types'
import { LOGIN_ROUTER } from '@/router'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      skin: 'blue',
      show: false,
      loginRouter: LOGIN_ROUTER
    }
  },
  computed: {
    loadNum () {
      return this.$store.state.loadNum
    }
  },
  methods: {
    ...mapActions([LOGIN_OUT]),
    tabskin () {
      this.skin = this.skin == 'blue' ? 'purple' : 'blue'
    },
    toLoginOut () {
      this.loginOut().then(res => {
        if (
          this.$router.currentRoute.matched.some(
            r => r.meta.loginCheck && !r.meta.loginCheck(null)
          )
        ) {
          this.$router.push(LOGIN_ROUTER)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.loading {
  @include skin(c, var(--orange) var(--purple));
}
#asider-nav{
  z-index: $zindex-tooltip;
}
</style>
