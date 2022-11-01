import { GET_CAT_IMG_FOR_VOTING, SEND_VOTE } from './types/actions.type';
import { SET_CAT_VOTE_IMG_LOADING_STATUS, GET_CAT_IMG_FOR_VOTING_SUCCESS } from './types/mutations.type';
import catVotesService from '@/services/catVotes.service.js';

const initialState = {
  catData: {
    id: '',
    url: '',
  },
  isCatImgLoading: false,
};

export const state = { ...initialState };

export const actions = {
  async [GET_CAT_IMG_FOR_VOTING](store) {
    store.commit(SET_CAT_VOTE_IMG_LOADING_STATUS, true);

    try {
      const result = await catVotesService.getCatImage();
      store.commit(GET_CAT_IMG_FOR_VOTING_SUCCESS, result.data[0]);
    } finally {
      store.commit(SET_CAT_VOTE_IMG_LOADING_STATUS, false);
    }
  },
  async [SEND_VOTE](store, payload) {
    store.commit(SET_CAT_VOTE_IMG_LOADING_STATUS, true);

    try {
      await catVotesService.vote(payload);
      store.dispatch(GET_CAT_IMG_FOR_VOTING);
    } catch (error) {
      store.commit(SET_CAT_VOTE_IMG_LOADING_STATUS, false);
    }
  },
};

export const mutations = {
  [SET_CAT_VOTE_IMG_LOADING_STATUS](state, isLoading){
    state.isCatImgLoading = isLoading;
  },
  [GET_CAT_IMG_FOR_VOTING_SUCCESS](state, data){
    state.catData = data;
  },
};

export const getters = {
  isCatImgLoading(state) {
    return state.isCatImgLoading;
  },
  catData(state) {
    return state.catData;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
