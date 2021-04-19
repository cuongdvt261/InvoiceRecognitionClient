<template>
  <div class="display-result">
    <div class="col-md-10 offset-1">
      <b-table
        striped
        bordered
        fixed
        responsive
        small
        hover
        id="table-info"
        :fields="fields"
        :items="tableInfo"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #cell(FileUpload)="data">
          <b-link :href="data.item.FileUploadUrl" target="_blank">{{ data.item.FileUpload }}</b-link>
        </template>

        <template #cell(FileResult)="data">
          <b-link :href="data.item.FileResultUrl" target="_blank">{{ data.item.FileResult }}</b-link>
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

@Component
export default class Home extends Vue {
  @Prop({ type: Array, required: true })
  tableInfo!: TableObject[]

  currentPage = 1
  perPage = 10

  get rows () : number {
    return this.tableInfo.length
  }

  fields: string[] = ['Id', 'FileUpload', 'FileResult', 'creationDate']
}
</script>

<style>
  @import url('../assets/global.scss');
</style>
