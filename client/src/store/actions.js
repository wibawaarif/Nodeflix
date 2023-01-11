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

  async fetchUser({ commit }) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('MqmK0vCX0rJWbwzrV8bT5hGCpH8O5R8Sr93a')
      try {
        axios.get(`/api/v1/user/${token}`)
          .then(res => {
            commit('FETCH_USER', res.data)
            resolve()
          }
            )
      } catch (error) {
        reject(error)
        console.log(error)
      }
    })
  }
}


export default actions ;