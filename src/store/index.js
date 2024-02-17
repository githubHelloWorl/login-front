import { createStore } from "vuex";

export default createStore({
  state: {
    type: "",
  },
  getters: {
    getType(state) {
      return state.type;
    },
  },
  mutations: {
    setType(state, value) {
      state.type = value;
    },
  },
  actions: {
    setType(context, value) {
      context.commit("setType", value);
    },
  },
  modules: {},
});
