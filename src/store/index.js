import Vue from 'vue';
import Vuex from 'Vuex';
import count from './modules/count';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    count,
  }
});
