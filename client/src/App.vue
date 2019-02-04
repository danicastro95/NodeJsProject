<template>
  <div id="app">
    <h1 class="text-white">Proyecto Vue.js - Daniel Castro Moreno</h1>
    <div class="text-white" id="nav">
      <router-link class="text-white" to="/">Notas</router-link> |
      <router-link class="text-success" to="/weather">Tiempo</router-link>
    </div>
    <router-view/>
    <footer id="foot">
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "foot",
  components: {
    Footer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
