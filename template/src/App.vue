<template>
  <div :class="[skin+'-skin','d-flex flex-column']">
    <div class="d-flex flex-column flex-md-row align-items-center p-2 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto title-name">template-mini
        <small>loadNum:\{{loadNum}}</small>
      </h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <router-link class="p-2 text-dark" to="/Youke">游客</router-link>
        <router-link class="p-2 text-dark" to="/Logined">git仓库</router-link>
        <router-link class="p-2 text-dark" to="/Admin">其他</router-link>
        <a class="p-2 text-green" href="#" @click="tabskin">换肤</a>
      </nav>
      <router-link class="btn btn-outline-primary" v-if="!$store.state.userInf" :to="loginRouter">登录</router-link>
      <a href="#" class="btn btn-outline-primary" v-else @click="toLoginOut">退出</a>
    </div>
    <router-view class="flex-grow-1" />
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
        if (this.$router.currentRoute.matched.some(r => r.meta.loginCheck && !r.meta.loginCheck(null))) {
          this.$router.push(LOGIN_ROUTER)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.title-name {
    @include skin(c, var(--orange) var(--purple));
}
</style>
