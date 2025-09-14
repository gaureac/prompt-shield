/**
 * Detects email addresses in a given text.
 *
 * This function uses a regular expression to find all email addresses
 * in the provided input string. The pattern matches:
 * - A sequence of alphanumeric characters, dots (.), underscores (_),
 *   percent signs (%), plus signs (+), or hyphens (-) before the "@" symbol.
 * - A domain name consisting of alphanumeric characters, dots (.), or hyphens (-).
 * - A top-level domain (TLD) with 2 or more characters (e.g., .com, .org, .net).
 *
 * @param {string} text - The input text to search for email addresses.
 * @returns {string[]} - An array of detected email addresses, or an empty array if none are found.
 */
export const detectEmails = (text: string): string[] => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  return text.match(emailRegex) || [];
};

export const extractText = (el: HTMLElement): string => {
  const clone = el.cloneNode(true) as HTMLElement;

  clone
    .querySelectorAll('[data-placeholder], .placeholder')
    .forEach(p => p.remove());

  return clone.innerText.trim();
};
