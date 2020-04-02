const state = () => ({
  location: [100, 100]
})

const mutations = {
  setLocation(state, val) {
    state.location = val
  }
}

const actions = {
  setLocation: ({ commit }, location) => {
    commit('setLocation', location)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
