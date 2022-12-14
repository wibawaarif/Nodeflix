<template>
    <v-app-bar flat class="pt-6" color="transparent">
        <v-row>
          <v-col cols="3">
            <div @click="toHomepage" style="background-color: transparent; color: transparent; cursor: pointer">
        <v-img class="mr-9" width="200" style="just" :src="require('../assets/logo/nodeflix.svg')"></v-img>
      </div>
      </v-col>
      </v-row>
      </v-app-bar>
</template>

<script>
import router from '@/router/router';

export default {
  methods: {
    toHomepage() {
      router.push('/')
    }
  }

}

</script>
