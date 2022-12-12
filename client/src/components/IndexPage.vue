<template>
  <v-container class="align-center" justify="center">
    <v-app-bar flat class="pt-6 pb-2" color="rgb(0, 0, 0, 0.5)">
        <v-row>
          <v-col cols="2">
        <v-img class="ml-15 pa-0" width="200" style="just" :src="require('../assets/logo/nodeflix.svg')"></v-img>
      </v-col> 
      <v-col align-self="center" cols="1">
        <p class="white-text ml-16">Home</p>
      </v-col>
      <v-col align-self="center" cols="1">
        <p class="white-text">TV Shows</p>
      </v-col>
      <v-col>
        
      </v-col>
      </v-row>
    </v-app-bar>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      emailInput: '',
    }
  },

  methods: {
    count() {
      this.test+=1
    },
  },

  created() {
    document.title = 'Netflix'
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
