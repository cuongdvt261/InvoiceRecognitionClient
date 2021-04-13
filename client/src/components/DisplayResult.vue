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

@Component
export default class Home extends Vue {
  @Prop({ type: Array, required: true })
  tableInfo!: TableObject[]

  currentPage = 1
  perPage = 3

  get rows () : number {
    return this.tableInfo.length
  }

  fields: string[] = ['id', 'fileUpload', 'dateTime', 'fileDownload']
}
</script>

<style>
  @import url('../assets/global.scss');
</style>
