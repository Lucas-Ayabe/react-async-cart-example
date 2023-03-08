import { findAll } from "../services/product.service";
import { useAsyncCallback } from "./use-async-callback";

export const useProducts = () => {
  return useAsyncCallback(findAll, []);
};
