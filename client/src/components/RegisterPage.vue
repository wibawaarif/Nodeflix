<template>
  <div>
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
  </div>
    <v-container align="center" justify="center">
    <NavBar />
    <v-card class="pa-10" color="rgb(0, 0, 0, 0.8)" width="400" height="600">
    <h2 class="white-text text-left font-weight-medium mb-7">Sign Up</h2>

        <v-text-field
        variant="filled"
        single-line="true"
        density="compact"
        prefix=" "
        class="white-text"
      bg-color="rgb(50, 50, 50)"
      v-model="registerEmail"
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
      v-model="registerPassword"
      type="password"
    ></v-text-field>

    <v-text-field
    variant="filled"
        single-line="true"
        density="compact"
    prefix=" "
      class="white-text mt-2"
      bg-color="rgb(50, 50, 50)"
      v-model="registerConfirmPassword"
      label="Confirm Password"
      type="password"
    ></v-text-field>

    <p class="red-text" v-if="isValid">{{ messages }}</p>
    <v-btn
      class="pt-6 pb-6 mb-12 mt-6"
      block
      color="red"
      @click="sendData"
    >
      sign up
    </v-btn>

    <p class="grey-text text-left">Already have account? <router-link id="link" class="white-text" to="/login">Sign in now</router-link>.</p>
  </v-card>
</v-container>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email } from '@vuelidate/validators'
import router from '@/router/router'
import NavBarVue from './NavBar.vue'
import axios from '@/axios'

export default {
  components: {
    NavBar: NavBarVue
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      dialogConfig: [],
      test: false,
      test1: false,
      value: true,
      registerEmail: '',
      registerPassword:  '',
      registerConfirmPassword: '',
      isValid: false,
      messages: "",
      isEmailType: false,
      passwordFieldType: 'password',
    }
  },

  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    tests() {

    },
    sendData() {
      this.isValid = false;
      this.responseMessage = "";
      this.messages = "";
      this.isEmailType = false;
      if (this.registerEmail === '' || this.registerPassword === '' || this.registerConfirmPassword === '') {
        this.messages = "Field cannot be empty!"
        return this.isValid = true;
      }
      if (!/.+@.+/.test(this.registerEmail)) {
        this.messages = "Enter a valid email!"
        return this.isValid = true;
      }
      if (this.registerPassword !== this.registerConfirmPassword) {
        this.messages = "Password doesn't match!"
        return this.isValid = true;
      }

      if (this.registerPassword.length < 6 || this.registerConfirmPassword < 6) {
        this.messages = "password must be at least 6 characters long!"
        return this.isValid = true;
      }
      axios.post('/api/v1/register', {email: this.registerEmail, password: this.registerPassword})
        .then((response) => {
          console.log(response);
          this.responseMessage = "Account created. Please login for the next step."
          this.test = true
        setTimeout(()=>{
        this.test=false
        router.push('/login')
      },2000)
        })
          .catch((err) => {
            console.log(err)
            this.responseMessage = err.response.data.info
            this.test1 = true
            setTimeout(()=>{
            this.test1=false
          },2000)
          this.registerEmail = "";
          this.registerPassword = "";
          this.registerConfirmPassword = "";
          })
    },
    fetchUsers() {
      this.$store.dispatch("fetchUser")
    }
  },  
  computed: {
    testing() {
      const test = this.$store.getters['getUsers']
      return test
    },

  },
  created() {
    document.title = 'Register | Netflix Indonesia - Watch TV Shows Online, Watch Movies Online'
  },
  validations () {
    return {
      registerEmail: { email }
    }
  }
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
