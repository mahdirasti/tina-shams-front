// redux/store.ts
import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./slices/auth-slice";
import generalReducer from "./slices/general-slice";

const persistConfig = {
  key: "root",
  storage,
};

export const resetStoreAction = createAction("RESET");

const combinedReducers = combineReducers({
  authReducer: authReducer,
  general: generalReducer,
});

const rootReducer = (
  state: ReturnType<typeof combinedReducers> | undefined,
  action: ReturnType<typeof resetStoreAction>
) => {
  if (action.type === resetStoreAction.type) {
    state = undefined;
  }

  return combinedReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
