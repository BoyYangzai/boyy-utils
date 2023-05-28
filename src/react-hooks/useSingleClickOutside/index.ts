import { MutableRefObject, useRef, useEffect, useCallback } from 'react';

const defaultEvent = 'click';

type RefType = HTMLElement | (() => HTMLElement | null) | null | undefined;

export default function useSingleClickOutside<T extends HTMLElement = any>(
  dom: RefType = undefined,
  onClickAway: (event: KeyboardEvent) => void,
  eventName: string = defaultEvent,
  listenerOptions?: boolean | AddEventListenerOptions | undefined,
): MutableRefObject<T> {
  const element = useRef<T>();

  const handler = useCallback(
    (event: any) => {
      const targetElement = typeof dom === 'function' ? dom() : dom;
      const el = targetElement || element.current;
      if (
        !el ||
        el.contains(event.target) ||
        (event.composedPath && event.composedPath().includes(el))
      ) {
        return;
      }

      onClickAway(event);
    },
    [element.current, onClickAway, dom],
  );

  useEffect(() => {
    document.addEventListener(eventName, handler, listenerOptions);

    return () => {
      document.removeEventListener(eventName, handler, listenerOptions);
    };
  }, [eventName, listenerOptions, handler]);

  return element as MutableRefObject<T>;
}
