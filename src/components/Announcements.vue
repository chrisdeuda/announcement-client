<template>
  <div class="announcements">
    <div>
      <b-table striped hover :items="Announcements" :fields="fields">
        <!-- A virtual column -->
        <template #cell(actions)="data">

          <!-- or you could make an button with an icon/symbol -->
          <router-link
              :to="{path: '/announcement/edit/' + getUpdateId(data.item.id),
                     query: { type: 'edit' }
                }"
              tag="button">
            <b-icon icon="pencil-square" aria-hidden="true" variant="success"> </b-icon>
          </router-link>
          &nbsp;
          <button v-on:click="deleteAnnouncement(getUpdateId(data.item.id))">
            <b-icon icon="trash-fill" aria-hidden="true" variant="danger"> </b-icon>
          </button>

        </template>
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
        'id',
        'title',
        'content',
        'startDate',
        'endDate',
        // A column that needs custom formatting
        { key: 'actions', label: 'Actions' },
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
