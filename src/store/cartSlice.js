import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCart: (state, { payload: id }) => {
      const inCart = state.items.find((item) => item.id === id);
      return {
        ...state,
        items: inCart
          ? [
              ...state.items.map((item) =>
                Number(item.id) === Number(id)
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
            ]
          : [
              ...state.items,
              {
                id,
                quantity: 1,
              },
            ],
      };
    },
    decrementCart: (state, { payload: id }) => ({
      ...state,
      items: [
        ...state.items.map((item) =>
          Number(item.id) === Number(id)
            ? {
                ...item,
                quantity:
                  item.quantity === 0 ? item.quantity : item.quantity - 1,
              }
            : item
        ),
      ],
    }),
  },
});

export const { incrementCart, decrementCart } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectItemsCount = (state) =>
  state.cart.items.reduce((acc, current) => acc + current.quantity, 0);

export default cartSlice.reducer;
