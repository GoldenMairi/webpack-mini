<template>
    <li @click.stop="putInterest" class="position-relative">
        <component @click="nextLook=right?nextLook:!nextLook" v-bind:is="li.children?'a':'router-link'" class="nav-link" :class="{'router-child-active':childActive}" :to="thisPath">
            <i class="mr-2 ic" :class="li.meta&&li.meta.icon?li.meta.icon:'ic-right'"></i>
            <i v-if="li.meta&&li.meta.badge" class="float-right mt-1 badge" :class="['badge-'+(li.meta.badge.theme||'primary')]">35</i>
            <i v-if="li.children&&!right" class="ic float-right text-muted" :class="[nextLook?'ic-unfold':'ic-left']"></i>
            <span>{{li.meta&&li.meta.name?li.meta.name:li.path.replace(/\//, '')}}</span>
        </component>
        <hh-ul :class="{right}" v-if="li.children" :ul="li.children" :prefix="prefix + li.path" :leftLevel="leftLevel" :level="level+1" :look="nextLook"></hh-ul>
    </li>
</template>

<script>
export default {
  components: {
    'hh-ul': () => import("./ul")
  },
  data() {
    return {
      nextLook: false
    };
  },
  props: {
    li: {},
    prefix: {
      type: String,
      default: () => ""
    },
    leftLevel: {
      type: Number,
      default: () => 1
    },
    level: {
      type: Number,
      default: () => 1
    },
    preLook: {
      type: Boolean,
      default: () => true
    },
    interest :{
      type: String,
      default: ()=> ""
    }
  },
  computed: {
    right() {
      return this.level>this.leftLevel;
    },
    thisPath() {
      return this.prefix + this.li.path;
    },
    childActive() {
      return (
        this.$route.path.indexOf(this.thisPath) === 0 &&
        this.$route.path !== this.thisPath
      );
    }
  },
  methods:{
    putInterest(){
      this.$emit('putInterest', this.li.path)
    }
  },
  watch:{
    preLook(now){
      if(!now)this.nextLook = false
    },
    interest(now){
      if(now!=this.li.path)this.nextLook = false
    }
  }
};
</script>
