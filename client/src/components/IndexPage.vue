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
          <div class="bg-black">
            <!-- {{ popularMovieList }} -->
            <div class="swiper-container bg-black">
              <h2 class="font-weight-bold">Popular</h2>
            <swiper
    :slidesPerView="8"
    :spaceBetween="2"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :slidesPerGroup="2"
    :loop="true"
    :loopFillGroupWithBlank="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
  <swiper-slide :key="index" v-for="item, index in popularMovieList"><img class="img-cover" :src="`https://image.tmdb.org/t/p/original${item.poster_path}`" alt="{{item}}"></swiper-slide>
  </swiper>
</div>

<div>
              <h2 class="font-weight-bold">Top Rated</h2>
            <swiper
    :slidesPerView="8"
    :spaceBetween="2"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :zoom="true"
    :slidesPerGroup="2"
    :loop="true"
    :loopFillGroupWithBlank="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
  <swiper-slide :key="index" v-for="item, index in topRatedMovieList"><img :src="`https://image.tmdb.org/t/p/original${item.poster_path}`" alt="{{item}}"></swiper-slide>
  </swiper>
</div>

<div>
              <h2 class="font-weight-bold">Upcoming Movies</h2>
            <swiper
    :slidesPerView="8"
    :spaceBetween="2"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :slidesPerGroup="2"
    :loop="true"
    :loopFillGroupWithBlank="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
  <swiper-slide :key="index" v-for="item, index in upcomingMovieList"><img :src="`https://image.tmdb.org/t/p/original${item.poster_path}`" alt="{{item}}"></swiper-slide>
  </swiper>
</div>
</div>
        </v-window-item>

        <v-window-item value="two">

          <div class="bg-black">
            <!-- {{ popularMovieList }} -->
            <div class="bg-black">
              <h2 class="font-weight-bold">TV Show</h2>
            <swiper
    :slidesPerView="8"
    :spaceBetween="2"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :slidesPerGroup="2"
    :loop="true"
    :loopFillGroupWithBlank="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
  <swiper-slide :key="index" v-for="item, index in popularTvList"><img class="img-cover" :src="`https://image.tmdb.org/t/p/original${item.poster_path}`" alt="{{item}}"></swiper-slide>
  </swiper>
</div>
</div>

        </v-window-item>
      </v-window>
    </v-card-text>
</template>

<script>
import router from '@/router/router';
import axios from '@/axios';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper";


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
    return {
      onSwiper,
        onSlideChange,
        modules: [Autoplay, Pagination, Navigation, EffectCoverflow],
    };
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
      topRatedMovieList: '',
      upcomingMovieList: '',
      popularTvList: '',
    }
  },

  methods: {
    toHomepage() {
      router.push('/')
    },
    logout() {
      localStorage.clear();
      router.push('/login')
    },
    hoverIn() {
      this.$el.querySelector('.swiper-slide').style.filter = "brightness(70%)";
    },
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
        console.log(res)
      })
    
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`)
      .then((res) => {
        this.topRatedMovieList = res.data.results
        console.log(res)
      })
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`)
      .then((res) => {
        this.upcomingMovieList = res.data.results
        console.log(res)
      })
    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=1`)
      .then((res) => {
        this.popularTvList = res.data.results
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

.mySwiper {
  width: 97.5%;
  height: 30%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: black;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 5%;
}

.img-cover:hover {
  cursor: pointer;
}

</style>
