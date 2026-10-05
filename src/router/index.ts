import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import StudentListView from '@/views/StudentListView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EventEditView from '@/views/event/EditView.vue'
import EventRegisterView from '@/views/event/RegisterView.vue'
import SettingView from '@/views/SettingView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import UserListView from '@/views/UserListView.vue'
import UserLayoutView from '@/views/user/LayoutView.vue'
import UserProfileView from '@/views/user/ProfileView.vue'
import UserPostView from '@/views/user/PostView.vue'
import UserEditView from '@/views/user/EditView.vue'
import AddEventView from '@/views/event/EventFormView.vue'
import AddOrganizerView from '@/views/OrganizerFormView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import { useUserStore } from '@/stores/user'
import UserService from '@/services/UserService'
import AuctionListView from '@/views/AuctionListView.vue'
import OrganizerDetailView from '@/views/OrganizerDetail.vue'
import OrganizerListView from '@/views/OrganizerList.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login-view',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register-view',
      component: RegisterView,
    },
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({
        page: parseInt(route.query.page?.toString() || '1'),
        perPage: parseInt(route.query.perPage?.toString() || '2')
      })
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string);
        const eventStore = useEventStore()
        return EventService.getEvent(id)
        .then((response) => {
          eventStore.setEvent(response.data)
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: '404-resource-view',
              params: { resource: 'event' }
            }
          } else {
            return {
              name: 'network-error-view'
            }
          }
        })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: EventRegisterView
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EventEditView
        }
      ]
    },
    {
      path: '/user',
      name: 'user-list-view',
      component: UserListView,
      props: (route) => ({
        page: parseInt(route.query.page?.toString() || '1'),
        perPage: parseInt(route.query.perPage?.toString() || '2')
      })
    },
    {
      path: '/user/:id',
      name: 'user-layout-view',
      component: UserLayoutView,
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string);
        const userStore = useUserStore()
        return Promise.all([
          UserService.getUser(id),
          UserService.getPosts(id)
        ])
        .then(([userResponse, postsResponse]) => {
          userStore.setUser(userResponse.data)
          userStore.setPosts(postsResponse.data)
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            return {
              name: '404-resource-view',
              params: { resource: 'user' }
            }
          } else {
            return {
              name: 'network-error-view'
            }
          }
        })
      },
      children: [
        {
          path: '',
          name: 'user-profile-view',
          component: UserProfileView
        },
        {
          path: 'posts',
          name: 'user-post-view',
          component: UserPostView
        },
        {
          path: 'edit',
          name: 'user-edit-view',
          component: UserEditView
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: AddEventView,
    },
    {
      path: '/organizer',
      name: 'organizer-list-view',
      component: OrganizerListView
    },
    {
      path: '/organizer/:id',
      name: 'organizer-detail-view',
      component: OrganizerDetailView
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: AddOrganizerView,
    },
    {
      path: '/auction',
      name: 'auction-list-view',
      component: AuctionListView,
      props: (route) => ({
        page: parseInt(route.query.page?.toString() || '1'),
        perPage: parseInt(route.query.perPage?.toString() || '5')
      })
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView,
    },
    {
      path: '/students',
      name: 'student-list-view',
      component: StudentListView,
    },
    {
      path: '/setting',
      name: 'setting-view',
      component: SettingView,
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
