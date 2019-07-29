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

import FrontIndex from '@/components/Fronts/Index'
import FrontShow from '@/components/Fronts/ShowBlog'
import FrontShop from '@/components/Fronts/Books'

import BookIndex from '@/components/Books/Index'
import BookCreate from '@/components/Books/CreateBook'
import BookShow from '@/components/Books/ShowBook'
import BookEdit from '@/components/Books/EditBook'
import CartlistClient from '@/components/Fronts/Cartlist.vue'
import CartlistBack from '@/components/Books/Cartlist'

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
    },
    {
      path: '/front',
      name: 'front',
      component: FrontIndex
    },
    {
      path: '/front/:blogId',
      name: 'front-show',
      component: FrontShow
    },
    {
      path: '/books',
      name: 'books',
      component: BookIndex
    },
    {
      path: '/book/create',
      name: 'book-create',
      component: BookCreate
    },
    {
      path: '/book/:bookId',
      name: 'book-show',
      component: BookShow
    },
    {
      path: '/book/edit/:bookId',
      name: 'book-edit',
      component: BookEdit
    },
    {
      path: '/front/shop',
      name: 'shop',
      component: FrontShop
    },
    {
      path: '/front/cartlist',
      name: 'cartlistClient',
      component: CartlistClient
    },
    {
      path: '/cartlist',
      name: 'cartlistBack',
      component: CartlistBack
    },
  ]
})
