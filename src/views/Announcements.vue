<template>
  <div class="home">
    <Announcements></Announcements>
  </div>
</template>

<script>
// @ is an alias to /src
import Announcements from '@/components/Announcements.vue'

export default {
  name: 'Home',
  components: {
    Announcements
  }
}
</script>
