import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import TestManager from '@/pages/TestManager'
import User from '@/pages/User'
import TextManger from '@/pages/TextManger'
import Article from '@/pages/Article'
import Category from '@/pages/Category'






Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
      component: HelloWorld
    },{
      path:'/User',
      component:User
    },{
      path:'/TextManger',
      component:TextManger
    },{
      path:'/Article',
      component:Article
    },{
        path:'/Category',
        component:Category
    }

  ]
})
