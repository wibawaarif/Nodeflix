<template>
      <v-container align="center" justify="center">
        <v-dialog
        transition="dialog-top-transition"
        v-model="successDialog"
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
        v-model="failureDialog"
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

    <v-card v-if="!testings" class="pa-10 mt-16 ml-8" color="rgb(0, 0, 0, 0.8)" width="400" height="300">
      <h2 class="white-text text-left font-weight-medium mb-7">Forgot Password</h2>
      <v-form ref="form" v-model="valid" lazy-validation="">

        <v-text-field
        variant="filled"
        single-line="true"
        density="compact"
        prefix=" "
        class="white-text"
      bg-color="rgb(50, 50, 50)"
      v-model="resetEmail"
      label="Email"
      type="email"
    ></v-text-field>
      </v-form>
    <p v-if="isFieldEmpty" class="red-text font-weight-light">Field cannot be empty</p>
    <v-btn
      class="pt-6 pb-6 mb-4"
      block
      color="success"
      @click="resetPassword"
    >
      Reset Password
    </v-btn>
    <p v-on:click="resetPassword3" id="link" class="white-text text-left">Change Password.</p>
  </v-card>

  <v-card v-if="testings" class="pa-10 mt-16 ml-8" color="rgb(0, 0, 0, 0.8)" width="400" height="500">
      <h2 class="white-text text-left font-weight-medium mb-7">Change Password</h2>
      <v-form ref="form" v-model="valid" lazy-validation="">
        <v-text-field
        variant="filled"
        single-line="true"
        density="compact"
        prefix=" "
        class="white-text"
      bg-color="rgb(50, 50, 50)"
      v-model="form.oldPassword"
      label="Old Password"
      type="password"
    ></v-text-field>
    <v-text-field
        variant="filled"
        single-line="true"
        density="compact"
        prefix=" "
        class="white-text"
      bg-color="rgb(50, 50, 50)"
      v-model="form.newPassword"
      label="New Password"
      type="password"
    ></v-text-field>
    <v-text-field
        variant="filled"
        single-line="true"
        density="compact"
        prefix=" "
        class="white-text"
      bg-color="rgb(50, 50, 50)"
      v-model="form.confirmNewPassword"
      label="Confirm New Password"
      type="password"
    ></v-text-field>
    <p class="red-text font-weight-bold" v-if="isValid">{{ messages }}</p>
      </v-form>
    <p v-if="isFieldEmpty" class="red-text font-weight-light">Field cannot be empty</p>
    <v-btn
      class="pt-6 pb-6 mb-4"
      block
      color="danger"
      @click="changePassword"
    >
      <p class="white-text mt-4">Change Password</p>
    </v-btn>
    <p v-on:click="resetPassword2" id="link" class="white-text text-left">Forgot Password? Reset Here.</p>
  </v-card>

</v-container>
</template>


<script>
import router from '@/router/router'
import axios from '@/axios'

export default {
  data() {
    return {
      successDialog: false,
      failureDialog: false,
      tab: null,
      tab1: null,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      form: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      resetEmail: '',
      testings: true,
      isValid: false,
      messages: "",
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
    },
    resetPassword() {
        this.testings = false;
    },
    resetPassword2() {
        this.testings = false;
    },
    resetPassword3() {
        this.testings = true;
    },
    changePassword() {
      this.isValid = false;
      this.messages = "";
      this.responseMessage = "";

      if (this.form.oldPassword === '' || this.form.newPassword === '' || this.form.confirmNewPassword === '') {
        this.messages = "Field cannot be empty!"
        return this.isValid = true;
      }

      if (this.form.newPassword !== this.form.confirmNewPassword) {
        this.messages = "Password doesn't match!"
        return this.isValid = true;
      }

      axios.put(`/api/v1/user/password/${this.test.userId}`, {oldPassword: this.form.oldPassword, newPassword: this.form.newPassword})
        .then((response) => {
          console.log(response.data.info);
          this.responseMessage = response.data.info
          this.successDialog = true
          localStorage.clear()
        setTimeout(()=>{
          this.successDialog=false
          router.push('/login')
        },2000)
          this.form.oldPassword = "";
          this.form.newPassword = "";
          this.form.confirmNewPassword = "";
        })
          .catch((err) => {
            console.log(err)
            this.responseMessage = err.response.data.info
            this.failureDialog = true
            setTimeout(()=>{
            this.failureDialog=false
          },2000)

          this.form.oldPassword = "";
          this.form.newPassword = "";
          this.form.confirmNewPassword = "";
          })


    },  
  },
  computed: {
    test() {
      let user = this.$store.getters['fetchUser']
      return user
    }
  },
  created() {
    document.title = `Netflix | Forgot Password`
  },
  mounted() {
    this.$store
      .dispatch('fetchUser')
      .catch(err => console.log(err))

  },
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-tab-items {
    background-color: transparent !important;
}

#link {
  text-decoration: none;
}

#link:hover {
  text-decoration: underline;
    cursor: pointer;
}
</style>