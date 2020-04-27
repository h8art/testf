<template lang='pug'>
  v-app
    v-navigation-drawer(
      v-model="drawer"
      :expand-on-hover="true"
      :right="right"
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      app
    )
      v-list(dense nav='true')
        v-list-item(link to="/shedule")
          v-list-item-icon
            v-icon assignment_turned_in
          v-list-item-content
            v-list-item-title Расписание
        v-list-item(link to='/')
          v-list-item-icon
            v-icon movie
          v-list-item-content
            v-list-item-title Видео
    v-content
      router-view 
</template>

<script>
import HelloWorld from './components/HelloWorld';
export default {
  name: 'App',

  components: {
    HelloWorld,
  },
  mounted() {
    this.$vuetify.theme.isDark = true
  },
  data: () => ({
    //
  }),
};
</script>
