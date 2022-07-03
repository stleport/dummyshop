import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCart: (state, { payload: { id, stock } }) => {
      const inCart = state.items.find((item) => item.productId === id);

      return {
        ...state,
        items: inCart
          ? [
              ...state.items.map((item) =>
                Number(item.productId) === Number(id)
                  ? {
                      ...item,
                      quantity:
                        item.quantity === stock
                          ? item.quantity
                          : item.quantity + 1,
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
    decrementCart: (state, { payload: { id } }) => ({
      ...state,
      items: [
        ...state.items.map((item) =>
          Number(item.productId) === Number(id)
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
export const selectItem = createSelector(
  [(state) => state.cart.items, (state, id) => id],
  (items, id) => items.find((item) => String(item.productId) === id)
);

export const selectItemsCount = (state) =>
  state.cart.items.reduce((acc, current) => acc + current.quantity, 0);

export default cartSlice.reducer;
