const mutations = {
  ADD_USER(state, payload) {
    state.user = payload;
  },

  FETCH_USER(state, payload) {
    state.userData = payload;
  }
}


export default mutations;