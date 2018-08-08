<template>
  <div :class="['h-100 d-flex flex-column',skin+'-skin']">
    <div class="navbar navbar-expand-md navbar-light bg-light">
      <a href="#" class="navbar-brand">
        <img src="./assets/logo.png" width="30" height="30" class="align-top" alt="logo">
        template-mini
      </a>
      <small class="navbar-text loading">loading:\{{loadNum}}</small>
      <div class="navbar-collapse justify-content-end">
        <nav class="nav justify-content-center">
          <router-link class="nav-link py-1 px-2" to="/Youke">游客</router-link>
          <router-link class="nav-link py-1 px-2" to="/Logined">git仓库</router-link>
          <router-link class="nav-link py-1 px-2" to="/Admin">其他</router-link>
        </nav>
        <nav class="nav justify-content-center">
          <span class="btn btn-sm btn-outline-primary mx-2" @click="tabskin">换肤</span>
          <span class="btn btn-sm btn-outline-primary" v-if="$store.state.userInf" @click="toLoginOut">退出</span>
          <router-link class="btn btn-sm btn-outline-primary" v-else :to="loginRouter">登录</router-link>
        </nav>
      </div>
    </div>
    <div class="container-fluid flex-fill">
      <div class="row">
        <div class="col-12 col-md-3 col-xl-2">
          aside
        </div>
        <div class="col-12 col-md-9 col-xl-10">
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
</style>
