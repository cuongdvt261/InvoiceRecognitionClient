<template>
  <div id="app">
    <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload PDF file</h1>
        <div class="dropbox">
          <input type="file" @change="filesChange($event.target.files)"
            accept="image/*,application/pdf" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'

enum STATUS {
  INITIAL,
  SAVING,
  SUCCESS,
  FAILED,
}

@Component
export default class Upload extends Vue {
  private currentStatus: STATUS = STATUS.INITIAL;
  private file: unknown = { foo: 'bar' }

  get isInitial (): boolean {
    return this.currentStatus === STATUS.INITIAL
  }

  get isSaving (): boolean {
    return this.currentStatus === STATUS.SAVING
  }

  get isSuccess (): boolean {
    return this.currentStatus === STATUS.SUCCESS
  }

  get isFailed () : boolean {
    return this.currentStatus === STATUS.FAILED
  }

  private reset () {
    this.file = {}
  }

  @Emit('sendFile')
  private filesChange (file: any) : void {
    console.log(file)
    this.file = file
  }

  mounted () {
    this.reset()
  }
}
</script>

<style>
  @import url('../assets/global.scss');
</style>
