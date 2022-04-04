<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>

<template lang="pug">
.container
  clock-component(
    :date="current")
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import ClockComponent from './components/Clock.vue';

export default defineComponent({
  components: {
    ClockComponent,
  },
  setup() {
    const store = useStore();
    const second = 1000;
    const current: ComputedRef<Date> = computed(() => store.state.app.time);
    const initializeCurrentTime = () => {
      const date = new Date();
      store.commit('app/SET_TIME', date);
    };
    let setStartTimer = null;
    onBeforeMount(() => {
      initializeCurrentTime();
      setStartTimer = window.setInterval(initializeCurrentTime, second);
    });
    onBeforeUnmount(() => {
      window.clearInterval(setStartTimer);
    });
    return {
      current,
    };
  },
});
</script>
