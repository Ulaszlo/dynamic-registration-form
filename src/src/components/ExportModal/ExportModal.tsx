import { ChangeEvent, FC, useEffect, useRef } from 'react';
import { classNames } from 'utils';
import { Icon } from 'components/shared/Icon';
import { Button } from 'components/shared/Button';
import { Loader } from 'components/shared/Loader';
import { useTranslation } from 'react-i18next';
import { ExportButton } from '../ExportButton';
import styles from './ExportModal.module.scss';

type ModalType = 'success' | 'error' | 'export';

interface ModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  message: string;
  actionText: string;
  type: ModalType;
  isLoading: boolean;
  handleFileChange?: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const ExportModal: FC<ModalProps> = ({
  className,
  isOpen,
  onClose,
  onClick,
  message,
  actionText,
  type = 'export',
  isLoading,
  handleFileChange
}) => {
  const { t } = useTranslation();

  const modalRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Сохраняем последний активный элемент
      lastActiveElement.current = document.activeElement as HTMLElement;

      // Блокируем скролл страницы
      document.body.style.overflow = 'hidden';

      // Фокусируем модальное окно
      modalRef.current?.focus();
    } else {
      // Восстанавливаем скролл
      document.body.style.overflow = '';

      // Возвращаем фокус
      lastActiveElement.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!modalRef.current) return;

    const focusableElements = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === lastElement) {
        firstElement.focus();
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={classNames(styles.modal, {}, [className])}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div className={styles.modal_container}>
        {type !== 'success' && !isLoading && (
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

        <p className={styles.modal_message}>{!isLoading ? message : 'Идет загрузка...'}</p>
        <div className={styles.actions}>
          {type !== 'success' && type !== 'error' && (
            <Button className={styles.actions_cancel} onClick={onClose} theme="secondary" disabled={isLoading}>
              {t('cancel')}
            </Button>
          )}
          {type !== 'export' && (
            <Button className={styles.actions_btn} onClick={onClick} disabled={isLoading}>
              {actionText}
            </Button>
          )}
          {type === 'export' && handleFileChange && <ExportButton handleFileChange={handleFileChange} />}
        </div>
      </div>
    </div>
  );
};
