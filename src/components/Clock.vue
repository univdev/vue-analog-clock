<style lang="less" scoped>
.clock {
  width: 500px;
  height: 500px;
  border: 4px solid #000;
  border-radius: 50%;
  position: relative;
  .tooltip {
    position: absolute;
    z-index: 10;
    transform: translate(10px, -100%);
    white-space: nowrap;
  }
  .clock-hand {
    position: absolute;
    z-index: 5;
    right: 50%;
    top: 50%;
    pointer-events: none;
  }
  &::before {
    content: '';
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
  .line {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    width: 100%;
    height: 1px;
    background-color: black;
    pointer-events: none;
    z-index: 1;
    &--active {
      height: 2px;
      background-color: black;
      z-index: 3;
    }
  }
  .circle {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    width: 95%;
    height: 95%;
    background-color: white;
    border-radius: 50%;
    z-index: 2;
    pointer-events: none;
    &--long-line {
      width: 90%;
      height: 90%;
      z-index: 4;
    }
  }
}
</style>

<template lang="pug">
.clock(ref="clock")
  tooltip.tooltip(
    :visible="tooltip.visible"
    :style="tooltipStyle")
    slot(name="tooltip")
  clock-hand.clock-hand(
    type="hours"
    :value="hours"
    :reference="minutes")
  clock-hand.clock-hand(
    type="minutes"
    :value="minutes"
    :reference="seconds")
  clock-hand.clock-hand(
    type="seconds"
    :value="seconds")
  .line(
    v-for="index of 5 * 12"
    :key="index"
    :class="{ 'line--active': index % 5 === 0 }"
    :style="{ transform: `translate(50%, -50%) rotate(${columnDegree * index}deg)` }")
  .circle.circle--short-line
  .circle.circle--long-line
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, reactive, ref, watch } from 'vue';
import ClockHand from './ClockHand.vue';
import Tooltip from './Tooltip.vue';

interface Tooltip {
  visible: Boolean,
  x: Number,
  y: Number,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
  onMouseMove: (event: any) => void
};

const Clock = defineComponent({
  components: {
    ClockHand,
    Tooltip,
  },
  props: {
    date: {
      type: Date as PropType<Date>,
      required: false,
      default: null,
    },
    enableTooltip: {
      type: Boolean as PropType<Boolean>,
      required: false,
      default: true,
    },
  },
  setup(props) {
    const clock = ref<InstanceType<typeof Clock>>();
    const hours = computed(() => props.date ? props.date.getHours() : 0);
    const minutes = computed(() => props.date ? props.date.getMinutes() : 0);
    const seconds = computed(() => props.date ? props.date.getSeconds() : 0);
    const tooltip: Tooltip = reactive({
      visible: false,
      x: 0,
      y: 0,
      onMouseEnter: () => {
        onToggleTooltip();
      },
      onMouseLeave: () => {
        onToggleTooltip();
      },
      onMouseMove: (event: any) => {
        const { layerX, layerY } = event;
        tooltip.x = layerX;
        tooltip.y = layerY;
      },
    });
    const tooltipStyle = computed(() => ({ left: `${tooltip.x}px`, top: `${tooltip.y}px` }));
    const onToggleTooltip = () => {
      tooltip.visible = !tooltip.visible;
    };
    const columnDegree = 360 / (5 * 12);
    onMounted(() => {
      clock.value.addEventListener('mouseenter', tooltip.onMouseEnter);
      clock.value.addEventListener('mouseleave', tooltip.onMouseLeave);
      clock.value.addEventListener('mousemove', tooltip.onMouseMove);
    });
    onBeforeUnmount(() => {
      clock.value.removeEventListener('mouseenter', tooltip.onMouseEnter);
      clock.value.removeEventListener('mouseleave', tooltip.onMouseLeave);
      clock.value.removeEventListener('mousemove', tooltip.onMouseMove);
    });
    return {
      clock,
      hours,
      minutes,
      seconds,
      columnDegree,
      tooltip,
      tooltipStyle,
    };
  },
});
export default Clock;
</script>

