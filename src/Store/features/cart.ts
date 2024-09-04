import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

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
  list: [] as IOrderElement[],
};

const cartSlice = createSlice({
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
        state.list = [
          ...state.list.map((obj) => {
            return obj.name === orderName ? { ...order } : obj;
          }),
        ];
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

export default cartSlice;

export const { addOrder, deleteOrder, resetOrder, updateOrder } =
  cartSlice.actions;
