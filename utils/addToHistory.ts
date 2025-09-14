import { EmailsState } from '@/store/emails/types';

/**
 * Adds a list of email addresses to the history object, updating their timestamps.
 *
 * @param {EmailsState['history']} currentHistory - The current history object, where each key is an email and the value contains metadata.
 * @param {string[]} emails - An array of email addresses to be added or updated in the history.
 * @returns {EmailsState['history']} - A new history object with the added or updated email entries.
 *
 * The function works as follows:
 * - Iterates over the `emails` array and creates a new object (`newEntries`) where:
 *   - Each email is a key.
 *   - The value is an object containing the existing metadata (if any) from `currentHistory` and an updated `timestamp`.
 * - Merges the `newEntries` object with the `currentHistory` object to produce the updated history.
 */
export const addEmailsToHistory = (
  currentHistory: EmailsState['history'],
  emails: string[]
): EmailsState['history'] => {
  const newEntries = emails.reduce(
    (acc, email) => {
      acc[email] = {
        ...(currentHistory[email] || {}),
        timestamp: Date.now(),
      };
      return acc;
    },
    {} as EmailsState['history']
  );

  return { ...currentHistory, ...newEntries };
};
