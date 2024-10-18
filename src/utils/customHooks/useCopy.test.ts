import { beforeEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCopy } from './index';

describe('Custom Hook useCopy', () => {
  beforeEach(() => {
    // Mock `execCommand` if it does not exist in the environment
    if (!document.execCommand) {
      document.execCommand = vi.fn();
    }
    
    vi.restoreAllMocks();
  });

  test('should copy text using navigator.clipboard.writeText when available', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
    });

    const { result } = renderHook(() => useCopy());

    let copyResult: boolean;

    await act(async () => {
      copyResult = await result.current('Hello World');
    });

    expect(writeTextMock).toHaveBeenCalledWith('Hello World');
    expect(copyResult!).toBe(true);
  });

  test('should copy text using document.execCommand when navigator.clipboard is not available', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, writable: true });

    const execCommandMock = vi.fn().mockReturnValue(true);
    vi.spyOn(document, 'execCommand').mockImplementation(execCommandMock);

    const createRangeMock = vi.fn(() => ({
      selectNodeContents: vi.fn(),
    }));
    const getSelectionMock = vi.fn(() => ({
      removeAllRanges: vi.fn(),
      addRange: vi.fn(),
      removeRange: vi.fn(),
    }));
    vi.spyOn(document, 'createRange').mockImplementation(createRangeMock);
    vi.spyOn(document, 'getSelection').mockImplementation(getSelectionMock);

    const appendChildMock = vi.spyOn(document.body, 'appendChild');
    const removeChildMock = vi.spyOn(document.body, 'removeChild');

    const { result } = renderHook(() => useCopy());

    let copyResult: boolean;

    await act(async () => {
      copyResult = await result.current('Hello World');
    });

    expect(execCommandMock).toHaveBeenCalledWith('copy');
    expect(appendChildMock).toHaveBeenCalled();
    expect(removeChildMock).toHaveBeenCalled();
    expect(copyResult!).toBe(true);
  });

  test('should return false if copying fails', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Failed to copy'));
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: writeTextMock,
      },
      writable: true,
    });

    const { result } = renderHook(() => useCopy());

    let copyResult: boolean;

    await act(async () => {
      copyResult = await result.current('Hello World');
    });

    expect(copyResult!).toBe(false);
  });
})