import { ChangeEvent, FC, useRef } from 'react';
import { classNames } from 'utils';
import styles from './ExportButton.module.scss';

interface ExportButtonProps {
  className?: string;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const ExportButton: FC<ExportButtonProps> = ({ className, handleFileChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <label className={styles.wrapper}>
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className={styles.hiddenInput}
        tabIndex={0}
      />
      <span className={classNames(styles.btn, {}, [className])}>Продолжить</span>
    </label>
  );
};
