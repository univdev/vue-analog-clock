<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  .github-button-link {
    position: fixed;
    right: 20px;
    bottom: 20px;
    text-decoration: none;
  }
}
</style>

<template lang="pug">
.container
  clock-component(
    :date="current")
    template(#tooltip) {{ date }}
  a.github-button-link(
    href="https://github.com/univdev/vue-analog-clock"
    target="_blank")
    github-button.github-button.animate__animated.animate__fadeInUp
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import ClockComponent from './components/Clock.vue';
import GithubButton from './components/GithubButton.vue';

export default defineComponent({
  components: {
    ClockComponent,
    GithubButton,
  },
  setup() {
    const store = useStore();
    const second = 1000;
    const current: ComputedRef<Date> = computed(() => store.state.app.time);
    const date: ComputedRef<string> = computed(() => {
      const yyyymmdd = store.getters['app/GET_YYYYMMDD'];
      const hhmmss = store.getters['app/GET_HHMMSS'];
      return `${yyyymmdd} ${hhmmss}`;
    });
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
      date,
    };
  },
});
</script>
