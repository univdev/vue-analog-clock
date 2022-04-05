<style lang="less" scoped>
.clock {
  width: 500px;
  height: 500px;
  border: 4px solid #000;
  border-radius: 50%;
  position: relative;
  .clock-hand {
    position: absolute;
    right: 50%;
    top: 50%;
  }
  .center {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: #000;
    position: absolute;
    z-index: 10;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
  }
}
</style>

<template lang="pug">
.clock
  clock-hand.clock-hand(
    type="hours"
    :value="hours")
  clock-hand.clock-hand(
    type="minutes"
    :value="minutes")
  clock-hand.clock-hand(
    type="seconds"
    :value="seconds")
  .center
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import ClockHand from './ClockHand.vue';

export default defineComponent({
  components: {
    ClockHand,
  },
  props: {
    date: {
      type: Object as PropType<Date>,
      required: false,
      default: null,
    },
  },
  setup(props) {
    const hours = computed(() => props.date ? props.date.getHours() : 0);
    const minutes = computed(() => props.date ? props.date.getMinutes() : 0);
    const seconds = computed(() => props.date ? props.date.getSeconds() : 0);
    return { hours, minutes, seconds };
  },
});
</script>

