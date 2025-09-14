import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmailsState } from './types';
import { addEmailsToHistory } from '@/utils/addToHistory.ts';

const initialState: EmailsState = {
  current: [],
  history: {},
};

const emailsSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    setCurrentEmails: (state, action: PayloadAction<{ emails: string[] }>) => {
      state.current = action.payload.emails;
    },
    addToHistory: (state, action: PayloadAction<{ emails: string[] }>) => {
      state.history = addEmailsToHistory(state.history, action.payload.emails);
    },
    dismissEmail: (state, action: PayloadAction<{ email: string }>) => {
      state.history[action.payload.email].dismissedTs = Date.now();
    },
    hydrate: (state, action: PayloadAction<EmailsState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCurrentEmails, addToHistory, dismissEmail, hydrate } =
  emailsSlice.actions;

export default emailsSlice.reducer;
