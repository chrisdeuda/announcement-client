<template>
  <div>
    <p>{{ isEditAnnouncementForm ? 'Edit' : 'Add' }} Announcements</p>
    <b-container fluid>
    <b-form @submit.stop.prevent="onSubmit">
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Title:</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
              id="input-default"
              placeholder="Enter the title"
              v-model="$v.form.title.$model"
              :state="validateState('title')"
              aria-describedby="title-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback
              id="title-live-feedback"
          >This is a required field </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Content:</label>
        </b-col>
        <b-col sm="10">
          <b-form-textarea
              id="textarea"
              v-model="$v.form.content.$model"
              :state="validateState('content')"
              aria-describedby="content-live-feedback"
              rows="6"
              max-rows="10"
          ></b-form-textarea>
          <b-form-invalid-feedback
              id="content-live-feedback"
          >This is a required field
          </b-form-invalid-feedback>
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
              :state="validateState('endDate')"
              aria-describedby="endDate-live-feedback"
              class="mb-2"
              :min="form.startDate"

          >
          </b-form-datepicker>
          <b-form-invalid-feedback
              id="endDate-live-feedback"
          >End Date should be Equal or ahead on start Date
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    </b-container>
  </div>

</template>

<script>
import { validationMixin } from "vuelidate";
import { required,  } from 'vuelidate/lib/validators'

export default {
  name: 'AnnouncementNewComp',
  mixins: [validationMixin],
  props: ['id'],
  data() {
    return {
      errors:[],
      form: {
        title: null,
        content: null,
        startDate: null,
        endDate: null,
        active: false
      },
      parentResponse: [],
      editing: false,
      show: true,
    }
  },
  validations: {
    form:{
      title: {
        required,
      },
      content: {
        required,
      },
      startDate: {
        required,
      },
      endDate: {
        required,
      },
    }

  },
  computed: {
    isEditAnnouncementForm(){
      return (this.id !== undefined);
    },

  },
  created(){
    console.log(this.id );
    if (this.isEditAnnouncementForm) {
      this.fetchAnnouncement();
      this.editing = true;
      console.log("this is edit form");
    } else {
      this.editing = false;
      console.log("this is Create form");
      // this
    }
  },
  watch: {
    'id': {
      handler: function() {
        if (! this.isEditAnnouncementForm){
          this.resetForm();
        }
      },
      deep: true
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        title: null,
        content: null,
        startDate: null,
        endDate: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit(event) {

      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      if(this.isEditAnnouncementForm){
        this.updateAnnouncement();

      } else {
        this.newAnnouncement();
      }
      event.preventDefault()
    },

    newAnnouncement(){
      const formData = this.form;
      const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
      const baseURI = API_BASE_URL + '/announcement/create'
      const token = process.env.VUE_APP_API_TOKEN;

      formData.active = false;

      this.$http.post(baseURI, formData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer '+token,
        },
      })
          .then((result) => {
            const data = result.data;
            if( data.results !== undefined){
              alert("New Announcement created successfully");
            }
          })
    },

    updateAnnouncement(){
      const formData = this.form;
      const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
      const baseURI = API_BASE_URL + '/announcement/update'
      const token = process.env.VUE_APP_API_TOKEN;
      this.$http.post(baseURI, formData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer '+token,
        },
      })
          .then((result) => {
            const data = result.data;
            if( data.results !== undefined){
              alert("Update Announcement success");
            }
          })

      alert("Form submitted!");


    },

    fetchAnnouncement(){

        const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
        const baseURI = API_BASE_URL + '/announcement/' ;
        const token = process.env.VUE_APP_API_TOKEN;

        const formData = {
          id: this.id
        }

       this.$http.post(baseURI,
            formData,{
              headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
              },
            })

            .then((result) => {

              const data = result.data;

              if( data.results !== undefined){
                this.parentResponse = data.results;
                let announcement = JSON.parse(JSON.stringify(data.results));
                this.form = announcement.announcement;
              }
            })
            .catch(function (error) {
              console.log(error);
            });







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