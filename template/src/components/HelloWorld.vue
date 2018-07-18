<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
    <h3 @click="uptime(new Date)">\{{ lastime }}</h3>
    <h3 @click="login">登录</h3>
    <h3 @click="getUserInf">获取用户信息</h3>
    <h3 @click="loginOut">退出</h3>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {UPTIME} from '@/store/types'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    ...mapState(['lastime'])
  },
  methods:{
    ...mapMutations([UPTIME]),
    login () {
      this.axios('LOGIN', {
        userName: 'admin',
        password: '5a385be37520b62af6cfccfa440485b7'
      }).then(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    },
    getUserInf () {
      this.axios('USER_INF', {
        token: '6498f13a00984979aadc5c0173867a72'
      }).then(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    },
    loginOut () {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 ,h3{
  font-weight: normal;
}
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
</style>
