<template>
  <div class="new">
    <AnnouncementsNew></AnnouncementsNew>
  </div>
</template>

<script>
// @ is an alias to /src
import AnnouncementsNew from '@/components/Announcements/AnnouncementNew.vue'

export default {
  name: 'Home',
  components: {
    AnnouncementsNew
  }
}
</script>
