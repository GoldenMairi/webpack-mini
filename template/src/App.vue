<template>
  <div :class="skin+'-skin'">
    <div id="app">
      <p>loadNum:\{{loadNum}}|<span @click="tabskin">换肤</span></p>
      <div v-if="$router.currentRoute.path!=loginRouter">
        <router-link v-if="!$store.state.userInf" :to="loginRouter">登录</router-link>
        <a v-else @click="toLoginOut">退出</a>
      </div>
      <div class="container">
        <div class="row">
          <router-link class="col-sm-4" to="/Youke"><a>游客可进</a></router-link>
          <router-link class="col-sm-4" to="/Logined"><a>git仓库（需登录）</a></router-link>
          <router-link class="col-sm-4" to="/Admin"><a>其他（需登录）</a></router-link>
        </div>
      </div>
      <img src="./assets/logo.png">
      <router-view/>
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
#app {
    text-align: center;
    @include skin(c, var(--orange) var(--info));
    margin-top: 60px;
}
</style>
