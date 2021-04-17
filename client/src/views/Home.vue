<template>
  <div class="container-fluid" ref="container" >
    <div v-if="isAuthenticated">
      <Recognite />
    </div>
    <div v-if="!isAuthenticated">
      <Login />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Login from '../views/Login.vue'
import Recognite from '../components/Recognite.vue'
import { mapGetters } from 'vuex'

@Component({
  components: {
    Login,
    Recognite
  },
  computed: {
    ...mapGetters<string>(['isAuthenticated'])
  }
})
export default class Home extends Vue {}
</script>
