<template>
  <div class="col col-sm-4 align-items-stretch mb-3">
    <div class="card h-100">
      <div class="card-header text-uppercase">
        {{ breed.name }} ({{ breed.origin }})
      </div>
      <img class="card-img-top" :src=breed.url />
      <div class="card-body">
        {{ breed.description }}
      </div>
      <div class="card-footer d-flex justify-content-center">
        <router-link class="card-link" :to='`/breeds/${breed.id}`'>Details</router-link>
        <a class="card-link ms-3" :href=breed.wikipedia_url>Wikipedia</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreedCard',
  props: {
    breed: Object,
  },
}
</script>

<style lang='css' scoped>
.card-link {
  text-decoration: none;
}
</style>