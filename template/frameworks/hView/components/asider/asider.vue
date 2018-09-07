<template>
	<div class="asider-style position-relative h-100 text-light pb-4" :class="{mini}">
		<hh-ul v-clickoutside="clearInterest" ref="asider" :leftLevel="mini?0:leftLevel" :look="look" :ul="$router.options.routes.filter(item=>item.component&&item.meta.tag!='login')"></hh-ul>
    <div @click="mini=!mini" class="asider-mini d-none position-absolute py-3 pr-3" style="left:100%;top:50%;cursor:pointer">
      <span class="px-1 py-2 rounded-right bg-dark"><i class="ic" :class="[mini?'ic-right':'ic-left']"></i></span>
    </div>
	</div>
</template>

<script>
import clickoutside from '../../directives/clickoutside'
export default {
  components: {
    'hh-ul': () => import("./ul")
  },
  data(){
    return{
      look:true,
      mini:false
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
  &.mini{
    width: 70px;
    .nav:not(.right){
      >li>a{
        overflow: hidden;
        padding: 0;
        height: 3rem;
        i.ic{
          font-size: 1.2rem;
        }
        span{
          font-size: 0.8rem;
        }
        i.ic,span{
          margin: 0!important;
          display: flex;
          justify-content:center;
          align-items: center;
          height: 100%;
          text-align: center;
          position: relative;
          top: 0;
          transition:top 0.2s;
        }
        i.badge{
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      >li>a:hover{
        i.ic,span{
          top: -100%;
        }
      }
    }
  }
  li>ul{
    width: 200px!important;
  }
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
  }
  li:hover>a,a.router-link-active,a.router-child-active{
    color: #fff !important;
    background-color: $hover-bg;
  }
  li:hover>.right{
    display: block!important;
  }
  &:hover .asider-mini{
    display: block!important;
  }
}
</style>
