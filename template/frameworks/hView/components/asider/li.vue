<template>
    <li>
        <component @click="self=!self" v-bind:is="li.children?'a':'router-link'" class="nav-link" :to="prefix + li.path">
            <i class="mr-2 ic" :class="li.meta&&li.meta.icon?li.meta.icon:'ic-right'"></i>
            <i v-if="li.children" class="ic ic-unfold float-right text-muted"></i>
            <i v-if="li.meta&&li.meta.badge" class="badge float-right mt-1" :class="['badge-'+(li.meta.badge.theme||'primary')]">35</i>
            <span>\{{li.meta&&li.meta.name?li.meta.name:li.path.replace(/\//, '')}}</span>
        </component>
        <hh-ul v-if="li.children" v-show="visible" :ul="li.children" :prefix="prefix + li.path" :level="level+1" :father="visible"></hh-ul>
    </li>
</template>

<script>
const honourLevel = 1;
export default {
  data() {
    return {
      self: false
    };
  },
  props: {
    li: {},
    prefix: {
      type: String,
      default: () => ""
    },
    level: {
      type: Number,
      default: () => 1
    },
    father: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    visible() {
      if (!this.father && this.self) {
        this.self = false;
      }
      return this.level <= this.honourLevel || (this.father && this.self);
    }
  }
};
</script>
