import Vue from 'vue';
import Vuex from 'vuex';
import geo from './modules/geo';
import home from './modules/home';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    async nuxtServerInit({commit}, {req, app}) {
      //获取城市定位
      const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition');
      commit('geo/setPosition', status ===200 ? {city, province} : {city: '', province: ''});
      // 获取菜单
      const {status: MenuStatus , data: {menu}} = await app.$axios.get('/geo/menu');
      commit('home/setMenu', MenuStatus === 200 ? menu : []);
    }
  }
})

export default store;
