<template>
  <div class="row">
    <div class="form-group col-4">
    </div>
    <div class="col">
      <label for="exampleFormControlInput1">Introduce un apodo</label>
      <input type="text" class="form-control" id="exampleFormControlInput1">
      <button type="button" class="btn btn-primary" @click="log">Acceder</button>
    </div>
    <div class="form-group col-4"></div>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    log: function() {
      this.$emit("log");
    }
  }
};
</script>

<style scoped>
</style>
