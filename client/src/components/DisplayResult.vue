<template>
  <div class="display-result">
    <div class="col-md-10 offset-1">
      <b-table
        striped
        hover
        id="table-info"
        :fields="fields"
        :items="tableInfo"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #cell(FileUpload)="data">
          <b-link @click="redirectTo(data.item.FileUpload)" target="_blank">{{ data.item.FileUpload }}</b-link>
        </template>
      </b-table>
    </div>
    <div class="col-md-6 offset-5">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="table-info"
      ></b-pagination>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { TableObject } from '../models/tables'
import path from 'path'

@Component
export default class Home extends Vue {
  @Prop({ type: Array, required: true })
  tableInfo!: TableObject[]

  downloadUrl = process.env.VUE_APP_SERVER_URL
  currentPage = 1
  perPage = 3

  get rows () : number {
    return this.tableInfo.length
  }

  redirectTo (file: string) {
    window.open(path.resolve(process.env.VUE_APP_SERVER_URL || 'http://localhost:3000', 'upload', file))
  }

  fields: string[] = ['Id', 'FileUpload', 'FileResult', 'creationDate']
}
</script>

<style>
  @import url('../assets/global.scss');
</style>
