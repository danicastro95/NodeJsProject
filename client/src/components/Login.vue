<template>
  <div class="row bg-dark">
    <input type="text">
    <input type="button" value="Log" @click="log">
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    log: function() {
      this.$emit('log');
    }
  }
};
</script>


<style scoped>
</style>
