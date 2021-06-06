<template>
  <div>
    <b-container fluid>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Title:</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
              id="input-default"
              placeholder="Enter the title"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Content:</label>
        </b-col>
        <b-col sm="10">
          <b-form-textarea
              id="textarea"
              v-model="form.content"
              placeholder="Enter your content..."
              rows="6"
              max-rows="10"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Start Date</label>
        </b-col>
        <b-col sm="4">
          <b-form-datepicker
              id="example-datepicker"
              v-model="form.startDate"
              class="mb-2"
          >
          </b-form-datepicker>
        </b-col>
        <b-col sm="2">
          <label for="input-default">End Date</label>
        </b-col>
        <b-col sm="4">
          <b-form-datepicker
              id="endDate"
              v-model="form.endDate"
              class="mb-2"
          >
          </b-form-datepicker>
        </b-col>
      </b-row>


      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
    </b-container>
  </div>

</template>

<script>
export default {
  name: 'AnnouncementNewComp',
  data() {
    return {
      errors:[],
      title: null,
      content: null,
      startDate: null,
      endDate: null,
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>