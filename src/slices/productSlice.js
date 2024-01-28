import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from './axios';

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (arg, {rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("/product/getall", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (productId, {rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("/product/getproduct", productId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: []
  }, 
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.products
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.products = action.payload.product
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
