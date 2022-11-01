import { createStore } from 'vuex';
import catVotes from './catVotes.module';
import breeds from './breeds.module';
import breedDetails from './breedsDetails.module';
import search from './search.module';

export default createStore({
  modules: {
    catVotes,
    breeds,
    breedDetails,
    search,
  },
});
