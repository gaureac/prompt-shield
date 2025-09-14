import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { H24 } from '@/utils/constants';

const selectEmailState = (state: RootState) => state.emails;

export const selectEmailHistory = createSelector(
  selectEmailState,
  emailState => emailState.history
);

export const selectCurrentEmails = createSelector(
  selectEmailState,
  emailState => emailState.current
);

export const selectDismissedEmails = createSelector(
  selectEmailState,
  emailState => {
    const now = Date.now();
    const dismissed: Record<string, number> = {};

    Object.entries(emailState.history).forEach(([email, info]) => {
      if (info.dismissedTs && now - info.dismissedTs < H24) {
        dismissed[email] = info.dismissedTs;
      }
    });

    return dismissed;
  }
);

export const selectActiveEmails = createSelector(
  [selectCurrentEmails, selectEmailHistory],
  (currentEmails, history) =>
    currentEmails.filter(email => {
      const dismissedTs = history[email]?.dismissedTs;
      if (!dismissedTs) return true;

      return Date.now() - dismissedTs >= H24;
    })
);

export const selectHistoryEntries = createSelector(
  selectEmailState,
  emailState =>
    Object.entries(emailState.history).map(([email, info]) => ({
      email,
      timestamp: info.timestamp,
      dismissedTs: info.dismissedTs,
      isDismissed: info.dismissedTs
        ? Date.now() - info.dismissedTs < H24
        : false,
    }))
);
