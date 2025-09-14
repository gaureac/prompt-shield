export function findTextarea(): HTMLElement | null {
  return (document.querySelector(
    'div[contenteditable="true"]#prompt-textarea'
  ) ||
    document.querySelector('.ProseMirror[contenteditable="true"]') ||
    document.querySelector('div[contenteditable="true"]') ||
    document.querySelector('div.ProseMirror')) as HTMLElement | null;
}
