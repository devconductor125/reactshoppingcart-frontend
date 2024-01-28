import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from './axios';

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (arg, {rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("/cart/getCart", {
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

export const makeOrder = createAsyncThunk(
  "cart/makeOrder",
  async (arg, {getState, rejectWithValue}) => {
    const {cart} = getState().cart;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("/order/createOrder", cart, {
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
)

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProdcutInCart",
  async({productId}, {getState, rejectWithValue}) => {
    const {cart} = getState().cart;
    const updatedCart = {...cart};
    updatedCart.products = [...cart?.products ?? []];
    const existingProductIndex = updatedCart.products.findIndex(p => Number(p.productId) === productId);
    if (existingProductIndex < 0) {
      return rejectWithValue('Product not found in cart');
    }
    const [removedProduct] = updatedCart.products.splice(existingProductIndex, 1);
    updatedCart.totalPrice -= removedProduct.quantity * removedProduct.productDetail.precio;
    updatedCart.totalProducts -= 1;
    updatedCart.totalQuantity -= removedProduct.quantity;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("/cart/creatOrUpdate", updatedCart, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
)

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ productId, quantity, productDetail }, { getState, rejectWithValue }) => {
    const { cart } = getState().cart; 
    const updatedCart = { ...cart };
    updatedCart.products = [...cart?.products ?? []];
    const existingProductIndex = updatedCart.products.findIndex(p => Number(p.productId) === productId);
    if (existingProductIndex >= 0) {
      const updatedProduct = { ...updatedCart.products[existingProductIndex] };
      updatedProduct.quantity = Number(updatedProduct.quantity) + quantity;
      updatedCart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedCart.products.push({ productId, quantity, productDetail });
    }
    updatedCart.totalPrice = Number(updatedCart.totalPrice ?? 0) + quantity * productDetail.precio;
    updatedCart.totalProducts = updatedCart.products.length;
    updatedCart.totalQuantity = Number(updatedCart.totalQuantity ?? 0) + quantity;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("/cart/creatOrUpdate", updatedCart, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {}
  }, 
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload.cart
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.cart = action.payload.cart;
      console.log(action.payload.cart)
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
      state.cart = action.payload.cart;
    });
    builder.addCase(removeProductFromCart.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(makeOrder.fulfilled, (state, action) => {
      if(action.payload.code === 'success'){
        state.cart = {}
      }
    })
    builder.addCase(makeOrder.rejected, (state,action) => {
      state.error = action.payload;
    })
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
