
<template>
  <div class="container-fluid" ref="container">
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
import Upload from '../components/Upload.vue'
import Header from '../components/Header.vue'
import DisplayResult from '../components/DisplayResult.vue'
import ProcessService from '../services/process.services'
import { TableObject } from '../models/tables'
import 'vue-loading-overlay/dist/vue-loading.css'

const processServer = new ProcessService()

Vue.use(Loading)
@Component({
  components: {
    Header,
    Upload,
    DisplayResult
  }
})
export default class Home extends Vue {
  items: TableObject[] = []

  constructor () {
    super()
    this.refresh()
  }

  onSendfile (files: any) : void {
    const loader = this.$loading.show({
      container: this.$refs.container,
      canCancel: false
    })
    processServer.upload(files).then(res => {
      console.log(res.result.ok)
      if (res.result.ok === 1) {
        loader.hide()
        this.refresh()
      }
    })
  }

  refresh (): TableObject[] {
    processServer.results().then(res => {
      this.items = Array.from(res) as TableObject[]
    })
    return []
  }
}
</script>
