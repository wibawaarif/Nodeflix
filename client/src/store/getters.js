const getters = {
  getUsers: state =>  {
    return state.user;
  },

  fetchUser: state => {
    return state.userData;
  }
}


export default getters;