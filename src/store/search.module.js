import { GET_SEARCH_BREEDS, GET_SEARCH_CATEGORIES, GET_SEARCH_IMAGES } from './types/actions.type';
import { SET_SEARCH_IMAGES_LOADING_STATUS, GET_SEARCH_BREEDS_SUCCESS, GET_SEARCH_CATEGORIES_SUCCESS, GET_SEARCH_IMAGES_SUCCESS } from './types/mutations.type';
import imagesService from '@/services/images.service.js';

const initialState = {
  searchBreeds: [],
  searchCategories: [],
  areSearchImagesLoading: false,
  searchImages: [],
  searchImagesCount: 0,
};

export const state = { ...initialState };

export const actions = {
  async [GET_SEARCH_BREEDS](store) {
    const breeds = await imagesService.getBreeds();
    store.commit(GET_SEARCH_BREEDS_SUCCESS, breeds.data);
  },
  async [GET_SEARCH_CATEGORIES](store) {
    const categories = await imagesService.getCategories();
    store.commit(GET_SEARCH_CATEGORIES_SUCCESS, categories.data);
  },
  async [GET_SEARCH_IMAGES](store, payload) {
    store.commit(SET_SEARCH_IMAGES_LOADING_STATUS, true);

    try {
      const imagesData = await imagesService.searchImages(payload);
      store.commit(GET_SEARCH_IMAGES_SUCCESS, imagesData);
    } finally {
      store.commit(SET_SEARCH_IMAGES_LOADING_STATUS, false);
    }
  },
};

export const mutations = {
  [GET_SEARCH_BREEDS_SUCCESS](state, breeds) {
    state.searchBreeds = breeds;
  },
  [GET_SEARCH_CATEGORIES_SUCCESS](state, categories) {
    state.searchCategories = categories;
  },
  [SET_SEARCH_IMAGES_LOADING_STATUS](state, isLoading) {
    state.areSearchImagesLoading = isLoading;
  },
  [GET_SEARCH_IMAGES_SUCCESS](state, imagesData) {
    state.searchImages = imagesData.images;
    state.searchImagesCount = imagesData.imagesCount;
  },
};

export const getters = {
  searchBreeds(state) {
    return state.searchBreeds;
  },
  searchCategories(state) {
    return state.searchCategories;
  },
  areSearchImagesLoading(state) {
    return state.areSearchImagesLoading;
  },
  searchImages(state) {
    return state.searchImages;
  },
  searchImagesCount(state) {
    return state.searchImagesCount;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
