import { FC, useEffect, useRef } from 'react';
import { classNames } from 'utils';
import { Icon } from 'components/shared/Icon';
import { Button } from 'components/shared/Button';
import { Loader } from 'components/shared/Loader';
import { useTranslation } from 'react-i18next';
import styles from './Modal.module.scss';

type ModalType = 'send' | 'close' | 'success' | 'error';

export interface ModalControl {
  isOpen: boolean;
  type: ModalType;
  isLoading: boolean;
}

interface ModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  message: string;
  actionText: string;
  type: ModalType;
  isLoading: boolean;
}

export const Modal: FC<ModalProps> = ({
  className,
  isOpen,
  onClose,
  onClick,
  message,
  actionText,
  type = 'send',
  isLoading
}) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const lastFocusableElementRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = () => {
    if (modalRef.current) {
      return modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
    }
    return [];
  };

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        const [firstElement] = focusableElements;
        const lastElement = focusableElements[focusableElements.length - 1];

        firstFocusableElementRef.current = firstElement;
        lastFocusableElementRef.current = lastElement;
        modalRef.current.focus();
      }
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElementRef.current) {
          lastFocusableElementRef.current?.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === lastFocusableElementRef.current) {
        firstFocusableElementRef.current?.focus();
        e.preventDefault();
      }
    }

    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={classNames(styles.modal, {}, [className])} ref={modalRef} tabIndex={0} role="button">
      <div className={styles.modal_container}>
        {type !== 'success' && (
          <Button className={styles.modal_close} onClick={onClose} theme="clear">
            <Icon type="closeCircle" />
          </Button>
        )}
        {!isLoading ? (
          <Icon
            className={classNames(styles.modal_icon, {}, [styles[type]])}
            type={type === 'success' ? 'checkedBig' : 'warning'}
          />
        ) : (
          <Loader />
        )}

        <p className={styles.modal_message}>{!isLoading ? message : 'Идет отправка...'}</p>
        <div className={styles.actions}>
          {type !== 'success' && type !== 'error' && (
            <Button className={styles.actions_cancel} onClick={onClose} theme="secondary" disabled={isLoading}>
              {t('cancel')}
            </Button>
          )}
          <Button className={styles.actions_btn} onClick={onClick} disabled={isLoading}>
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  );
};
