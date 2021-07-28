import axios from "axios";
import {
  User_Login_Request,
  User_Login_Success,
  User_Login_Fails,
  User_Register_Request,
  User_Register_Success,
  User_Register_Fails,
  User_Token_Request,
  User_Token_Success,
  User_Token_Fails,
  User_Info_Request,
  User_Info_Success,
  User_Info_Fails,
  User_Logout,
} from "../Constants/UserConstants";

export const Logout = () => async (dispatch) => {
  localStorage.clear();
  await axios.get(`/logout`);
  dispatch({
    type: User_Logout,
  });
};

export const UserRegisterAction =
  (name, email, password, confirmpassword) => async (dispatch) => {
    try {
      dispatch({
        type: User_Register_Request,
      });
      const res = await axios.post(`/register`, {
        name,
        email,
        password,
        confirmpassword,
      });
      if (res) {
        localStorage.setItem("userLog", true);
      }
      console.log(res);
      dispatch({
        type: User_Register_Success,
        payload: res,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: User_Register_Fails,
        payload: error.response.data.msg,
      });
    }
  };
export const UserLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: User_Login_Request,
    });
    const res = await axios.post(`/login`, { email, password });
    if (res) {
      localStorage.setItem("userLog", true);
    }
    console.log(res);
    dispatch({
      type: User_Login_Success,
      payload: res,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: User_Login_Fails,
      payload: error.response.data.msg,
    });
  }
};

export const UserTokenAction = () => async (dispatch) => {
  try {
    dispatch({
      type: User_Token_Request,
    });
    const res = await axios.get(`/token`);
    const token = res.data.accesstoken;
    dispatch({
      type: User_Token_Success,
      payload: token,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: User_Token_Fails,
      payload: error.response.data.msg,
    });
  }
};

export const UserInfoAction = (token) => async (dispatch) => {
  try {
    dispatch({
      type: User_Info_Request,
    });
    const { data } = await axios.get(`/userProfile`, {
      headers: {
        Authorization: token,
      },
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
      type: User_Info_Success,
      payload: data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: User_Info_Fails,
      payload: error.response.data.msg,
    });
  }
};
