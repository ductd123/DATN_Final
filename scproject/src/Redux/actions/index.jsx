import { SUCCESS, ERROR } from "../constants";
import { apiRegister, apiLogin } from "../../Services/index";

// Thay đổi hàm doSignUp
export const doSignUp = (values) => {
  return async (dispatch) => {
    try {
      const res = await apiRegister.postSignUp(values);
      dispatch({
        type: SUCCESS,
        payload: res,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
    }
  };
};

// Thay đổi hàm doLogin
export const doLogin = (values) => {
  return async (dispatch) => {
    try {
      const res = await apiLogin.postLogin(values);
      dispatch({
        type: SUCCESS,
        payload: res,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
    }
  };
};

// Thay đổi hàm doCheckLogin
export const doCheckLogin = () => {
  return async (dispatch) => {
    try {
      const res = await apiLogin.getCheckLogin();
      dispatch({
        type: SUCCESS,
        payload: res,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data,
      });
    }
  };
};
