export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/subscription',
    name: 'subscription',
    component: () => import('@/views/SubscriptionView.vue'),
  },
  {
    path: '/codex-help',
    name: 'codex-help',
    component: () => import('@/views/CodexHelpView.vue'),
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('@/views/SkillsView.vue'),
  },
  {
    path: '/skills-list',
    name: 'skills-list',
    component: () => import('@/views/SkillsListView.vue'),
  },
  {
    path: '/image-creation',
    name: 'image-creation',
    component: () => import('@/views/ImageCreationView.vue'),
  },
  {
    path: '/image-setting',
    name: 'image-setting',
    component: () => import('@/views/ImageSettingView.vue'),
  },
  {
    path: '/enterprise-service',
    name: 'enterprise-service',
    component: () => import('@/views/EnterpriseServiceView.vue'),
  },
  {
    path: '/free-trial',
    name: 'free-trial',
    component: () => import('@/views/FreeTrialView.vue'),
  },
]
