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

  if (init === false) return null; //Todo loading ...

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
