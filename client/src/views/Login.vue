<template>
  <div class="login-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
          <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
            <h1>Sign In</h1>
            <br />
            <form class="form-group">
              <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required>
              <br />
              <input v-model="passwordLogin" type="password" class="form-control" placeholder="Password" required>
              <br />
              <input type="submit" class="btn btn-primary" @click="doLogin">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import store from '../store'
import router from '../router'

@Component
export default class Login extends Vue {
  registerActive = false
  user = ''
  password = ''
  emptyFields = false

  // login () : void {
  //   store.dispatch('AUTH_REQUEST', { username: this.user, password: this.password }).then(() => {
  //     router.push('/')
  //   })
  // }
  doLogin () {
    if (this.user === '' || this.password === '') {
      this.emptyFields = true
    } else {
      alert('You are now logged in')
    }
  }
}
</script>

<style>
  @import url('../assets/login.scss');
</style>
