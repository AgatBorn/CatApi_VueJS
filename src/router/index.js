import { createRouter, createWebHashHistory } from 'vue-router';
import CatVotesView from '@/views/CatVotesView.vue';
import BreedsView from '@/views/BreedsView.vue';
import BreedsDetailsView from '@/views/BreedDetailsView.vue';
import SearchView from '@/views/SearchView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: CatVotesView
  },
  {
    path: '/breeds',
    name: 'breeds',
    component: BreedsView
  },
  {
    path: '/breeds/:breedId',
    name: 'breedDetails',
    component: BreedsDetailsView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
