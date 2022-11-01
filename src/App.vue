<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">CatAPI</a>
      <div class="collapse navbar-collapse" id="mainNavbar">
        <div class="navbar-nav mr-auto">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/breeds">Breeds</router-link>
          <router-link class="nav-link" to="/search">Search</router-link>
        </div>
      </div>
    </div>
  </nav>
  <router-view class="mt-3" />
</template>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
