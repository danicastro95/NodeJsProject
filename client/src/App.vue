<template>
  <div id="app">
    <h1 class="text-white">Proyecto Node.js - Daniel Castro Moreno</h1>
    <div class="text-white" id="nav" v-if="l">
      <router-link class="text-white" to="/">Notas</router-link>&nbsp;|
      <router-link class="text-success" to="/weather">Tiempo</router-link>
      <router-view/>
    </div>
    <Login v-else @log="logged"></Login>
    <notifications group="login"/>
    <footer id="foot">
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "app",
  data() {
    return {
      l: false,
      nick: ""
    };
  },
  components: {
    Login,
    Footer
  },
  methods: {
    logged(msg) {
      this.l = !this.l;
      this.nick = msg;
      this.$notify({
        group: "login",
        title: "Conectado con éxito"
      });
    }
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
