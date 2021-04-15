<template>
  <div class="navigation">
    <ul>
      <li>
        <router-link class="brand" to="/">
          <b-img
            :src="require('@/assets/images/anlab_logo.png')"
            fluid
            alt="Invoice Recognition Demo">TEST</b-img>
        </router-link>
      </li>
    </ul>
    <ul>
      <li v-if="isAuthenticated" @click="logout">
        <span class="logout">Logout</span>
      </li>
      <li v-if="!isAuthenticated && !authLoading">
        <router-link to="/login">Login</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapState } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import { AUTH_LOGOUT_ACTION } from '../store/actions/auth'
import router from '../router'

@Component({
  computed: {
    ...mapGetters<string>(['isAuthenticated', 'authStatus']),
    ...mapState({
      authLoading: (state: any) => state.authStatus === 'loading',
      name: (state: any) => `${state.user.profile.title} ${state.user.profile.name}`
    })
  }
})
export default class Header extends Vue {
  logout () {
    this.$store.dispatch(AUTH_LOGOUT_ACTION).then(() => {
      this.$router.push('/login')
    })
  }
}
</script>

<style lang="scss" scoped>
a {
  color: white;
  text-decoration: none;
}

.navigation {
  display: flex;
  color: white;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.76);
  padding: 5px;

  ul {
    display: flex;
    list-style-type: none;
    &:first-child {
      flex-grow: 1;
    }
    li {
      padding-right: 1em;
      color: black;
    }
  }
}

.brand {
  display: flex;
  align-items: center;
}
.logout {
  &:hover {
    cursor: pointer;
  }
}
</style>
