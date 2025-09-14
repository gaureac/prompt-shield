import { storage } from 'wxt/utils/storage';
import { EmailsState } from '@/store/emails/types.ts';
import { cleanExpired } from '@/utils/cleanExpired';

export const STORAGE_KEY = 'sync:email-history';

/**
 * Retrieves the email state data from storage, initializes it if not present,
 * and cleans up expired entries in the history.
 *
 * @async
 * @function getDataFromStorage
 * @returns {Promise<EmailsState>} - A promise that resolves to the email state object.
 *
 * The function performs the following steps:
 * - Fetches the raw data from storage using the `STORAGE_KEY`.
 * - If no data is found, initializes the state with an empty `current` array and `history` object.
 * - Clears the `current` array and removes expired entries from the `history` using `cleanExpired`.
 * - Returns the processed email state object.
 */
export const getDataFromStorage = async (): Promise<EmailsState> => {
  const raw = await storage.getItem<EmailsState>(STORAGE_KEY);
  const initial: EmailsState = raw ?? { current: [], history: {} };

  initial.current = [];
  initial.history = cleanExpired(initial.history);
  return initial;
};

export const setDataToStorage = async (state: EmailsState): Promise<void> => {
  await storage.setItem(STORAGE_KEY, state);
};

/**
 * Filters a list of email addresses to determine which ones should trigger a warning.
 *
 * @async
 * @function getNewEmailsToWarn
 * @param {string[]} emails - An array of email addresses to check against the stored history.
 * @returns {Promise<string[]>} - A promise that resolves to an array of email addresses
 * that have not been dismissed.
 *
 * The function performs the following steps:
 * - Retrieves the current email state from storage using `getDataFromStorage`.
 * - Extracts the `history` object from the state, which contains metadata for each email.
 * - Filters the provided `emails` array to include only those emails that:
 *   - Are not present in the `history`, or
 *   - Do not have a `dismissedTs` field set.
 */
export const getNewEmailsToWarn = async (
  emails: string[]
): Promise<string[]> => {
  const state = await getDataFromStorage();
  const history = state.history;

  return emails.filter(email => {
    const info = history[email];
    return !info?.dismissedTs; // Only warn if not dismissed
  });
};
