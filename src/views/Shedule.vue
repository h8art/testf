<template lang="pug">
  .shedule.pt-4 
    .d-flex.flex-row
      day(v-for='i, ind in 7' :ind='ind' :videos='videos') 
</template>
<script>
import Day from '../components/Day'

export default {
  components: {Day},
  data(){
    return {
      videos: []
    }
  },
  mounted() {
    this.axios.get("/videos").then(resp => {
      this.videos = resp.data
    })
  }
}
</script>
