import ApiService from "@/common/api.service";
import {
  ADD_ERROR,
  ADD_REST_ERROR,
  INSERT_CE,
  UPDATE_CE,
  DELETE_CE
} from "./actions.type";

const state = {

};

const getters = {

};

const actions = {
  [INSERT_CE](context, payload) {
    return new Promise((resolve, reject) => {
      if (!context.getters.documentId) {
        context.dispatch(ADD_ERROR, "no_doc_id")
        return;
      }
      if (!context.getters.currentUser.token) {
        context.dispatch(ADD_ERROR, "no_token")
        return;
      }
      ApiService.setHeader(context.getters.currentUser.token)
      ApiService.post("questionnaire/" + context.getters.documentId + "/ce", payload)
        .then(({ data }) => {
          if (data.error || data.data == null) {
            throw data
          }
          resolve(data);
        })
        .catch((response) => {
          context.dispatch(ADD_REST_ERROR, response);
          reject(response)

        });
    });
  },
  [UPDATE_CE](context, payload) {
    return new Promise((resolve, reject) => {
      if (!context.getters.documentId) {
        context.dispatch(ADD_ERROR, "no_doc_id")
        return;
      }
      if (!context.getters.currentUser.token) {
        context.dispatch(ADD_ERROR, "no_token")
        return;
      }
      ApiService.setHeader(context.getters.currentUser.token)
      ApiService.patch("questionnaire/" + context.getters.documentId + "/ce", payload)
        .then(({ data }) => {
          if (data.error || data.data == null) {
            throw data
          }
          resolve(data);
        })
        .catch((response) => {
          context.dispatch(ADD_REST_ERROR, response);
          reject(response)

        });
    });
  },
  [DELETE_CE](context) {
    return new Promise((resolve, reject) => {
      if (!context.getters.documentId) {
        context.dispatch(ADD_ERROR, "no_doc_id")
        return;
      }
      if (!context.getters.currentUser.token) {
        context.dispatch(ADD_ERROR, "no_token")
        return;
      }
      ApiService.setHeader(context.getters.currentUser.token)
      ApiService.delete("questionnaire/" + context.getters.documentId + "/ce", {})
        .then(({ data }) => {
          if (data.error || data.data == null) {
            throw data
          }
          resolve(data);
        })
        .catch((response) => {
          context.dispatch(ADD_REST_ERROR, response);
          reject(response)

        });
    });
  }
};

const mutations = {

};

export default {
  state,
  actions,
  mutations,
  getters
};