<template>
<v-footer class="d-flex justify-content-center pa-8 bg-dark">
    <v-row>
      <v-col class="pa-0" cols="12">
    <p class="text-white">Arif Wibawa</p>
  </v-col>

    <v-col>
    <a class="ma-4" href="https://www.linkedin.com/in/arifwibawaa/" target="_blank">
      <i class="fab fa-linkedin fa-3x"></i>
    </a>

    <a class="ma-4" href="https://github.com/wibawaarif" target="_blank">
      <i class="fab fa-github fa-3x"></i>
    </a>

    <a class="ma-4" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=arifwb.work@gmail.com" target="_blank">
      <i class="fab fa-google fa-3x"></i>
    </a>
  </v-col>
  </v-row>
    </v-footer>
</template>


<style scoped>

.fa-google {
  background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.fa-google:hover {
  color: grey;
  background: grey;
  background-clip: text;
  transition: 0.3s;
}
.fa-github {
  color: white;
}
.fa-github:hover {
  color: grey;
  background: grey;
  background-clip: text;
  transition: 0.3s;
}
</style>