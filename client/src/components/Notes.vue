<template>
  <div>
    <div class="row">
      <div class="col"></div>
      <input
        class="col-5 form-control mr-sm-2"
        type="text"
        @keyup.enter="addNote"
        placeholder="¿Qué quieres recordar?"
      >
      <div class="col"></div>
    </div>
    <br>
    <div class="row text-light">
      <div class="col"></div>
      <img class="smallIcon" src="@/assets/total.png">
      {{ completed }} tareas completadas de un total de {{ notes.length }}&emsp;|&emsp;
      <span
        class="removeCompleted text-warning"
        @click="deleteCompleted"
      >
        <img class="smallIcon" src="@/assets/clear.png">Borrar tareas completadas
      </span>
      <div class="col"></div>
    </div>

    <div class="row">
      <div class="col"></div>
      <div class="col-6 bg-secondary rounded" id="list">
        <!-- List Item -->
        <transition-group name="list" tag="p">
          <div
            class="row list-item border rounded text-white"
            v-for="note in notes"
            :key="note.noteId"
          >
            <!-- Note content -->
            <div class="col-10">
              <div class="row">
                <div>
                  <img
                    class="check"
                    v-if="note.done"
                    src="@/assets/check.png"
                    @click="completeNote(note)"
                  >
                  <img class="check" src="@/assets/uncheck.png" @click="completeNote(note)" v-else>
                </div>
                <span
                  class="note align-top"
                  v-if="note.done"
                  style="text-decoration: line-through; color: #42b883;"
                >{{ note.title }}</span>
                <span class="note" v-else>{{ note.title }}</span>
              </div>
              <div class="row">
                <!-- Proridad -->
                <span class>Prioridad:</span>
                <!-- Radio Group -->
                <div class="radio-group">
                  <!-- Baja -->
                  <input
                    class="lowPr priority"
                    type="radio"
                    :id="'low' + note.noteId"
                    :name="note.noteId"
                    v-model="note.priority"
                    v-bind:value="3"
                    @change="changePriority(note)"
                  >
                  <label :for="'low' + note.noteId">Baja</label>

                  <!-- Media -->
                  <input
                    class="midPr priority"
                    type="radio"
                    :id="'mid' + note.noteId"
                    :name="note.noteId"
                    v-model="note.priority"
                    v-bind:value="2"
                    @change="changePriority(note)"
                  >
                  <label :for="'mid' + note.noteId">Media</label>

                  <!-- Alta -->
                  <input
                    class="highPr priority"
                    type="radio"
                    :id="'hi' + note.noteId"
                    :name="note.noteId"
                    v-model="note.priority"
                    v-bind:value="1"
                    @change="changePriority(note)"
                  >
                  <label :for="'hi' + note.noteId">Alta</label>
                </div>
                <img class="smallIcon align-middle" src="@/assets/time.png">
                A&ntilde;adida por&nbsp;
                <span class="text-warning">{{note.creator}}</span>
                &nbsp;hace {{ note.time | moment("from", "now", true) }}
              </div>
            </div>
            <!-- Delete button -->
            <div class="col">
              <b-button class="btn-danger float-right" @click="deleteNote(note.noteId)">
                <img src="@/assets/remove.png">
              </b-button>
            </div>
          </div>
        </transition-group>
      </div>
      <div class="col"></div>
    </div>
    <notifications group="not"/>
  </div>
</template>

