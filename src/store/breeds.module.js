import { GET_BREEDS } from './types/actions.type';
import { SET_BREEDS_LOADING_STATUS, GET_BREEDS_SUCCESS } from './types/mutations.type';
import breedsService from '@/services/breeds.service.js';

const initialState = {
  areBreedsLoading: false,
  breeds: [],
};

export const state = { ...initialState };

export const actions = {
  async [GET_BREEDS](store) {
    store.commit(SET_BREEDS_LOADING_STATUS, true);

    try {
      const allBreeds = await breedsService.getBreeds();
      const breedsIds = allBreeds.data.map(x => x.id);
      const allBreedsImages = await Promise.all(
        breedsIds.map(async (breed) => {
          return await breedsService.getBreedImage(breed);
        })
      );
      let breeds = allBreeds.data.map((breed) => {
        const breedImgData = allBreedsImages.find(x => x.data[0]?.breeds[0]?.id == breed.id);
        if (breedImgData) {
            return {
                ...breed,
                "url": breedImgData.data[0].url
            };
        } else {
            return {};
        }
      });
      breeds = breeds.filter(value => Object.keys(value).length !== 0);

      store.commit(GET_BREEDS_SUCCESS, breeds);
    } finally {
      store.commit(SET_BREEDS_LOADING_STATUS, false);
    }
  },
};

export const mutations = {
  [SET_BREEDS_LOADING_STATUS](state, isLoading){
    state.areBreedsLoading = isLoading;
  },
  [GET_BREEDS_SUCCESS](state, breeds) {
    state.breeds = breeds;
  }
};

export const getters = {
  areBreedsLoading(state) {
    return state.areBreedsLoading;
  },
  breeds(state) {
    return state.breeds;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
