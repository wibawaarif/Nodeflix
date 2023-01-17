<template>
  <v-app style="background: rgba(0,0,0,0);">
  <router-view></router-view>
</v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
      background-image: radial-gradient(transparent, black),url('./assets/images/netflix.jpg');
      background-size: cover;
      overflow: hidden;
    }

#hero {
  z-index: 0;
}
</style>
