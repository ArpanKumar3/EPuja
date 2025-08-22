import { useState, useEffect, useRef } from 'react';

export const useScrollspy = (sectionIds, rootMargin) => {
  const [activeId, setActiveId] = useState('');
  const observer = useRef(null);

  useEffect(() => {
    const elements = sectionIds.map(id => document.getElementById(id));
    
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: rootMargin || '-30% 0px -70% 0px' }
    );

    elements.forEach(el => {
      if (el) {
        observer.current.observe(el);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [sectionIds, rootMargin]);

  return activeId;
};
