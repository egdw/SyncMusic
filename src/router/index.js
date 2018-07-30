import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Station from '@/components/Station'
import Music from '@/components/Music'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Station',
      component: Station
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },{
      path:'/Music/:configid',
      name:'Music',
      component : Music
    }
  ]
})
