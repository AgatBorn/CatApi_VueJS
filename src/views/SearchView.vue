<template>
    <div class="container">
      <form class="text-start">
        <div class="form-group row">
          <label for="breed" class="col-sm-2 col-form-label">Breed</label>
          <div class="col-sm-10">
            <select id="breed" class="form-select" v-model="selectedBreed">
              <option value=''></option>
              <option v-for="searchBreed in searchBreeds" :value="searchBreed.id" :key="searchBreed.id">{{ searchBreed.name }}</option>
            </select>
          </div>
        </div>
        <div class="form-group row mt-3">
          <label for="category" class="col-sm-2 col-form-label">Category</label>
          <div class="col-sm-10">
            <select id="category" class="form-select" v-model="selectedCategory">
              <option value=''></option>
              <option v-for="searchCategory in searchCategories" :value="searchCategory.id" :key="searchCategory.id">{{ searchCategory.name }}</option>
            </select>
          </div>
        </div>
        <div class="form-group row mt-3">
          <label for="order" class="col-sm-2 col-form-label">Order</label>
          <div class="col-sm-10 me-0">
            <select id="order" class="form-select" v-model="selectedOrder">
              <option value="RAND">random</option>
              <option value="ASC">asc</option>
              <option value="DESC">desc</option>
            </select>
          </div>
        </div>
        <div class="form-group row d-flex justify-content-end mt-3">
          <button type='button' class='btn btn-primary w-auto ca-search-button' @click=search(true)>Search</button>
        </div>
      </form>
      <LoadingStatus v-if='areSearchImagesLoading' />
      <div class="d-flex justify-content-center" v-else>
        <ul v-if="searchImagesCount > 0" class="pagination">
          <li v-if="currentPage > 1" class="page-item"><a class="page-link" @click="getNextPage(currentPage-1)">Previous</a></li>
          <li v-if="currentPage > 1" class="page-item"><a class="page-link" @click="getNextPage(currentPage-1)">{{ currentPage - 1 }}</a></li>
          <li class="page-item"><a class="page-link active">{{ currentPage }}</a></li>
          <li v-if="currentPage !== lastPage" class="page-item"><a class="page-link" @click="getNextPage(currentPage+1)">{{ currentPage + 1 }}</a></li>
          <li v-if="currentPage !== lastPage" class="page-item"><a class="page-link" @click="getNextPage(currentPage+1)">Next</a></li>
        </ul>
      </div>
      <div class="ca-search-gallery-container">
        <img v-for="searchImage in searchImages" :key=searchImage.url class="ca-search-gallery-img mt-1" height="300" :src=searchImage.url />
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_SEARCH_BREEDS, GET_SEARCH_CATEGORIES, GET_SEARCH_IMAGES } from '@/store/types/actions.type';
import LoadingStatus from '@/components/LoadingStatus.vue';

export default {
  name: 'SearchView',
  data() {
    return {
      currentPage: 1,
      selectedBreed: '',
      selectedCategory: '',
      selectedOrder: '',
    };
  },
  computed: {
    ...mapGetters(['searchBreeds', 'searchCategories', 'areSearchImagesLoading', 'searchImages', 'searchImagesCount' ]),
    lastPage() {
      return Math.ceil(this.searchImagesCount / 10);
    },
  },
  methods: {
    search(paramsChanged = false) {
      if (paramsChanged) {
        this.currentPage = 1;
      }

      const params = {
        breed: this.selectedBreed,
        category: this.selectedCategory,
        order: this.selectedOrder,
        page: this.currentPage,
      };

      this.$store.dispatch(GET_SEARCH_IMAGES, params);
    },
    getNextPage(nextPage) {
      this.currentPage = nextPage;
      this.search(false);
    },
  },
  async created() {
    await Promise.all([
      this.$store.dispatch(GET_SEARCH_BREEDS),
      this.$store.dispatch(GET_SEARCH_CATEGORIES),
    ]);
  },
  components: {
    LoadingStatus,
  },
}
</script>

<style scoped>
.ca-search-button {
  margin-right: 0.75rem;
}

.ca-search-gallery-container {
  column-count: 3;
  column-gap: 5px; 
  row-gap: 5px;
}

.ca-search-gallery-img {
  width: 100%;
  height: auto;
}
</style>