import axios from 'axios';

//const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

const getHeaders = function(state){
    return {
        'Authorization': 'Bearer ' + state.user_token,
        "Content-Type": "application/json",
    };
}
const state = {
    user: null,
    announcements: null,
    user_token: null,
};
const getters = {
    isAuthenticated(state){
        return state.user_token !== null
    },
    StateAnnouncements: (state) => state.announcements,
    StateUser: (state) => state.user,
};

const actions = {
    async LogIn({commit}, user) {
        await axios.post("api/login", user)

        .then((response) => {
          let  data = response.data.token
            commit("SET_USER", user.email)
            commit("SET_TOKEN", data);
        }, (error) => {
            console.log(error);
        });
    },
    async CreateAnnouncement( {state }, announcement) {

        let headers =  getHeaders(state)
        window.axios.post( "/api/announcement/create", announcement, {headers})
            .then((result) => {
                console.log();
                const data = result.data;
                console.log(data);
                if( data.results !== undefined){
                    const data = result.data;
                    if( data.results !== undefined){
                        alert("New Announcement created successfully");
                    }
                }
            })
            .catch(error => {
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
    },

    async UpdateAnnouncement( {state }, announcement) {
        let headers =  getHeaders(state);
        window.axios.post( "/api/announcement/update", announcement, {headers})
            .then((result) => {
                console.log();
                const data = result.data;
                console.log(data);
                if( data.results !== undefined){
                    const data = result.data;
                    if( data.results !== undefined){
                        alert("Update Announcement success");
                    }
                }
            })
            .catch(error => {
                this.errorMessage = error.message;
                console.error("There was an error!", error);
            });
    },


    async GetAnnouncements({ state, commit }) {
        const headers = {
            'Authorization': 'Bearer ' + state.user_token,
            "Content-Type": "application/json",
        };
        axios.get("api/announcements", {headers})
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
                        commit("SET_ANNOUNCEMENTS", this.announcements);
                    }
                }
            })
            .catch(error => {
                this.errorMessage = error.message;
                commit("SET_ANNOUNCEMENTS", null);
                console.error("There was an error!", error);
            });
    },

    async DeleteAnnouncement({ state, commit }, id) {
        let headers =  getHeaders(state);

        let formData = {
            'id': id,
        };
        axios.post("api/announcement/delete", formData, {headers})
            .then((result) => {
                console.log();
                const data = result.data;
                console.log(data);
                if( data.results !== undefined){
                    const data = result.data;
                    if( data.results !== undefined){
                        commit('DELETE_ANNOUNCEMENT', id)
                        console.log("Deleted row" + id)
                    }
                }
            })
            .catch(error => {
                this.errorMessage = error.message;
                commit("SET_ANNOUNCEMENTS", null);
                console.error("There was an error!", error);
            });
    },

    async LogOut({ commit }) {
        let user = null;
        commit("LOGOUT", user);
    },

};
const mutations = {
    SET_USER(state, username) {
        state.user = username;
    },

    SET_TOKEN(state, token){
        state.user_token = token
    },

    SET_ANNOUNCEMENTS(state, announcements) {
        state.announcements = announcements;
    },
    LOGOUT(state, user) {
        state.user = user;
        state.user_token = null;
    },

    DELETE_ANNOUNCEMENT(state,id){
        let index = state.announcements.findIndex(announcement => announcement.id == id)
        state.announcements.splice(index, 1)
    }

};
export default {
    state,
    getters,
    actions,
    mutations
};