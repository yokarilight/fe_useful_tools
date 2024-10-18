import { useCallback } from 'react';

export default function useCopy() {
  const copy = useCallback(async (text: string): Promise<boolean> => {
    // check if the browser supports the Clipboard API
    if (navigator?.clipboard) {
      try {
        await navigator.clipboard.writeText(text);

        return true;
      } catch (error) {
        console.error('Failed to copy with Clipboard API:', error);

        return false;
      }
    } else {
      // fallback for browsers that don't support Clipboard API
      const range = document.createRange();
      const selection = document.getSelection();
      const mark = document.createElement('span');

      mark.textContent = text;

      // avoid screen readers from reading out loud the text
      mark.ariaHidden = 'true';

      // reset user styles for span element
      mark.style.all = 'unset';

      // prevents scrolling to the end of the page
      mark.style.position = 'fixed';
      mark.style.top = '0px';
      mark.style.clip = 'rect(0, 0, 0, 0)';
      // used to preserve spaces and line breaks
      mark.style.whiteSpace = 'pre';
      // do not inherit user-select (it may be `none`)
      mark.style.userSelect = 'text';

      document.body.appendChild(mark);
      range.selectNodeContents(mark);

      if (selection) {
        selection.removeAllRanges(); // clear any existing selections
        selection.addRange(range); // select the new range
      }

      const successful = document.execCommand('copy');
  
      if (successful) {
        if (selection) {
          if (typeof selection.removeRange === 'function') {
            selection.removeRange(range);
          } else {
            selection.removeAllRanges();
          }
        }
  
        if (mark) {
          document.body.removeChild(mark);
        }
      } else {
        console.error('Failed to copy with execCommand');

        return false;
      }
    }

    return true;
  }, []);

  return copy;
}
