import { InputHTMLAttributes, forwardRef, ForwardedRef, ChangeEvent } from 'react';
import { classNames } from 'utils';
import { Icon } from 'components/shared/Icon';
import { Button } from '../Button';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value: string;
  setValue: (value: string) => void;
  type?: 'text' | 'numbers';
}

export const Input = forwardRef(
  ({ className, value, setValue, type, ...otherProps }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      if (type === 'numbers') {
        const numericValue = newValue.replace(/[^0-9]/g, '');
        setValue(numericValue);
      } else {
        setValue(newValue || '');
      }
    };

    return (
      <div className={classNames(styles.container, {}, [className])}>
        <input
          className={classNames(styles.input, {
            [styles.disabled]: !!otherProps.disabled
          })}
          value={value}
          onChange={handleChange}
          {...otherProps}
          ref={ref}
        />
        {!!value && (
          <Button className={styles.clear} onClick={() => setValue('')} title="Очистить" theme="clear">
            <Icon className={styles.deleteValue} type="closeThin" />
          </Button>
        )}
      </div>
    );
  }
);
