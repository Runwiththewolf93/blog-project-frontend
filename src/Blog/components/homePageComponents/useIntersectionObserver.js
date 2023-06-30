import { useState, useEffect, useRef } from "react";

const useIntersectionObserver = () => {
  const loadingRef = useRef(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaderVisible(true);
        } else {
          setIsLoaderVisible(false);
        }
      },
      // Adjust the rootMargin to trigger the observer earlier
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    const currentRef = loadingRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [loadingRef, isLoaderVisible];
};

export default useIntersectionObserver;
