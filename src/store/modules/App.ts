export type State = {
  time: Date,
};

export const state: () => State = () => ({
  time: null,
});

export const mutations = {
  SET_TIME: (state: State, time: Date) => {
    state.time = time;
  },
};

export const getters = {
  GET_HOURS: (state: State) => {
    return state.time ? state.time.getHours() : 24;
  },
  GET_MINUTES: (state: State) => {
    return state.time ? state.time.getMinutes() : 0;
  },
  GET_SECONDS: (state: State) => {
    return state.time ? state.time.getSeconds() : 0;
  },
  GET_YYYYMMDD: (state: State) => {
    if (!state.time) return null;
    const year = state.time.getFullYear();
    const month = (state.time.getMonth() + 1).toString().padStart(2, '0');
    const date = (state.time.getDate()).toString().padStart(2, '0');
    return [year, month, date].join('-');
  },
};

export default {
  state,
  mutations,
  getters,
}