import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

type Return = [Dispatch<SetStateAction<HTMLDivElement | null>>];

const useIntersectionObserver = (
  onIntersecting?: () => void,
  options?: IntersectionObserverInit,
): Return => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const callback: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      if (!entry.isIntersecting || !onIntersecting) return;

      onIntersecting();
    },
    [onIntersecting],
  );

  useEffect(() => {
    if (ref === null) return;

    const defaultOptions: IntersectionObserverInit = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(callback, {
      ...defaultOptions,
      ...options,
    });

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, callback, options]);

  return [setRef];
};

export default useIntersectionObserver;
