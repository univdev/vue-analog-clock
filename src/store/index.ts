import { createStore } from 'vuex';
import AppModule, { State as AppState } from './modules/App';

export interface RootState {
  app: AppState,
};

export default createStore({
  modules: {
    app: AppModule,
  },
});