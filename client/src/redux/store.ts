import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

import saga from "./saga";
import authSlice from "./auth/authSlice";
import boardSlice from "./board/boardSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [boardSlice.name]: boardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware);
  },
});

sagaMiddleware.run(saga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
