<template>
  <div class="announcements">
    <div>
      <b-table striped hover :items="announcements"></b-table>
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
    }
  },
  created() {
    this.fetchAnnouncements();
  },
  methods: {
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

                console.log(announcements);
              }

            }



            console.log(this.announcements);
          })
    }

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
