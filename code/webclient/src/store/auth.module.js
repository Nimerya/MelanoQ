import ApiService from "@/common/api.service";
import AuthService from "@/common/auth.service";
import {
  LOGIN,
  LOGOUT,
  ADD_REST_ERROR,
  ADD_MESSAGE
} from "./actions.type";
import { SET_AUTH, PURGE_AUTH } from "./mutations.type";

const state = {
  // user.role = physician, nurse, researcher, admin
  // user.type = physician, case, control
  user: AuthService.getUser(),
  isAuthenticated: !!AuthService.getUser().token,
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  type(state) {
    return state.type;
  }

};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      ApiService.post("authentication", credentials)
        .then(({ data }) => {
          if (data.error || data.data == null) {
            throw data
          }
          context.commit(SET_AUTH, data.data);
          context.dispatch(ADD_MESSAGE, "success")
          resolve(data);
        })
        .catch((response) => {
          context.dispatch(ADD_REST_ERROR, response);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
    context.dispatch(ADD_MESSAGE, "success")

  }
};

const mutations = {

  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    AuthService.saveUser(user);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    AuthService.destroyUser();
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};