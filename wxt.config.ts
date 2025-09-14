import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Prompt Shield',
    description: 'Detects email leaks in ChatGPT prompts',
    manifest_version: 3,
    permissions: ['storage', 'scripting', 'notifications', 'activeTab'],
    host_permissions: ['*://chatgpt.com/*', '*://chat.openai.com/*'],
    content_scripts: [
      {
        matches: ['*://chat.openai.com/*', '*://chatgpt.com/*'],
        js: ['content-scripts/content.js'],
        run_at: 'document_idle',
      },
    ],
    action: {
      default_popup: 'popup.html',
      default_title: 'Prompt Shield',
    },
    background: {
      service_worker: 'background',
    },
  },
});
