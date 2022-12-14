<template>
  <v-container class="align-center" justify="center">
    <v-app-bar flat class="pt-6 pb-2" color="rgb(0, 0, 0, 0.5)">
        <v-row>
          <!-- TODO: LOGO -->
          <v-col cols="2">
            <div @click="toHomepage" style="background-color: transparent; color: transparent; cursor: pointer">
        <v-img class="ml-15 pa-0" width="200" style="just" :src="require('../assets/logo/nodeflix.svg')"></v-img>
      </div>
      </v-col>
      <!-- TODO: TAB --> 
      <v-col align-self="center" cols="7">
        <v-tabs
      v-model="tab"
      bg-color="transparent"
      color="red"
      class="ml-10 mb-4"
      slider-color="red"
    >
      <v-tab ripple="false" class="custom-tab-items white-text" value="one">Home</v-tab>
      <v-tab ripple="false" class="custom-tab-items white-text" value="two">TV Shows</v-tab>
    </v-tabs>
        <!-- <p class="white-text ml-16">Home</p> -->
      </v-col>
      <!-- TODO: ACCOUNT NAME -->
      <v-col class="d-flex justify-end ma-0 pa-0" align-self="center" cols="2">
        <p class="white-text">Arif Wibawa</p>
      </v-col>
      <!-- TODO: ACCOUNT DROPDOWN -->
      <v-col class="mb-4 d-flex justify-start" align-self="center" cols="1">
        <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="custom-tab-items"
          v-bind="props"
          icon
        >
        <v-icon size="x-large" color="grey-lighten-1">
                mdi-account-circle
              </v-icon>
              <v-icon size="x-large" color="grey-lighten-1">
                mdi-menu-down
              </v-icon>
        </v-btn>
      </template>

      <v-card color="rgb(32, 32, 32, 0.8)" min-width="180">
        <v-list class="pb-0 mb-0" bg-color="rgb(32, 32, 32, 0.8)" >
          <v-list-item
          class="d-flex justify-center"
          >
          <v-icon class="ml-10" size="x-large" variant="outlined" color="danger">
            mdi-netflix
          </v-icon>
          <p class="white-text mt-2 mb-2">arif@gmail.com</p>
          </v-list-item>
        </v-list>
        <v-divider class="ma-0" color="white"></v-divider>

        <v-list class="pt-0 mt-0" bg-color="rgb(32, 32, 32, 0.8)">
          <v-list-item>
            <v-btn
            block
            class="ml-0 pl-0"
            hide-details
            color="danger"
            variant="text"
            prepend-icon="mdi-filmstrip"
            @click="menu = false"
          >
          <p class="white-text mt-3 mr-16">My Movies</p>
          </v-btn>
            <v-btn
            class="ml-0 pl-0"
              color="danger"
              block
              hide-details
              variant="text"
              prepend-icon="mdi-cog"
            ><p class="white-text mt-3">Forgot Password</p></v-btn>
          </v-list-item>
        </v-list>

        <v-card-actions class="mt-0 pt-0" style="background-color: rgb(32, 32, 32, 0.8)">
          <v-spacer></v-spacer>

          <v-btn
            variant="outlined"
            color="white"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="danger"
            variant="outlined"
            @click="logout"
          >
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
      </v-col>
      </v-row>
    </v-app-bar>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <p class="white-text text-h2">TEST</p>
        </v-window-item>

        <v-window-item value="two">
          <p class="white-text text-h2">TEST 2</p>
        </v-window-item>
      </v-window>
    </v-card-text>

  </v-container>
</template>

<script>
import router from '@/router/router'

export default {
  data() {
    return {
      emailInput: '',
      tab: null,
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },

  methods: {
    count() {
      this.test+=1
    },
    toHomepage() {
      router.push('/')
    },
    logout() {
      localStorage.clear();
      router.push('/login')
    }
  },

  created() {
    document.title = 'Netflix'
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-tab-items {
    background-color: transparent !important;
}
</style>
