<template>
  <v-container class="align-center" justify="center">
    <v-app-bar flat class="pt-6 pb-2" color="rgb(0, 0, 0, 0.9)">

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
        <p class="white-text">{{test.name}}</p>
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

      <v-card color="rgb(32, 32, 32, 0.8)" width="240">
        <v-list class="pb-0 mb-0" bg-color="rgb(32, 32, 32, 0.8)" >
          <v-list-item
          >
          <div class="d-flex justify-center">
          <v-icon size="x-large" variant="outlined" color="danger">
            mdi-netflix
          </v-icon>
        </div>
        <div class="d-flex justify-center">
          <p class="white-text mt-2 mb-2">{{test.email}}</p>
        </div>
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
            block
            class="ml-0 pl-0"
            hide-details
            color="danger"
            variant="text"
            prepend-icon="mdi-cog"
            to="/user/password"
          >
          <p style="margin-right: 78px;" class="white-text mt-3">Account</p>
          </v-btn>
            <!-- <v-btn
            to="/user/password"
            class="ml-0 pl-0"
              color="danger"
              block
              hide-details
              variant="text"
              prepend-icon="mdi-cog"
            ><p class="white-text mt-3">Account</p></v-btn> -->
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

  </v-container>
  <v-card-text class="pa-0">
      <v-window class="pa-0" v-model="tab">
        <v-window-item value="one">
          <v-sheet height="750" width="100%" color="white">
            <div>
              <img :src="movieEndpoint" :height="200" :width="300" alt="pussInBoots">
            </div>
            <swiper
            width="300"
    :slides-per-view="3"
    :space-between="50"
    navigation
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>
      <h2>Slide 1</h2>
      <p>--------</p>
      <p>--------</p>
      <p>--------</p>
      <p>--------</p>
    </swiper-slide>
    <swiper-slide>
      <h2>Slide 2</h2>
    </swiper-slide>
    <swiper-slide>
      <h2>Slide 3</h2>
    </swiper-slide>
    <swiper-slide>
      <h2>Slide 4</h2>
    </swiper-slide>
    <swiper-slide>
      <h2>Slide 5</h2>
    </swiper-slide>
    <swiper-slide>
      <h2>Slide 6</h2>
    </swiper-slide>
  </swiper>
          </v-sheet>
        </v-window-item>

        <v-window-item value="two">
          <v-sheet height="800px" width="100%" color="rgb(0, 0, 0, 0.9)">
            <p class="white-text">Welcome to nodeflix</p>
          </v-sheet>
        </v-window-item>
      </v-window>
    </v-card-text>
</template>

<script>
import router from '@/router/router'

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
import axios from '@/axios';

export default {
  components: {
      Swiper,
      SwiperSlide,
    },
  data() {
    return {
      tab: null,
      tab1: null,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      data: {},
      popularMovieList: '',
      movieEndpoint: 'https://image.tmdb.org/t/p/original',
    }
  },

  methods: {
    onSwiper(swiper) {
      console.log(swiper)
    },
    onSlideChange() {
      // console.log('slide change')
    },
    toHomepage() {
      router.push('/')
    },
    logout() {
      localStorage.clear();
      router.push('/login')
    }
  },
  computed: {
    test() {
      let user = this.$store.getters['fetchUser']
      return user
    }
  },
  created() {
    document.title = `Netflix | Home`
  },
  mounted() {
    this.$store
      .dispatch('fetchUser')
      .catch(err => console.log(err))

    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`)
      .then((res) => {
        this.popularMovieList = res.data.results
        this.movieEndpoint = `https://image.tmdb.org/t/p/original${this.popularMovieList[0]['backdrop_path']}`
        console.log(res)
      })

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-tab-items {
    background-color: transparent !important;
}
</style>
