import { H24 } from '@/utils/constants';

/**
 * Cleans up expired entries in a history object by removing or resetting the `dismissedTs` field
 * if it has exceeded the expiration time.
 *
 * @template T - A generic type extending a record where the key is a string and the value is an object
 * containing `timestamp` and an optional `dismissedTs`.
 * @param {T} history - The history object to be cleaned. Each key represents an entry, and the value
 * contains metadata including `timestamp` and optionally `dismissedTs`.
 * @returns {T} - A new history object with expired `dismissedTs` fields removed.
 *
 * The function works as follows:
 * - Retrieves the current timestamp.
 * - Iterates over the entries in the `history` object.
 * - For each entry:
 *   - Checks if the `dismissedTs` field has expired (i.e., the difference between the current time
 *     and `dismissedTs` is greater than or equal to `H24`).
 *   - If expired, sets `dismissedTs` to `undefined`. Otherwise, retains the original value.
 * - Returns a new history object with the updated entries.
 */
export const cleanExpired = <
  T extends Record<string, { timestamp: number; dismissedTs?: number }>,
>(
  history: T
): T => {
  const now = Date.now();
  const result: Record<string, { timestamp: number; dismissedTs?: number }> =
    {};

  Object.entries(history).forEach(([email, data]) => {
    const dismissedExpired = data.dismissedTs && now - data.dismissedTs >= H24;
    result[email] = {
      ...data,
      dismissedTs: dismissedExpired ? undefined : data.dismissedTs,
    };
  });

  return result as T;
};
