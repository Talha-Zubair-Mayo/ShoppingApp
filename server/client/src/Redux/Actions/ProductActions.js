import axios from "axios";
import {
  Product_List_request,
  Product_List_Success,
  Product_List_Fails,
  Product_Details_request,
  Product_Details_Success,
  Product_Details_Fails,
} from "../Constants/ProductConstants";

export const ProductListaction = () => async (dispatch) => {
  try {
    dispatch({
      type: Product_List_request,
    });

    const { data } = await axios.get(`/api/products`);

    dispatch({
      type: Product_List_Success,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);

    dispatch({
      type: Product_List_Fails,
      payload: error.response,
    });
  }
};

export const ProductDetailsAction = (id) => async (dispatch) => {  try {
    dispatch({
      type: Product_Details_request,
    });
    const { data } =  await axios.get(`/api/products/${id}`);
    dispatch({
      type: Product_Details_Success,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: Product_Details_Fails,
      payload: error.response,
    });
  }
};
