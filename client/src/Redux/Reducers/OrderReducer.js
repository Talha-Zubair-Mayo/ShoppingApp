import {
  Order_Create_request,
  Order_Create_Success,
  Order_Create_Fails,
  Order_Details_request,
  Order_Details_Success,
  Order_Details_Fails,
  Order_Payment_request,
  Order_Payment_Success,
  Order_Payment_Fails,
  Order_Payment_Reset,
  Order_LIST_request,
  Order_LIST_Success,
  Order_LIST_Fails,
} from "../Constants/OrderConstant";

export const orderCreateReducer = (state = [], action) => {
  switch (action.type) {
    case Order_Create_request:
      return { loading: true };
    case Order_Create_Success:
      return { loading: false, success: true, order: action.payload };
    case Order_Create_Fails:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case Order_Details_request:
      return {
        ...state,
        loading: true,
      };
    case Order_Details_Success:
      return {
        loading: false,
        order: action.payload,
      };
    case Order_Details_Fails:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case Order_Payment_request:
      return {
        loading: true,
      };
    case Order_Payment_Success:
      return {
        loading: false,
        success: true,
      };
    case Order_Payment_Fails:
      return {
        loading: false,
        error: action.payload,
      };
    case Order_Payment_Reset:
      return {};
    default:
      return state;
  }
};

export const orderLISTReducer = (state = [], action) => {
  switch (action.type) {
    case Order_LIST_request:
      return { loading: true };
    case Order_LIST_Success:
      return { loading: false, success: true, order: action.payload };
    case Order_LIST_Fails:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
