import Vue from 'vue'
import Router from 'vue-router'
import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserShow from '@/components/User/ShowUser'
import UserCreate from '@/components/User/CreateUser'
import Userlogin from '@/components/Login'

import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogEdit from '@/components/Blogs/EditBlog'
import BlogIndex from '@/components/Blogs/Index'
import BlogShow from '@/components/Blogs/ShowBlog'

import Upload from '@/components/Utile/Upload'
Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/users/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/login',
      name: 'login',
      component: Userlogin
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blog-create',
      component: BlogCreate
    },
    {
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog-show',
      component: BlogShow
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    }

  ]
})
