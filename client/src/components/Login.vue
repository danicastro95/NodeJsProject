<template>
  <div class="row bg-dark">
    <input type="text">
    <input type="button" value="Log" @click="log">
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      logged: false
    };
  },
  methods: {
    log: function() {
      this.logged = true;
    }
  }
};
</script>


<style scoped>
</style>
