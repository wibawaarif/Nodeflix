import axios from '@/axios.js'

const actions = {
  async registerUser({ commit }, payload) {
    try {
      const data = 
      axios.post(
        "/register", payload
      );
      commit("ADD_USER", data.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },

  async loginUser({ commit }, payload) {
    try {
      const data = 
      await axios.post(
        "/register", payload
      );
      commit("ADD_USER", data.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  },
}


export default actions ;