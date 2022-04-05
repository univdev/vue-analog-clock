<style lang="less" scoped>
.clock-hand {
  transform-origin: bottom;
  background-color: #000;
  width: 2px;
  height: 200px;
  transform: translate(-50%, -100%) rotate(0);
  &--hours {
    width: 6px;
    height: 150px;
  }
  &--seconds {
    width: 1px;
    background-color: red;
  }
}
</style>

<template lang="pug">
.clock-hand(
  :class="classList"
  :style="{ transform: `translate(-50%, -100%) rotate(${degree}deg)` }")
</template>

<script lang="ts">
import { computed, PropType, ComputedRef, defineComponent } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<'hours' | 'minutes' | 'seconds'>,
      required: false,
      default: 'hours',
    },
    value: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },
    reference: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },
  },
  setup(props) {
    const maxOfReference: number = 60; // 레퍼런스는 무조건 분침, 초침이기 때문에 60 고정
    const max: ComputedRef<number> = computed(() => props.type === 'hours' ? 12 : 60);
    const degreeOfPiece: number = 360 / max.value;
    const degreeOfReference: ComputedRef<number> = computed(() => props.reference / maxOfReference * degreeOfPiece);
    const degree: ComputedRef<number> = computed(() => ((props.value / max.value * 360) + degreeOfReference.value));
    const classList: Object = {
      'clock-hand--hours': props.type === 'hours',
      'clock-hand--minutes': props.type === 'minutes',
      'clock-hand--seconds': props.type === 'seconds',
    };
    return {
      max,
      degree,
      classList,
    };
  },
});
</script>
