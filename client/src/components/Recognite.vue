<template>
  <div class="container-fluid" ref="container" v-if="isAuthenticated">
    <br/>
    <Header />
    <br />
    <Upload @sendFile="onSendfile" />
    <br />
    <DisplayResult :tableInfo.sync="items" />
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import Upload from './Upload.vue'
import Header from './Header.vue'
import DisplayResult from './DisplayResult.vue'
import RecogniteService from '../services/recognite.service'
import { TableObject } from '../models/tables'
import { mapGetters } from 'vuex'
import { ReturnCode } from '@/helper/enums.helper'
import { AUTH_LOGOUT_ACTION } from '@/store/actions/auth'

Vue.use(Loading)
@Component({
  components: {
    Header,
    Upload,
    DisplayResult
  },
  computed: {
    ...mapGetters<string>(['isAuthenticated'])
  }
})
export default class Home extends Vue {
  items: TableObject[] = []

  constructor () {
    super()
    this.refresh()
  }

  // Request send PDF file
  onSendfile (files: any) : void {
    const recogniteService = new RecogniteService()

    const loader = this.$loading.show({
      container: this.$refs.container,
      canCancel: false
    })

    recogniteService.upload(files, JSON.stringify(this.$store.state.auth.token)).then(res => {
      if (res.status === 1) {
        loader.hide()
        this.refresh()
      }
    })
  }

  // Fill recognite result to table
  refresh () {
    const recogniteService = new RecogniteService()

    recogniteService.selectAllRecogByUser(JSON.stringify(this.$store.state.auth.token))
      .then(res => {
        if (res.status === ReturnCode.PermissionDenined) {
          this.$store.dispatch(AUTH_LOGOUT_ACTION).then(() => {
            this.$router.push('/login')
          })
        } else {
          (Array.from(res.recogs) as TableObject[]).forEach(item => {
            this.items.push({
              Id: item.Id,
              FileUpload: item.FileUpload,
              FileUploadUrl: `${[process.env.VUE_APP_SERVER_URL!, 'upload', item.FileUpload].join('/')}`,
              Description: item.Description,
              FileResult: item.FileResult,
              FileResultUrl: `${[process.env.VUE_APP_SERVER_URL!, 'download', item.FileResult].join('/')}`,
              creationDate: item.creationDate,
              deletionDate: item.deletionDate,
              updatedAt: item.updatedAt,
              IsDeleted: item.IsDeleted
            })
          })
        }
      })
  }
}
</script>
