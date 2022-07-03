import * as React from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useClient } from "./api-client";

function addOrReplaceItem(array, value) {
  return Array.from(
    new Map([
      ...array.map((item) => [item.productId, item]),
      [value.productId, value],
    ]).values()
  );
}

function useSafeDispatch(dispatch) {
  const mounted = React.useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);
  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

const defaultInitialState = { status: "idle", data: null, error: null };
function useAsync(initialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = React.useReducer(
    (s, a) => ({ ...s, ...a }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setData = React.useCallback(
    (data) => safeSetState({ data, status: "resolved" }),
    [safeSetState]
  );
  const setError = React.useCallback(
    (error) => safeSetState({ error, status: "rejected" }),
    [safeSetState]
  );
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      safeSetState({ status: "pending" });
      return promise.then(
        (data) => {
          setData(data);
          return data;
        },
        (error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setData, setError]
  );

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}

async function updateCart(newCartItem) {
  return fetch(`https://fakestoreapi.com/carts/1`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCartItem),
  }).then(async (res) => await res.json());
}

function useCart() {
  const client = useClient();
  const { data: cart } = useQuery(
    ["cart"],
    async () => await client("carts/1")
  );
  const queryClient = useQueryClient();
  const cartItems =
    cart?.products.map(({ productId, quantity }) => ({
      productId,
      quantity,
    })) || [];
  const {
    mutate,
    isLoading: pending,
    status,
  } = useMutation((newCartItem) => updateCart(newCartItem), {
    onMutate: async (newCartItem) => {
      const previousCart = queryClient.getQueryData("cart");
      queryClient.setQueryData("cart", newCartItem);

      return { previousCart };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data);
    },
  });

  const incrementCart = ({ productId, quantity }) => {
    return (e) => {
      e.stopPropagation();
      mutate({
        products: addOrReplaceItem(cartItems, {
          productId,
          quantity: quantity + 1,
        }),
      });
    };
  };

  const decrementCart =
    ({ productId, quantity }) =>
    (e) => {
      e.stopPropagation();
      mutate({
        products: addOrReplaceItem(cartItems, {
          productId,
          quantity: quantity === 0 ? quantity : quantity - 1,
        }),
      });
    };

  return {
    incrementCart,
    decrementCart,
    cartItems: cart?.products,
    pending,
    status,
  };
}

export { useAsync, useCart };
