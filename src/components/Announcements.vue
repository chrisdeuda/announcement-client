<template>
  <div class="announcements">
    <div>
      <b-table striped hover :items="announcements" :fields="fields">
        <!-- A virtual column -->
        <template #cell(actions)="data">

          <!-- or you could make an button with an icon/symbol -->
          <router-link
              :to="{path: '/announcement/edit/' + getUpdateId(data.item.id) }"
              tag="button">
            <b-icon icon="pencil-square" aria-hidden="true" variant="success"> </b-icon>
          </router-link>
          <router-link
              :to="{path: '/announcement/delete/' + getUpdateId(data.item.id)}"
              tag="button">
            <b-icon icon="trash-fill" aria-hidden="true" variant="danger"> </b-icon>
          </router-link>
          <router-link :to="{name: 'landing'}" tag="b-icon" exact v-on:click.native="close()">Home</router-link>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
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
    this.fetchAnnouncements();
  },
  methods: {
    getUpdateId: function(id){
      return parseInt(id );
    },

    fetchAnnouncements: function () {
      const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
      const baseURI = API_BASE_URL + '/announcements'
      const token = process.env.VUE_APP_API_TOKEN;
      this.$http.get(baseURI, {
        headers: {
          'Authorization': 'Bearer ' + token,
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        console.log();
        const data = result.data;
        console.log(data);
        if( data.results !== undefined){
          const announcements = data.results.announcements;
          if (announcements !==undefined){
            this.announcements = Object.keys(announcements).map((key) => {
              return announcements[key]
            })
          }
        }
      })
    }

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
