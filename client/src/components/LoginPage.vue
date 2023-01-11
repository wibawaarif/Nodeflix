<template>
  <v-container align="center" justify="center">
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
    <NavBar />
    <v-card class="pa-10" color="rgb(0, 0, 0, 0.8)" width="400" height="600">
      <h2 class="white-text text-left font-weight-medium mb-7">Sign In</h2>
      <v-form ref="form" v-model="valid" lazy-validation="">

        <v-text-field
        variant="filled"
        single-line="true"
        density="compact"
        prefix=" "
        class="white-text"
      bg-color="rgb(50, 50, 50)"
      v-model="loginEmail"
      label="Email"
      type="email"
    ></v-text-field>
        <v-text-field
        variant="filled"
        single-line="true"
        density="compact"
        prefix=" "
        class="white-text mt-2"
      bg-color="rgb(50, 50, 50)"
      label="Password"
      v-model="loginPassword"
      type="password"
    ></v-text-field>
      </v-form>
    <p v-if="isFieldEmpty" class="red-text font-weight-bold">Field cannot be empty</p>
    <v-btn
      class="pt-6 pb-6 mb-4 mt-6"
      block
      color="red"
      @click="userLogin"
    >
      Sign In
    </v-btn>
    <v-btn
      class="pt-6 pb-6 mb-12"
      block
      color="green"
      href="https://localhost:3000/auth/google"
    ><v-icon class="pr-12" size="large" icon="mdi-google"></v-icon><p class="mt-4 mr-11">Sign in with google</p></v-btn>
    <p class="grey-text text-left">New to Netflix? <router-link id="link" class="white-text" to="/register">Sign up now</router-link>.</p>
  </v-card>
</v-container>
</template>

<script>
import NavBarVue from './NavBar.vue'
import axios from '@/axios';
import router from '@/router/router';

export default {
  components: {
    NavBar: NavBarVue
  },
  data() {
    return {
      test1: false,
      responseMessage: "",
      loginEmail: '',
      loginPassword: '',
      isFieldEmpty: false,
    }
  },

  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    userLogin() {
      this.responseMessage = "";
      this.isFieldEmpty = false;

      if (this.loginEmail === '' || this.loginPassword === '') {
        return this.isFieldEmpty = true;
      }
      axios.post('/api/v1/login', {email: this.loginEmail, password: this.loginPassword})
        .then((response) => {
        if (response.status === 200) {
          localStorage.setItem(process.env.VUE_APP_KEY, response.data[process.env.VUE_APP_KEY])
          router.push('/index')
          this.loginEmail = "";
          this.loginPassword = "";
        }
        })
          .catch((err) => {
            console.log(err)
            this.responseMessage = err.response.data.info
            this.test1 = true
            setTimeout(()=>{
              this.test1=false
              },2000)
            this.loginPassword = "";
          })
    },
  },
  computed: {
    testing() {
      return true
    }
  },

  created() {
    document.title = 'Login | Netflix Indonesia - Watch TV Shows Online, Watch Movies Online'
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#link {
  text-decoration: none;
}

#link:hover {
  text-decoration: underline;
}

</style>
