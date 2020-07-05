import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Recommend = resovle => {
  import('components/recommend/recommend').then(module => {
    resovle(module)
  })
}
const Singer = resovle => {
  import('components/singer/singer').then(module => {
    resovle(module)
  })
}
const Rank = resovle => {
  import('components/rank/rank').then(module => {
    resovle(module)
  })
}
const Search = resovle => {
  import('components/search/search').then(module => {
    resovle(module)
  })
}
const SingerDetail = resovle => {
  import('components/singer-detail/singer-detail').then(module => {
    resovle(module)
  })
}
const Disc = resovle => {
  import('components/disc/disc').then(module => {
    resovle(module)
  })
}
const TopList = resovle => {
  import('components/top-list/top-list').then(module => {
    resovle(module)
  })
}
const UserCenter = resovle => {
  import('components/user-center/user-center').then(module => {
    resovle(module)
  })
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Disc
      }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: ':id',
        component: TopList
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/user',
    component: UserCenter
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
