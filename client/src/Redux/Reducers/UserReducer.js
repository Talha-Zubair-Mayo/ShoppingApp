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
} from "../Constants/UserConstants";

export const userLoginReducer = (state = [], action) => {
  switch (action.type) {
    case User_Login_Request:
      return { loading: true, userLogin: [] };
    case User_Login_Success:
      return { loading: false, userLogin: action.payload };
    case User_Login_Fails:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = [], action) => {
  switch (action.type) {
    case User_Register_Request:
      return { loading: true, userRegister: [] };
    case User_Register_Success:
      return { loading: false, userRegister: action.payload };
    case User_Register_Fails:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case User_Token_Request:
      return { loading: true, userToken: {} };
    case User_Token_Success:
      return { loading: false, userToken: action.payload };
    case User_Token_Fails:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case User_Info_Request:
      return { loading: true, userInfo: {} };
    case User_Info_Success:
      return { loading: false, userInfo: action.payload };
    case User_Info_Fails:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
