<template lang="pug">
.day.ml-4.mr-4
  .title {{days[ind]}}
  v-divider.mb-2
  .d-flex.flex-row.mb-4.align-center(v-for='shed in shedule' :key='shed.ID')
    v-text-field.mr-1(v-model='shed.Time', v-mask='mask', label='Время' @change='updShedule(shed)')
    v-select.ml-1.mr-1(:items="videos" label="Видео" item-value='ID' item-text='ID' v-model='shed.VideoID' @change='updShedule(shed)')
    v-btn.ml-1(color='error' small @click='deleteShed(shed.ID)') x
  v-btn.mt-4(block @click='AddShedule') Добавить
</template>
<script>
import { mask } from 'vue-the-mask'
export default {
  directives: {
      mask,
    },
  props: ['ind', 'videos'],
  data() {
    return {
      shedule: [],
      days: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс',],
      mask: '##:##',
      value: null,
    }
  },
  mounted() {
    this.GetShedule()
  },
  methods: {
    deleteShed(id) {
      this.axios.delete("/shedule/" + id)
      this.shedule = this.shedule.filter(v => v.ID != id)
    },
    updShedule(shed) {
      this.axios.put("/shedule", shed)
    },
    GetShedule() {
      this.axios.get("/shedule/" + this.ind ).then(resp => {
        this.shedule = resp.data
      })
    },
    AddShedule() {
      this.axios.post("/shedule/" + this.ind).then(resp => {
        this.shedule.push(resp.data)
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.day
  flex: 1
</style>