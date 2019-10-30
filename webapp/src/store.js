import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const mutations = {
  login: function(state) {
    state.loginState = { ...state.loginState, loggedIn: true };
  },
  logout: function(state) {
    state.loginState = { ...state.loginState, loggedIn: false };
  },
  addTopic: function(state, topic) {
    state.topics = [...state.topics, { ...topic }];
  },
  topicsLoaded: function(state, topics) {
    state.topics = topics;
  },
  questionsLoaded: function(state, questions) {
    state.questions = questions;
  }
};

export const actions = {
  login: function({ commit }, payload) {
    const { email, password } = payload;
    return axios.post("/api/login", { email, password }).then(() => {
      commit("login");
    });
  },
  logout: function({ commit }) {
    return axios.get("/api/logout").then(() => {
      commit("logout");
    });
  },
  addTopic({ commit }, topic) {
    return axios.post("/api/topics", topic).then(response => {
      commit("addTopic", response.data);
    });
  },
  loadTopics({ commit }) {
    return axios.get("/api/topics").then(response => {
      commit("topicsLoaded", response.data);
    });
  },
  loadQuesitons({ commit }) {
    return axios.get("api/questions").then(response => {
      commit("questionsLoaded", response.data);
    });
  }
};

export default new Vuex.Store({
  state: {
    loginState: {
      loggedIn: false
    }
  },
  mutations,
  actions
});
