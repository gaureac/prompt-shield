import { getNewEmailsToWarn } from '../utils/emailStorage';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'CHECK_NEW_EMAILS') {
      // Check if the extension context is still valid
      if (!browser.runtime?.id) {
        sendResponse({ emailsToWarn: [] });
        return false;
      }

      getNewEmailsToWarn(msg.emails)
        .then(emailsToWarn => {
          sendResponse({ emailsToWarn });
        })
        .catch(error => {
          console.error('Error checking emails:', error);
          sendResponse({ emailsToWarn: [] });
        });

      return true;
    }
  });
});
