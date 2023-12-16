import { useState, useEffect, RefObject } from 'react';

const useInfiniteScroll = (
  ref: RefObject<HTMLElement>,
  loadMore: () => void
) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLoading(true);
        loadMore();
        setLoading(false);
      }
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, loadMore]);

  return [loading];
};

export default useInfiniteScroll;
