import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/ticket',
    name: 'Atendimento Inicial',
    component: () => import('../views/Ticket.vue'),
  },
  {
    path: '/triagem',
    name: 'Chamada para Triagem',
    component: () => import('../views/Chamada/Triagem.vue'),
  },
  {
    path: '/enfermeiro',
    name: 'Atendimento de Triagem',
    component: () => import('../views/Enfermeiro.vue'),
  },
  {
    path: '/recepcao',
    name: 'Atendimento Recepção',
    component: () => import('../views/Atendimento/Recepcao.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
