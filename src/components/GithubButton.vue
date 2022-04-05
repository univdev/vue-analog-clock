<style lang="less" scoped>
.github-button {
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 8px;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 24px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>

<template lang="pug">
button.github-button(
  :type="type"
  @click="onClick") Github
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<'button' | 'submit'>,
      required: false,
      default: 'button',
    },
  },
  setup(props, { emit }) {
    const onClick = (event) => {
      emit('click', event);
    };
    return { onClick };
  },
});
</script>
