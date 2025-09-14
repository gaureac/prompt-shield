import { detectEmails } from './detectEmails';
import { normalizeEmail } from './normalizeEmail';

/**
 * Handles the detection of emails within the content of a given textarea element.
 *
 * This function extracts the text content from the provided textarea, detects email addresses,
 * normalizes them, and checks for new emails that require warnings via a browser runtime message.
 *
 * @param {HTMLElement} textarea - The textarea element from which to extract and process text.
 * @returns {Promise<string[]>} - A promise that resolves to an array of emails that require warnings.
 */
export async function handleEmailDetection(
  textarea: HTMLElement
): Promise<string[]> {
  // Extract and trim the text content from the textarea
  const text = textarea.innerText.trim();
  if (!text) return [];

  let emails = detectEmails(text);
  if (emails.length === 0) return [];

  // Normalize the detected emails and remove duplicates
  emails = [...new Set(emails.map(normalizeEmail))];

  try {
    // Check if the extension context is still valid
    if (!browser.runtime?.id) {
      console.warn('Extension context invalidated');
      return [];
    }

    // Send a message to the browser runtime to check for new emails requiring warnings
    const { emailsToWarn = [] } = await browser.runtime.sendMessage({
      type: 'CHECK_NEW_EMAILS',
      emails,
    });

    return emailsToWarn;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes('Extension context invalidated')) {
      console.warn('Extension was reloaded, skipping email check');
      return [];
    }
    console.error('Failed to check emails:', error);
    return [];
  }
}
