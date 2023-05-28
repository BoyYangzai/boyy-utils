import { useCallback, useEffect, useRef } from "react";

type UseClickOutsideProps<T extends HTMLElement> = {
  refCurrents: (React.MutableRefObject<T> | HTMLElement | null | undefined)[];
  callback: () => void;
  events?: string[];
};

const useClickOutsidePlus = <T extends HTMLElement>({
  refCurrents,
  callback,
  events = ["click"],
}: UseClickOutsideProps<T>) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const eventHandler = useCallback(
    (event: Event) => {
      if (
        refCurrents.every((item) => !(item && ('current' in item ? item.current : item)?.contains(event.target as Node)))
      ) {
        callbackRef.current();
      }
    },
    [refCurrents]
  );

  useEffect(() => {
    const addEventListeners = () => {
      events.forEach((event) => {
        document.addEventListener(event, eventHandler);
      });
    };

    const removeEventListeners = () => {
      events.forEach((event) => {
        document.removeEventListener(event, eventHandler);
      });
    };

    addEventListeners();

    return removeEventListeners;
  }, [events, eventHandler]);

  useEffect(() => {
    const invalidElements = refCurrents.reduce((acc, item, index) => {
      if (!item || ('current' in item && !item.current)) {
        acc.push(index);
      }
      return acc;
    }, [] as number[]);

    if (invalidElements.length > 0) {
      console.warn(`Warning: The following elements in refCurrents are empty or cannot be found: ${invalidElements.join(", ")}.`);
    }
  }, [refCurrents]);

  return useCallback(() => callbackRef.current(), []);
};

export default useClickOutsidePlus;
