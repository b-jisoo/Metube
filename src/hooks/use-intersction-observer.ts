import { useEffect, useRef, useState } from "react";

const useIntersctionObserver = (options?: IntersectionObserverInit) => {
  const [isIntersecting, setisIntersecting] = useState(false);

  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setisIntersecting(entry.isIntersecting);
    }, options);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => observer.disconnect();
  }, [options]);

  return { isIntersecting, targetRef };
};

export default useIntersctionObserver;
