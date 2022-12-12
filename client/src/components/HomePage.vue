<template>
  <v-container class="align-center" justify="center">
    <v-dialog
        transition="dialog-top-transition"
        v-model="test"
        max-height="300"
        max-width="500"
      >
      <v-card>
            <v-toolbar
              color="success"
              title="Success"
            ></v-toolbar>
            <v-card-text>
              <div class="text-h6 pa-6">{{ responseMessage }}</div>
            </v-card-text>
          </v-card>
      </v-dialog>
      <v-dialog
        transition="dialog-top-transition"
        v-model="test1"
        max-height="300"
        max-width="500"
      >
      <v-card>
            <v-toolbar
              color="danger"
              title="Failure"
            ></v-toolbar>
            <v-card-text>
              <div class="text-h6 pa-6">{{ responseMessage }}</div>
            </v-card-text>
          </v-card>
      </v-dialog>
      <v-app-bar flat class="pt-6" color="transparent">
        <v-row>
          <v-col cols="6">
        <v-img class="ml-15" width="200" style="just" :src="require('../assets/logo/nodeflix.svg')"></v-img>
      </v-col>
      <v-col class="mt-16" cols="6">
        <v-btn style="margin-left: 66%;" class="bg-red mr-8 mt-2" color="white" to="/register">Register</v-btn>
        <v-btn class="bg-red mt-2" color="white" to="/login">Sign In</v-btn>
      </v-col>
      </v-row>
        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>
      <v-card variant="flat" class="mt-16" color="transparent">
      <p class="white-text text-h2 font-weight-bold mt-16 mr-6">Unlimited movies, TV</p>
      <p class="white-text text-h2 font-weight-bold  mr-6">shows, and more.</p>
      <p class="white-text text-h5 mt-4 font-weight-light  mr-6">Watch anywhere. Cancel anytime.</p>
      <p class="white-text text-h6 mt-6 font-weight-light  mr-6">Ready to watch? Enter your email to create or restart your membership.</p>
        <v-row no-gutters justify="center" class="mt-7">
          <v-col offset="1" class="d-flex justify-center pr-0" cols="6">
          <v-textarea v-model="emailInput" style="width: 75% ;height: 94px;" bg-color="white" label="Email Adress"></v-textarea>
        </v-col>
        <v-col class="d-flex justify-start pl-0" cols="3">
          <v-btn @click="sendEmail" style="height: 68%" color="red"><v-progress-circular
      indeterminate
      color="white"
      class="ml-14 mr-14"
      v-if="emailClicked"
    ></v-progress-circular><p class="mt-3 text-h5" v-if="!emailClicked">Get Started ></p></v-btn>
        </v-col>
      </v-row>
      <p class="red-text text-h6 font-weight-bold" v-if="isEmailEmpty">Email is required!</p>
    </v-card>
</v-container>
</template>

<script>
import axios from '@/axios';
// import router from '@/router/router'

export default {
  data() {
    return {
      emailClicked: false,
      responseMessage: "",
      test: false,
      test1: false,
      emailInput: '',
      isEmailEmpty: false,
    }
  },
  computed: {

  },
  methods: {
    sendEmail() {
      this.isEmailEmpty = false;
      if (this.emailInput === '') {
        this.isEmailEmpty = true;
        return
      }

      this.emailClicked = true;
      axios.post('/api/v1/sendemail', {
        email: this.emailInput
      })
        .then((res) => {
          console.log(res)
          this.responseMessage = `Email and Password has sent to ${this.emailInput} for further login`
          this.test = true
          this.emailClicked = false;
          setTimeout(()=>{
            this.test = false
            },2000)
          this.emailInput = "";
        })
        .catch((err) => {
          console.log(err)
          this.responseMessage = err.response.data.info
          this.test1 = true
          this.emailClicked = false;
          setTimeout(()=>{
            this.test1 = false
            },2000)
          this.emailInput = "";
        })
    },
  },

  created() {
    document.title = 'Netflix Indonesia - Watch TV Shows Online, Watch Movies Online'
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>





</style>
