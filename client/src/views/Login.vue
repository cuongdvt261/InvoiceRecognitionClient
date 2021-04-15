<template>
  <div class="login-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">

          <!-- Login Form -->
          <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
            <h1>Sign In</h1>
            <br />
            <form class="form-group">
              <input v-model="user" type="text" class="form-control" placeholder="Username" required>
              <input v-model="password" type="password" class="form-control" placeholder="Password" required>
              <input type="button" class="btn btn-primary" @click="doLogin" value="Login">
              <p>
                Don't have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign up here</a>
              </p>
            </form>
          </div>

          <!-- Register Form -->
          <div v-else class="card register" v-bind:class="{ error: emptyFields }">
            <h1>Sign Up</h1>
            <form class="form-group">
              <input v-model="userReg" type="text" class="form-control" placeholder="User" required />
              <input v-model="nameReg" type="text" class="form-control" placeholder="Name" required />
              <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required />
              <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required />
              <input type="button" class="btn btn-primary" @click="doRegister" value="Register">
              <p>
                Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AUTH_REQUEST_ACTION } from '../store/actions/auth'
import { USER_REGISTER_ACTION } from '../store/actions/user'
import router from '../router'

@Component
export default class Login extends Vue {
  registerActive = false
  emptyFields = false
  user = ''
  password = ''
  userReg = ''
  passwordReg = ''
  confirmReg = ''
  nameReg = ''

  constructor () {
    super()
    console.log(this.$router)
  }

  doLogin () : void {
    if (this.user === '' || this.password === '') {
      this.emptyFields = true
    } else {
      this.$store.dispatch(AUTH_REQUEST_ACTION, { username: this.user, password: this.password }).then(() => {
        this.$router.push({ path: '/' })
      })
    }
  }

  doRegister () {
    if (this.userReg === '' || this.passwordReg === '' || this.confirmReg === '') {
      this.emptyFields = true
    } else {
      this.$store.dispatch(USER_REGISTER_ACTION, { username: this.userReg, password: this.passwordReg, name: this.nameReg }).then(() => {
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  p {
    line-height: 1rem;
  }

  .card {
    padding: 20px;
  }
  .form-group {
    input {
      margin-bottom: 20px;
    }
  }

  .login-page {
    align-items: center;
    display: flex;
    height: 100vh;

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }

    h1 {
      margin-bottom: 1.5rem;
    }
  }

  .error {
    animation-name: errorShake;
    animation-duration: 0.3s;
  }

  @keyframes errorShake {
    0% {
      transform: translateX(-25px);
    }
    25% {
      transform: translateX(25px);
    }
    50% {
      transform: translateX(-25px);
    }
    75% {
      transform: translateX(25px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
