import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './emails/slice';
import modalReducer from './modal/slice';

const store = configureStore({
  reducer: {
    emails: emailReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