<script>
export default {
  name: "Notes",
  data() {
    return {
      notes: []
    };
  },

  sockets: {
    // Nueva nota
    new(data) {
      this.notes.unshift(data);
      this.$notify({
        group: "not",
        title: "Nota creada",
        text: data.creator
      });
    },

    // Nota eliminada
    del(data) {
      let i = 0;
      this.notes.forEach(n => {
        if (data[0] == n.noteId) {
          this.notes.splice(i, 1);
        }
        i++;
      });
      this.$notify({
        group: "not",
        title: "Nota eliminada",
        text: data[1]
      });
    },

    // Cambio de prioridad
    pri(data) {
      this.notes.forEach(n => {
        if (data[0] == n.noteId) {
          n.priority = data[1];
        }
      });
      this.sortNotes();
    },

    // Nota completada
    do(data) {
      this.notes.forEach(n => {
        if (data == n.noteId) {
          n.done = !n.done;
        }
      });
      this.sortNotes();
    },

    // Obtener notas del servidor
    notes(data) {
      this.notes = data;
      this.sortNotes();
    },

    // Usuario desconectado
    disc(data) {
      this.$notify({
        group: "not",
        title: "Usuario desconectado",
        text: data
      });
    },

    // Usuario conectado
    con(data) {
      this.$notify({
        group: "not",
        title: "Usuario conectado",
        text: data
      });
    }
  },
  methods: {
    // Ordenar notas por prioridad
    sortNotes() {
      this.notes.sort(function(a, b) {
        if (a.priority > b.priority) {
          return 1;
        }
        if (a.priority < b.priority) {
          return -1;
        }
        return 0;
      });
    },

    // Crear nota
    addNote: function(event) {
      let date = new Date();
      let note = {
        title: event.target.value,
        priority: 2,
        time: date.toISOString(),
        done: false,
        noteId: date.valueOf(),
        creator: "ti"
      };
      this.notes.unshift(note);
      event.target.value = "";
      this.$notify({
        group: "not",
        title: "Nota creada"
      });
      this.$socket.emit("newNote", note);
    },

    // Eliminar nota
    deleteNote: function(id) {
      let i = 0;
      this.notes.forEach(n => {
        if (id == n.noteId) {
          this.notes.splice(i, 1);
        }
        i++;
      });
      this.$notify({
        group: "not",
        title: "Nota eliminada"
      });
      this.$socket.emit("delNote", id);
    },

    // Cambio de prioridad
    changePriority(note) {
      this.$socket.emit("changePri", [note.noteId, note.priority]);
      this.sortNotes();
    },

    // Completar nota
    completeNote(note) {
      note.done = !note.done;
      this.$socket.emit("comNote", note.noteId);
    },

    // Eliminar completadas
    deleteCompleted: function() {
      let context = this;
      let aux = this.notes.filter(function(note) {
        if (!note.done) {
          return note;
        } else {
          context.$socket.emit("delNote", note.noteId);
        }
      });
      this.notes = aux;
      this.sortNotes();
    }
  },
  computed: {
    completed: function() {
      let list;
      list = this.notes.filter(function(note) {
        return note.done;
      });
      return list.length;
    },
    added: function(note) {
      return note.time;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.smallIcon {
  height: 1em;
  width: 1em;
}
.check {
  height: 2.5em;
  width: 2.5em;
  margin-right: 2em;
}

.note {
  font-size: 2.5em;
  margin-top: -10px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}

p {
  margin: 0;
}

.removeCompleted:hover {
  cursor: pointer;
  text-decoration: underline;
}

.list-item {
  transition: all 1s;
  padding: 1em;
}

.list-enter, .list-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;
}

@import url("https://fonts.googleapis.com/css?family=Roboto");

input[type="radio"] {
  position: absolute;
  visibility: hidden;
  display: none;
}
label {
  color: darkgrey;
  display: inline-block;
  cursor: pointer;
  font-weight: bold;
  padding: 0px 10px;
  margin-bottom: 0;
}

.lowPr:checked + label {
  color: white;
  background: skyblue;
}

.midPr:checked + label {
  color: white;
  background: steelblue;
}

.highPr:checked + label {
  color: white;
  background: red;
}

.priority,
label {
  border: solid 0.5px rgb(150, 150, 150);
  border-radius: 7px;
  margin-left: 2px;
}
.radio-group {
  display: inline-block;
  margin-left: 5px;
  margin-right: 25px;
  overflow: hidden;
}
</style>