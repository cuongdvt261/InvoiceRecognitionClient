<template>
  <div class="display-result">
    <div class="col-md-10 offset-1">
      <b-table striped hover :fields="fields" :items="tableInfo">
      </b-table>
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

  fields: string[] = ['no', 'fileUpload', 'fileDownload']
}
</script>

<style>
  @import url('../assets/global.scss');
</style>
