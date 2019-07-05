import ApiService from "@/common/api.service";
import AuthService from "@/common/auth.service";
import {
  ADD_REST_ERROR,
  INSERT_C3,
  UPDATE_C3,
  DELETE_C3
} from "./actions.type";

const state = {

};

const getters = {

};

const actions = {
  [INSERT_C3](context, payload) {
    return new Promise(resolve => {
      ApiService.setHeader(AuthService.getUser().token)
      ApiService.post("questionnaire/" + context.getters.documentId + "/c3", { payload })
        .then(({ data }) => {
          if (data.error || data.data == null) {
            throw data
          }
          resolve(data);
        })
        .catch((response) => {
          context.dispatch(ADD_REST_ERROR, response);
        });
    });
  },
  [UPDATE_C3](context, payload) {
    return new Promise(resolve => {
      ApiService.setHeader(AuthService.getUser().token)
      ApiService.patch("questionnaire/" + context.getters.documentId + "/c3", { payload })
        .then(({ data }) => {
          if (data.error || data.data == null) {
            throw data
          }
          resolve(data);
        })
        .catch((response) => {
          context.dispatch(ADD_REST_ERROR, response);
        });
    });
  },
  [DELETE_C3](context) {
    return new Promise(resolve => {
      ApiService.setHeader(AuthService.getUser().token)
      ApiService.delete("questionnaire/" + context.getters.documentId + "/c3", {})
        .then(({ data }) => {
          if (data.error || data.data == null) {
            throw data
          }
          resolve(data);
        })
        .catch((response) => {
          context.dispatch(ADD_REST_ERROR, response);
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