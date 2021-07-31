import axios from "axios";
import {
  Order_Create_request,
  Order_Create_Success,
  Order_Create_Fails,
  Order_Details_request,
  Order_Details_Success,
  Order_Details_Fails,
  Order_LIST_request,
  Order_LIST_Success,
  Order_LIST_Fails,
  Order_Payment_request,
  Order_Payment_Success,
  Order_Payment_Fails,
} from "../Constants/OrderConstant";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Order_Create_request,
    });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Contnet-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.post(`/api/order`, order, config);
    dispatch({ type: Order_Create_Success, payload: data });
  } catch (error) {
    dispatch({
      type: Order_Create_Fails,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Order_Details_request,
    });
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`/api/order/${id}`, config);
    dispatch({ type: Order_Details_Success, payload: data });
  } catch (error) {
    dispatch({
      type: Order_Details_Fails,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: Order_Payment_request,
    });
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.put(
      `/api/order/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({ type: Order_Payment_Success, payload: data });
  } catch (error) {
    dispatch({
      type: Order_Payment_Fails,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const MyOrdersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: Order_LIST_request,
    });
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    };
    const { data } = await axios.get(`/api/myorders`, config);

    dispatch({ type: Order_LIST_Success, payload: data });
  } catch (error) {
    dispatch({
      type: Order_LIST_Fails,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};
