<template>
  <div>
    <LoadingStatus v-if='areBreedsLoading' />
    <div class="container" v-else>
      <div class="row">
        <BreedCard v-for="breed in breeds" :key="breed.id" :breed="breed" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_BREEDS } from '@/store/types/actions.type';
import LoadingStatus from '@/components/LoadingStatus.vue';
import BreedCard from '@/components/BreedCard.vue';

export default {
  name: 'BreedsView',
  computed: {
    ...mapGetters(['areBreedsLoading', 'breeds']),
  },
  created() {
    this.$store.dispatch(GET_BREEDS);
  },
  components: {
    LoadingStatus,
    BreedCard,
  },
}
</script>