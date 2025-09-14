const MS = 1000;
const HOUR = 60 * 60 * MS;

/**
 * Formats the remaining time until a given timestamp as a countdown string.
 *
 * @param ts - The starting timestamp in milliseconds.
 * @returns A formatted string representing the time left in the format "Xh Ym",
 * where X is the number of hours and Y is the number of minutes.
 *
 * The function calculates the time left as follows:
 * - Adds 24 hours (in milliseconds) to the given timestamp.
 * - Subtracts the current time (in milliseconds) from the result to get the remaining time.
 * - Converts the remaining time into hours and minutes.
 * - Returns the formatted string.
 */
export function formatCountdown(ts: number) {
  const left = ts + 24 * HOUR - Date.now();
  const hours = Math.floor(left / HOUR);
  const mins = Math.ceil((left % HOUR) / (60 * MS));
  return `${hours}h ${mins}m`;
}
