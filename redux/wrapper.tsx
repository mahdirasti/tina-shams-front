"use client";

import { ReactNode, useEffect, useState } from "react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

type Props = {
  children: ReactNode;
};
export default function ReduxWrapper({ children }: Props) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined && init === false) setInit(true);
  }, [init]);

  useEffect(() => {
    // Debug: Log when persistence is ready
    const unsubscribe = persistor.subscribe(() => {
      const { bootstrapped } = persistor.getState();
      if (bootstrapped) {
        console.log("Redux Persist bootstrapped successfully");

        // Log the rehydrated state
        const state = store.getState();
        console.log("Rehydrated state:", {
          cart: {
            items: state.cart.items.length,
            total_items: state.cart.total_items,
          },
          auth: {
            hasAccessToken: !!state.authReducer.access_token,
            hasUser: !!state.authReducer.user,
            isLoading: state.authReducer.is_loading,
          },
        });
      }
    });

    return unsubscribe;
  }, []);

  if (init === false) return null; //Todo loading ...

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
