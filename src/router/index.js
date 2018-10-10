import Vue from 'vue'
import Router from 'vue-router'
import Station from '@/components/Station'
import Music from '@/components/Music'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Station',
      component: Station
    },{
      path:'/Music/:configid/:admin',
      name:'Music',
      component : Music
    },{
      path:'/Music/:configid/',
      name:'Music',
      component : Music
    }
  ]
})
