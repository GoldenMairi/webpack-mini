<template>
  <div id="app">
    <p>loadNum:\{{loadNum}}</p>
    <div v-if="this.$router.currentRoute.name!='HelloWorld'">
      <router-link v-if="!$store.state.userInf" to="/HelloWorld">登录</router-link>
      <a v-else @click="toLoginOut">退出</a>
    </div>
    <ul>
      <router-link tag="li" to="/Youke"><a>游客可进</a></router-link>
      <router-link tag="li" to="/Logined"><a>登录可进</a></router-link>
      <router-link tag="li" to="/Admin"><a>管理可进</a></router-link>
    </ul>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import { LOGIN_OUT } from '@/store/types'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  computed: {
    loadNum () {
      return this.$store.state.loadNum
    }
  },
  methods: {
    ...mapActions([LOGIN_OUT]),
    toLoginOut () {
      this.loginOut()
      if (this.$router.currentRoute.meta.loginCheck) {
        this.$router.push('/HelloWorld')
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
}
</style>
