<template lang='pug'>
.videos.pa-4
  .input.d-flex.flex-row.align-center
    .file
      v-file-input(v-model="file" label="Выберите видео")
      v-progress-linear(v-model="progress")
    v-btn.ml-4(color='primary' @click='upload' :loading='loading') Загрузить
  .videos.mt-4
    v-data-table(:headers='headers', :items='videos')
      template(v-slot:item.Name='props')
        v-edit-dialog(:return-value.sync='props.item.Name', @save='save(props.item.ID)')
          | {{ props.item.Name }}
          template(v-slot:input='')
            v-text-field(v-model='props.item.Name', label='Название видео', single-line='', counter='')
      template(v-slot:item.Archived='{ item }')
        v-switch(v-model='item.Archived' @change='toggle(item.ID)')
      template(v-slot:item.action='props')
        v-btn(color='error' @click='deleteVideo(props.item.ID)') Удалить
      
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data(){
    return {
      progress: 0,
      file: null,
      loading: false,
      videos: [],
      headers: [{ text: 'ID', value: 'ID' },{ text: 'Название', value: 'Name' },{ text: 'Архив', value: 'Archived' },{ text: 'Действие', value: 'action' }]
    }
  },
  mounted() {
    this.getVideos()
  },
  methods: {
    toggle(id) {
      this.axios.get("/videos/" + id)
    },
    save(id) {
      this.axios.put("/videos/" + id, {Name: this.videos.filter(v => v.ID == id)[0].Name})
    },
    deleteVideo(id) {
      this.axios.delete("/videos/" + id).then(() => this.clear()).catch(() => this.clear()) 
    },
    getVideos() {
      this.axios.get("/videos").then(resp => {
        this.videos = resp.data
      })
    }, 
    clear() {
      this.progress = 0
      this.loading = false
      this.file = null
      this.getVideos()
    },
    upload() {
      this.loading = true
      const config = {
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          this.progress = percentCompleted
        }
      }
      const form = new FormData
      form.append("file", this.file)
      this.axios.post("/videos", form, config).then(() => {
        this.clear()
      }).catch(() => {
        this.clear()
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.file 
  flex: 1
</style>