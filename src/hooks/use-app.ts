import { useMemo, useReducer } from "react";
import { Product } from "../domain";

type State = { list: Product[]; inCart: Product[] };
type ProductsReducer<A extends number | Product[]> = (
  state: State,
  action: A
) => State;

const byProductId = (productId: number) => {
  return ({ id }: Product) => id === productId;
};

export const addProductToCart: ProductsReducer<number> = (state, productId) => {
  const product = state.list.find(byProductId(productId));
  if (!product) return state;

  const canAdd = product.quantity - 1 >= 0;
  const quantityAdded = canAdd ? 1 : 0;

  const productInCart = state.inCart.find(byProductId(productId));
  const cartProducts = state.inCart.concat(
    productInCart ? [] : [{ ...product, quantity: 0 }]
  );

  return {
    list: state.list.map((product) => {
      return product.id === productId
        ? { ...product, quantity: product.quantity - quantityAdded }
        : product;
    }),
    inCart: cartProducts.map((product) => {
      return product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product;
    }),
  };
};

const appReducer: ProductsReducer<Product[] | number> = (state, action) => {
  if (typeof action === "number") return addProductToCart(state, action);

  return {
    ...state,
    list: action,
  };
};

export const useApp = (products: Product[]) => {
  const [productList, dispatch] = useReducer(appReducer, {
    list: products,
    inCart: [],
  });

  return {
    products: productList,
    addToCart: (id: number) => dispatch(id),
    onListLoaded: (list: Product[]) => dispatch(list),
  };
};
