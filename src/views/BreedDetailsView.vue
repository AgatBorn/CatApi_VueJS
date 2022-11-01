<template>
  <div>
    <LoadingStatus v-if='areBreedDetailsLoading' />
    <div class="container" v-else>
      <div class="row mb-0 mt-2">
        <div class="col">
          <img className="w-100" :src=breedDetails.img />
        </div>
      </div>
      <div class="p-3 bg-dark text-light">
        <h3 class="text-uppercase">{{ breedDetails.name }} ({{ breedDetails.origin }})</h3>
        <p class="lead">{{ breedDetails.temperament }}</p>
        <div>{{ breedDetails.description }}</div>
        <div class="mt-3">
            <span class="me-1">Natural:</span>
            <span>{{ getYesNoText(breedDetails.natural) }}</span>
            <span class="ms-2 me-1">Experimental:</span>
            <span>{{ getYesNoText(breedDetails.experimental) }}</span>
            <span class="ms-2 me-1">Rare:</span>
            <span>{{ getYesNoText(breedDetails.rare) }}</span>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
            <h4>Appearance</h4>
            <div class="mt-2">
              <YesNoProgressbarVue title="Hairless" :currentValue="breedDetails.hairless" />
            </div>
            <div class="mt-2">
              <YesNoProgressbarVue title="Short legs" :currentValue="breedDetails.short_legs" />
            </div>
            <div class="mt-2">
              <YesNoProgressbarVue title="Suppressed tail" :currentValue="breedDetails.suppressed_tail" />
            </div>
        </div>
        <div class="col">
            <h4>Friendliness</h4>
            <div class="mt-2">
              <MultipleValueProgressbarVue title="Child friendly" :currentValue="breedDetails.child_friendly" :maxValue="5" />
            </div>
            <div class="mt-2">
              <MultipleValueProgressbarVue title="Dog friendly" :currentValue="breedDetails.dog_friendly" :maxValue="5" />
            </div>
            <div class="mt-2">
              <MultipleValueProgressbarVue title="Stranger friendly" :currentValue="breedDetails.stranger_friendly" :maxValue="5" />
            </div>
        </div>
        <div class="col">
            <h4>Health</h4>
            <div class="mt-2">
              <YesNoProgressbarVue title="Hypoallergenic" :currentValue="breedDetails.hypoallergenic" />
            </div>
            <div class="mt-2">
              <MultipleValueProgressbarVue title="Health issues" :currentValue="breedDetails.health_issues" :maxValue="5" />
            </div>
            <p class="mb-0 mt-2">Life span</p>
            <p class="mt-0">{{ breedDetails.life_span }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
            <h4>Behaviour</h4>
        </div>
      </div>
      <div class="row">
        <div class="col">
            <div class="mt-2">
              <MultipleValueProgressbarVue title="Affection level" :currentValue="breedDetails.affection_level" :maxValue="5" />
            </div>
            <div class="mt-2">
              <MultipleValueProgressbarVue title="Energy level" :currentValue="breedDetails.energy_level" :maxValue="5" />
            </div>
            <div class="mt-2">
              <MultipleValueProgressbarVue title="Intelligence" :currentValue="breedDetails.intelligence" :maxValue="5" />
            </div>
        </div>
        <div class="col">
            <div class="mt-2">
              <YesNoProgressbarVue :title="'Indoor'" :currentValue="breedDetails.indoor" />
            </div>
            <div class="mt-2">
              <YesNoProgressbarVue :title="'Vocalisation'" :currentValue="breedDetails.vocalisation" />
            </div>
            <div class="mt-2">
              <MultipleValueProgressbarVue title="Social needs" :currentValue="breedDetails.social_needs" :maxValue="5" />
            </div>
        </div>
      </div>
      <div class="bg-dark mt-3 mb-5" >  
        <a class="text-light" :href=breedDetails.wikipedia_url>Wikipedia</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_BREED_DETAILS } from '@/store/types/actions.type';
import LoadingStatus from '@/components/LoadingStatus.vue';
import YesNoProgressbarVue from '@/components/YesNoProgressbar.vue';
import MultipleValueProgressbarVue from '@/components/MultipleValueProgressbar.vue';

export default {
  name: 'BreedDetailsView',
  computed: {
    ...mapGetters(['areBreedDetailsLoading', 'breedDetails']),
  },
  methods: {
    getYesNoText(value) {
      return value ? "YES" : "NO";
    },
  },
  created() {
    this.$store.dispatch(GET_BREED_DETAILS, this.$route.params.breedId);
  },
  components: {
    LoadingStatus,
    YesNoProgressbarVue,
    MultipleValueProgressbarVue,
  },
}
</script>