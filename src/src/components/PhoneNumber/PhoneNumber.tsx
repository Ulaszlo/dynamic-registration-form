import { FC } from 'react';
import { classNames } from 'utils';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Icon } from 'components/shared/Icon';
import { Button } from 'components/shared/Button';
import styles from './PhoneNumber.module.scss';

interface PhoneNumberProps {
  className?: string;
  onChange: (phone: string) => void;
  value?: string;
  error: boolean;
}

export const PhoneNumber: FC<PhoneNumberProps> = ({ className, onChange, value, error }) => {
  const onChangeHandler = (phone: string) => {
    onChange(phone ? `+${phone}` : '');
  };

  return (
    <div className={classNames(styles.wrapper, {}, [className])}>
      <PhoneInput
        copyNumbersOnly
        placeholder="+7 (XXX) XXX XX-XX"
        country="ru"
        disableDropdown
        value={value}
        onChange={onChangeHandler}
        buttonClass={classNames(styles.shared, { [styles.input_error]: error })}
        containerClass={classNames(styles.shared, { [styles.input_error]: error })}
        inputClass={classNames(styles.input, { [styles.input_error]: error })}
      />
      {!!value && (
        <Button className={styles.clear} onClick={() => onChange('')} title="Очистить" theme="clear">
          <Icon className={styles.deleteValue} type="closeThin" />
        </Button>
      )}
    </div>
  );
};
