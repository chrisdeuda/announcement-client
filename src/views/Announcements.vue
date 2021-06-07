<template>
  <div class="announcements">
    <div>
      <b-table striped hover :items="Announcements" :fields="fields">
        <!-- A virtual column -->

      </b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Announcements',
  props: {
    msg: String
  },
  data() {
    return {
      announcements: [],
      fields: [
        /*'id',*/
        'title',
        'content',
        'startDate',
        'endDate',
      ],
    }
  },
  created() {
    //this.fetchAnnouncements();
    this.GetAnnouncements();
  },
  computed: {
    ...mapGetters({Announcements: "StateAnnouncements", User: "StateUser"}),
  },

  methods: {
    ...mapActions([ "GetAnnouncements", "DeleteAnnouncement"]),

    getUpdateId: function(id){
      return parseInt(id );
    },

    deleteAnnouncement: function (id) {
      if(confirm('Delete', 'Are you sure?')){
        let $result = this.DeleteAnnouncement(id);
        console.log($result);
      }
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
