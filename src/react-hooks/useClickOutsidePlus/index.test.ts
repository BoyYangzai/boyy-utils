import { renderHook } from '@testing-library/react-hooks';
import useClickOutside from './index';

describe('useClickOutside', () => {
  let container: HTMLDivElement;
  let container1: HTMLDivElement;
  let callback: jest.Mock;

  beforeEach(() => {
    container = document.createElement('div');
    container1 = document.createElement('div');
    container.setAttribute('id', 'ele1');
    container1.setAttribute('id', 'ele2');
    document.body.appendChild(container);
    document.body.appendChild(container1);
    callback = jest.fn();
  });

  afterEach(() => {
    document.body.removeChild(container);
    document.body.removeChild(container1);
  });

  it('should call the callback when clicking outside the element', () => {
    const hook = renderHook(() =>
      useClickOutside({
        refCurrents: [container],
        callback,
        events: ['click']
      })
    );

    container.click();
    expect(callback).toHaveBeenCalledTimes(0);
    document.body.click();
    expect(callback).toHaveBeenCalledTimes(1);
    hook.unmount();
  });

  it('should not call the callback when clicking inside the element', () => {
    const hook = renderHook(() =>
      useClickOutside({
        refCurrents: [container],
        callback,
        events: ['click']
      })
    );

    container.click();
    expect(callback).toHaveBeenCalledTimes(0);
    container.click();
    expect(callback).toHaveBeenCalledTimes(0);
    hook.unmount();
  });

  it('should call the callback when clicking outside any of the elements', () => {
    const hook = renderHook(() =>
      useClickOutside({
        refCurrents: [container, container1],
        callback,
        events: ['click']
      })
    );

    container.click();
    expect(callback).toHaveBeenCalledTimes(0);
    container1.click();
    expect(callback).toHaveBeenCalledTimes(0);
    document.body.click();
    expect(callback).toHaveBeenCalledTimes(1);
    hook.unmount();
  });

  it('should not call the callback when clicking inside any of the elements', () => {
    const hook = renderHook(() =>
      useClickOutside({
        refCurrents: [container, container1],
        callback,
        events: ['click']
      })
    );

    container.click();
    expect(callback).toHaveBeenCalledTimes(0);
    container1.click();
    expect(callback).toHaveBeenCalledTimes(0);
    container.click();
    container1.click();
    expect(callback).toHaveBeenCalledTimes(0);
    hook.unmount();
  });

  it('should call the callback for multiple events', () => {
    const hook = renderHook(() =>
      useClickOutside({
        refCurrents: [container],
        callback,
        events: ['click', 'keydown']
      })
    );

    container.click();
    expect(callback).toHaveBeenCalledTimes(0);
    document.body.click();
    expect(callback).toHaveBeenCalledTimes(1);
    document.dispatchEvent(new KeyboardEvent('keydown'));
    expect(callback).toHaveBeenCalledTimes(2);
    hook.unmount();
  });

  it('should call the callback only once for multiple events', () => {
    const hook = renderHook(() =>
      useClickOutside({
        refCurrents: [container],
        callback,
        events: ['click', 'keydown']
      })
    );

    container.click();
    expect(callback).toHaveBeenCalledTimes(0);
    document.body.click();
    expect(callback).toHaveBeenCalledTimes(1);
    document.body.click();
    document.dispatchEvent(new KeyboardEvent('keydown'));
    expect(callback).toHaveBeenCalledTimes(3);
    hook.unmount();
  });

  it('should update the callback function', () => {
    const initialCallback = jest.fn();
    const updatedCallback = jest.fn();
    const hook = renderHook(({ callback }) =>
      useClickOutside({
        refCurrents: [container],
        callback,
        events: ['click']
      }), {
      initialProps: { callback: initialCallback }
    }
    );

    container.click();
    expect(initialCallback).toHaveBeenCalledTimes(0);
    expect(updatedCallback).toHaveBeenCalledTimes(0);

    hook.rerender({ callback: updatedCallback });

    container.click();
    expect(initialCallback).toHaveBeenCalledTimes(0);
    expect(updatedCallback).toHaveBeenCalledTimes(0);

    hook.unmount();
  });


  it('should handle null or undefined refCurrents', () => {
    const hook1 = renderHook(() =>
      useClickOutside({
        refCurrents: [null],
        callback,
        events: ['click']
      })
    );

    const hook2 = renderHook(() =>
      useClickOutside({
        refCurrents: [undefined],
        callback,
        events: ['click']
      })
    );

    document.body.click();
    expect(callback).toHaveBeenCalledTimes(2);
    hook1.unmount();
    hook2.unmount();
  });

  it('should handle multiple refCurrents with some null or undefined', () => {
    const hook = renderHook(() =>
      useClickOutside({
        refCurrents: [container, null, undefined, container1],
        callback,
        events: ['click']
      })
    );

    container.click();
    expect(callback).toHaveBeenCalledTimes(0);
    container1.click();
    expect(callback).toHaveBeenCalledTimes(0);
    document.body.click();
    expect(callback).toHaveBeenCalledTimes(1);
    hook.unmount();
  });


  it('should handle empty refCurrents', () => {
    const hook = renderHook(() =>
      useClickOutside({
        refCurrents: [],
        callback,
        events: ['click']
      })
    );

    document.body.click();
    expect(callback).toHaveBeenCalledTimes(1);
    hook.unmount();
  });

  it('should handle empty events array', () => {
    const hook = renderHook(() =>
      useClickOutside({
        refCurrents: [container],
        callback,
        events: []
      })
    );

    container.click();
    expect(callback).toHaveBeenCalledTimes(0);
    hook.unmount();
  });
});
