<template>
  <div class="row">
    <div class="form-group col-4"></div>
    <div class="col">
      <label for="loginInput">Introduce un apodo</label>
      <input type="text" class="form-control" id="loginInput" v-model="nick">
      <button type="button" class="btn btn-primary" @click="log">Acceder</button>
    </div>
    <div class="form-group col-4"></div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      nick: ''
    };
  },
  sockets: {
    log(data) {
      if (data) {
        this.$emit('log', this.nick);
      }
    }
  },
  methods: {
    log: function() {
      this.$socket.emit('login', this.nick);
    }
  }
};

//CONTROLAR EL CAMPO DE ENTRADA DE TEXTO
</script>

<style scoped>
</style>
