import createSagaMiddleware from 'redux-saga';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.ts";
import { watchAuthSaga } from "./authSaga.ts";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchAuthSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
