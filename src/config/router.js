import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Stocks from '@/components/template/Stock'
import Operations from '@/components/template/Operation'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages
    },
    {
        name: 'stocks',
        path: '/stocks',
        component: Stocks
    },
    {
        name: 'operations',
        path: '/operations',
        component: Operations
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})