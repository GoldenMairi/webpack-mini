<template>
	<div class="asider-style h-100 text-light pb-4" style="overflow-y:auto">
		<hh-ul :ul="$router.options.routes.filter(item=>item.component&&item.meta.tag!='login')"></hh-ul>
	</div>
</template>

<script>
import Vue from 'vue'
import ul from './ul'
import li from './li'
export default {
	created(){
		Vue.component('hh-ul', ul)
		Vue.component('hh-li', li)
	}
};
</script>

<style lang="scss">
.asider-style {
  $asider-bg: #181f24;
  $nav-bg-1: #181f24;
  $nav-bg-2: #181f24;
  $nav-bg-3: #0d1215;
  $hover-bg: #2c3942;

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
  }
  a {
    transition: background-color 0.3s ease-in-out 0s;
    color: #8ca1af !important;
    &:hover,
    &.router-link-active {
      color: #fff !important;
      background-color: $hover-bg;
    }
  }
}
</style>
