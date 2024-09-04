import { createSlice } from "@reduxjs/toolkit";
import { createSelector, PayloadAction } from "@reduxjs/toolkit";

export interface IOrderElement {
  name: string;
  unit_price: number;
  price: number;
  amount: number;
  thumbnail: string;
}

export interface CartState {
  list: IOrderElement[] | [];
}

const initialState: CartState = {
  list: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrderElement>) => {
      state.list = [...state.list, action.payload];
    },
    updateOrder: (
      state,
      action: PayloadAction<{
        orderToUpdate?: IOrderElement;
        orderName?: string;
      }>,
    ) => {
      const orderName = action.payload.orderName;
      const order = action.payload.orderToUpdate;
      if (order !== undefined && orderName !== undefined) {
        state.list.map((obj) => {
          obj.name === orderName ? { ...obj, ...order } : obj;
        });
      }
      return;
    },
    deleteOrder: (state, action: PayloadAction<{ orderName?: string }>) => {
      const orderName = action.payload.orderName;
      if (orderName) {
        state.list = state.list.filter((obj) => obj.name !== orderName);
      }
      return;
    },
    resetOrder: (state) => {
      state.list = [];
    },
  },
});
