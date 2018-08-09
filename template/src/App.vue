<template>
  <div :class="[skin+'-skin']">
    <div class="sticky-top navbar navbar-expand-md navbar-light bg-light border-bottom shadow-sm">
      <a href="#" class="navbar-brand">
        <img src="./assets/logo.png" style="height:2rem" class="align-top" alt="logo">
        template-mini
      </a>
      <small class="navbar-text loading">loading:\{{loadNum}}</small>
      <div class="navbar-collapse justify-content-end">
        <nav class="nav justify-content-center">
          <router-link class="nav-link" to="/Youke">游客</router-link>
          <router-link class="nav-link" to="/Logined">git仓库</router-link>
          <router-link class="nav-link" to="/Admin">其他</router-link>
        </nav>
        <nav class="nav justify-content-center">
          <span class="btn btn-sm btn-outline-primary mx-2" @click="tabskin">换肤</span>
          <span class="btn btn-sm btn-outline-primary" v-if="$store.state.userInf" @click="toLoginOut">退出</span>
          <router-link class="btn btn-sm btn-outline-primary" v-else :to="loginRouter">登录</router-link>
        </nav>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-3 col-xl-2" id="asider">
          <h-asider></h-asider>
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
#asider{
  @include media-breakpoint-up(md) {
    $header-h: calc(3.625rem + 1px);//必须准确的计算出md的头部高度
    position: sticky;
    z-index: var(--breakpoint-xl);
    height: calc(100vh - #{$header-h});
    top: $header-h;
    overflow: hidden;
  }
}
</style>
