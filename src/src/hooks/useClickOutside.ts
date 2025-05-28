import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';

export const useClickOutside = (
  wrapperRef: RefObject<HTMLElement> | null,
  ignoreRef?: RefObject<HTMLElement> | null
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (ignoreRef && ignoreRef.current && ignoreRef.current.contains(e.target as HTMLElement)) return;
      if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(e.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      if (isOpen) {
        isOpen && document.removeEventListener('click', handleOutsideClick);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return [isOpen, setIsOpen];
};
