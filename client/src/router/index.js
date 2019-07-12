import Vue from 'vue'
import Router from 'vue-router'
import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserShow from '@/components/User/ShowUser'
import UserCreate from '@/components/User/CreateUser'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/:userId',
      name: 'user-show',
      component: UserShow
    },
    {
      path: '/users/create/',
      name: 'user-create',
      component: UserCreate
    },
  ]
})
