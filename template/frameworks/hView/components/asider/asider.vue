<template>
	<div class="asider-style h-100 text-light pb-4">
		<hh-ul v-clickoutside="clearInterest" ref="asider" :leftLevel="leftLevel" :look="look" :ul="$router.options.routes.filter(item=>item.component&&item.meta.tag!='login')"></hh-ul>
	</div>
</template>

<script>
import Vue from 'vue'
import ul from './ul'
import li from './li'
import clickoutside from '../../directives/clickoutside'
export default {
  data(){
    return{
      look:true
    }
  },
  props:{
    leftLevel: {
      type: Number,
      default: () => 1
    }
  },
  directives:{
    clickoutside
  },
	created(){
		Vue.component('hh-ul', ul)
		Vue.component('hh-li', li)
	},
  methods:{
    clearInterest(){
      this.$refs.asider.getInterest('')
    }
  }
};
</script>

<style lang="scss">
.asider-style {
  $asider-bg: #181f24;
  $nav-bg-1: #181f24;
  $nav-bg-2: #181f24;
  $nav-bg-3: #181f24;
  $hover-bg: #2c3942;

  width:200px;
  background-color: $asider-bg;
  @include scroll(6px, false, $asider-bg);
  font-family: "Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;

  .nav {
    flex-direction: column;
    background-color: $nav-bg-1;
    .nav {
      background-color: $nav-bg-2;
      .nav {
        background-color: $nav-bg-3;
      }
    }
    &.right{
      width: 100%;
      position: absolute;
      left: 100%;
      top: 0;
    }
  }
  a {
    transition: background-color 0.3s ease-in-out 0s;
    color: #8ca1af !important;
    &:hover,
    &.router-link-active {
      color: #fff !important;
      background-color: $hover-bg;
    }
    &.router-child-active {
      color: darken(#fff,15%) !important;
      background-color: darken($hover-bg,15%);
    }
  }
}
</style>
