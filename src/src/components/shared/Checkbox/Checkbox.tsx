import { FC, InputHTMLAttributes, ChangeEvent, KeyboardEvent } from 'react';
import { classNames } from 'utils';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  className?: string;
  label?: string;
  isHalfChecked?: boolean;
  onChange: (checked: boolean) => void;
  value: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
  className,
  onChange,
  label,
  isHalfChecked = false,
  value,
  ...otherProps
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.checked);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onChange && onChange(!value);
    }
  };

  return (
    <div className={classNames(styles.container, {}, [className])}>
      <div
        className={classNames(styles.wrapper, {
          [styles.checked]: value,
          [styles.halfChecked]: isHalfChecked && !value,
          [styles.disabled]: !!otherProps.disabled
        })}
      >
        <input
          className={styles.input}
          type="checkbox"
          checked={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...otherProps}
        />
      </div>
      {label && (
        <label className={styles.label} htmlFor={otherProps.id}>
          {label}
        </label>
      )}
    </div>
  );
};
