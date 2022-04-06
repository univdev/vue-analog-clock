<style lang="less" scoped>
.tooltip {
  border-radius: 4px;
  font-size: 14px;
  color: white;
  padding: 4px 8px;
  background-color: black;
}
</style>

<template lang="pug">
.tooltip(
  v-if="visible")
  slot
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    visible: {
      type: Boolean as PropType<Boolean>,
      required: false,
      default: false,
    },
  },
});
</script>
