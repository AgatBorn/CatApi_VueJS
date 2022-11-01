import { GET_BREED_DETAILS } from './types/actions.type';
import { SET_BREEDS_DETAILS_LOADING_STATUS, GET_BREED_DETAILS_SUCCESS } from './types/mutations.type';
import breedsService from '@/services/breeds.service.js';

const initialState = {
  areBreedDetailsLoading: false,
  breedDetails: {},
};

export const state = { ...initialState };

export const actions = {
  async [GET_BREED_DETAILS](store, id) {
    store.commit(SET_BREEDS_DETAILS_LOADING_STATUS, true);

    try {
      const [details, img] = await Promise.all([
        breedsService.getBreedDetails(id),
        breedsService.getBreedImage(id),
      ]);
      const breedDetails = {
          ...details.data[0].breeds[0],
          "img": img.data[0].url
      };
      store.commit(GET_BREED_DETAILS_SUCCESS, breedDetails);
    } finally {
      store.commit(SET_BREEDS_DETAILS_LOADING_STATUS, false);
    }
  },
};

export const mutations = {
  [SET_BREEDS_DETAILS_LOADING_STATUS](state, isLoading) {
    state.areBreedDetailsLoading = isLoading;
  },
  [GET_BREED_DETAILS_SUCCESS](state, details) {
    state.breedDetails = details;
  },
};

export const getters = {
  areBreedDetailsLoading(state) {
    return state.areBreedDetailsLoading;
  },
  breedDetails(state) {
    return state.breedDetails;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
