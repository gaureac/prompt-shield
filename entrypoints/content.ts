import { handleEmailDetection } from '../utils/emailDetection';
import { findTextarea } from '../utils/findTextarea';
import { injectUI } from '@/entrypoints/ui/injectUI.tsx';

export default defineContentScript({
  matches: ['*://chat.openai.com/*', '*://chatgpt.com/*'],
  main() {
    injectUI();

    document.addEventListener(
      'click',
      async e => {
        const sendButton = (e.target as HTMLElement)?.closest(
          '[data-testid="send-button"]'
        );

        if (!sendButton) return;

        const textarea = findTextarea();

        if (!textarea) return;

        const emailsToWarn = await handleEmailDetection(textarea);

        if (emailsToWarn.length > 0) {
          window.postMessage(
            {
              type: 'OPEN_MODAL',
              payload: { emails: emailsToWarn },
            },
            '*'
          );
        }
      },
      true
    );
  },
});
