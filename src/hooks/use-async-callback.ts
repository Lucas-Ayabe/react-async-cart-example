import React, { useCallback, useEffect, useReducer } from "react";

type AsyncProvider<R = any> = () => Promise<R>;
type UsePromiseInput<T> = AsyncProvider<T>;
type UsePromiseOutput<T, E extends Error = Error> =
  | [null, "pending"]
  | [E, "rejected"]
  | [T, "resolved"];

type PromiseState<T, E extends Error = Error> =
  | { state: "pending" }
  | { state: "rejected"; error: E }
  | { state: "resolved"; data: T };

type PromiseAction<T, E extends Error = Error> =
  | { type: "PROMISE_IDLE" }
  | { type: "PROMISE_RESOLVED"; payload: T }
  | { type: "PROMISE_REJECTED"; payload: E };

type PromiseReducer = <T>(
  state: PromiseState<T, Error>,
  action: PromiseAction<T, Error>
) => PromiseState<T, Error>;

const promiseReducer: PromiseReducer = (_, action) => {
  switch (action.type) {
    case "PROMISE_IDLE":
      return { state: "pending" };
    case "PROMISE_REJECTED":
      return { state: "rejected", error: action.payload };
    case "PROMISE_RESOLVED":
      return { state: "resolved", data: action.payload };
  }
};

export const useAsyncCallback = <T>(
  asyncCallback: UsePromiseInput<T>,
  deps: React.DependencyList = []
): UsePromiseOutput<T> => {
  const [state, dispatch] = useReducer(promiseReducer, { state: "pending" });
  const promiseProvider = useCallback(asyncCallback, deps);

  useEffect(() => {
    dispatch({ type: "PROMISE_IDLE" });
    promiseProvider()
      .then((payload) => dispatch({ type: "PROMISE_RESOLVED", payload }))
      .catch((payload) => dispatch({ type: "PROMISE_REJECTED", payload }));
  }, [promiseProvider]);

  switch (state.state) {
    case "pending":
      return [null, "pending"];
    case "rejected":
      return [state.error, "rejected"];
    case "resolved":
      return [state.data as T, "resolved"];
  }
};
