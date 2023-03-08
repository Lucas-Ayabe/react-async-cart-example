import { useReducer } from "react";

const not = (value: boolean) => !value;

export const useToggle = (initialState = false) => {
  return useReducer(not, initialState);
};
