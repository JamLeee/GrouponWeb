import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'
import map from './modules/map'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      geo,
      home,
      map
    },
    actions: {
      async nuxtServerInit({ commit }, { req, app }) {
        //请求接口获取位置，（当前只能拿到app实例)
        const {
          status,
          data: { province, city }
        } = await app.$axios.get('/geo/getPosition')
        //console.log(province, city)
        //利用vuex做提交
        commit(
          'geo/setPosition',
          status === 200 ? { city, province } : { city: '', province: '' }
        )
        const {
          status: status2,
          data: { menu }
        } = await app.$axios.get('geo/menu')
        commit('home/setMenu', status2 === 200 ? menu : [])
        const {
          status: status3,
          data: { result }
        } = await app.$axios.get('/search/hotPlace', {
          params: {
            city: app.store.state.geo.position.city.replace('市', '')
          }
        })
        commit('home/setHotPlace', status3 === 200 ? result : [])
      }
    }
  })
export default store
