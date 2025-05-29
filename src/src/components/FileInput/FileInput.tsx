import { useState, FC, MouseEvent, DragEvent, ChangeEvent, useRef } from 'react';
import { classNames } from 'utils';
import { Button } from 'components/shared/Button';
import styles from './FileInput.module.scss';

interface IFileInput {
  className?: string;
  title?: string;
  handleFileChange: (images: File) => void;
  name?: string;
  type?: 'doc';
  error?: string;
  file?: File;
}

export const FileInput: FC<IFileInput> = ({ className, title, handleFileChange, name, type = 'doc', error, file }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement | null>(null);
  const fileLoad = async (file: File | null) => {
    if (file) {
      handleFileChange(file);
    }
  };
  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await fileLoad(event.target.files ? event.target.files[0] : null);
  };
  const handleDrop = async (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsHovering(false);
    await fileLoad(event.dataTransfer.files ? event.dataTransfer.files[0] : null);
  };

  const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
  };
  const clearInput = (event: MouseEvent<HTMLInputElement>) => {
    event.currentTarget.value = '';
  };

  return (
    <div className={classNames(styles.file, {}, [className])}>
      <span className={styles.name}>{file ? file.name : ''}</span>
      <div className={styles.inputBox}>
        <Button
          className={classNames(styles.fileInput, { [styles.fileInput_hover]: isHovering })}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => ref.current?.click()}
          theme="primary"
        >
          <span className={styles.title}>{title}</span>
        </Button>
        {!!error && <span className={styles.error}>{error}</span>}
      </div>
      <input
        ref={ref}
        name={name}
        type="file"
        accept={type === 'doc' ? '.pdf,.tiff' : ''}
        onChange={handleInputChange}
        onClick={clearInput}
        style={{ display: 'none' }}
        tabIndex={-1}
      />
    </div>
  );
};
