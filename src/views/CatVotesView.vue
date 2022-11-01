<template>
  <div>
    <div className='p-3 bg-primary text-light'>
      <h1 className='h2'>Vote for your favourite cats!</h1>
      <p>Click 'YES' if you like this cat, 'NO' if you don't like it.</p>
    </div>
    <div class='mt-3'>
      <LoadingStatus v-if='isCatImgLoading' />
      <div v-else>
        <img class='ca-vote-image' width='500' height='600' :src='catData.url' alt='cat image' />
        <div v-if='catData.url' class='mt-3'>
          <button type='button' class='btn btn-primary me-2 ca-vote-button' @click='vote(true)'>YES</button>
          <button type='button' class='btn btn-danger ca-vote-button' @click='vote(false)'>NO</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_CAT_IMG_FOR_VOTING, SEND_VOTE } from '@/store/types/actions.type';
import LoadingStatus from '@/components/LoadingStatus.vue';

export default {
  name: 'CatVotesView',
  computed: {
      ...mapGetters(['catData', 'isCatImgLoading']),
  },
  methods: {
      vote(vote) {
          const payload = {
              id: this.catData.id,
              vote
          };
          this.$store.dispatch(SEND_VOTE, payload);
      },
  },
  created() {
      this.$store.dispatch(GET_CAT_IMG_FOR_VOTING);
  },
  components: { 
    LoadingStatus,
  },
}
</script>

<style lang='css' scoped>
.ca-vote-image {
  width: auto; 
  max-height: 100%;
}

.ca-vote-button {
  width: 100px;
}
</style>
