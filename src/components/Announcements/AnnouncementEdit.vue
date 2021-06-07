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
              id="startDate"
              v-model="$v.form.startDate.$model"
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
              v-model="$v.form.endDate.$model"
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
import { mapGetters, mapActions } from "vuex";

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
    ...mapGetters({Announcements: "StateAnnouncements", User: "StateUser"}),
    isEditAnnouncementForm(){
      return (this.id !== undefined);
    },


  },
  created(){
    console.log(this.id );
    if (this.isEditAnnouncementForm) {
      this.fetchAnnouncement();
      this.editing = true;
    } else {
      this.editing = false;
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
    ...mapActions([ "CreateAnnouncement", "UpdateAnnouncement"]),
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
      const formData = this.form;

      if(this.isEditAnnouncementForm){

        this.UpdateAnnouncement(formData);

      } else {
        formData.active = false;
        this.CreateAnnouncement(formData);
      }
      event.preventDefault()
    },

    /**
     * @TODO move this function to Vuex class
     */
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