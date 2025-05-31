import { FC, useEffect, useState } from 'react';
import { Input } from 'components/shared/Input';
import { Select } from 'components/shared/Select';
import { InputProps } from 'types/forms';
import { Icon } from 'components/shared/Icon';
import { classNames } from 'utils';
import { inputValidation } from 'utils/inputValidation';
import { PhoneNumber } from 'components/PhoneNumber';
import { FileInput } from 'components/FileInput';
import { useDebounce } from 'hooks';
import { useReduxSelector } from 'store';
import { useTranslation } from 'react-i18next';
import styles from './FormInputField.module.scss';

interface FormInputFieldProps extends InputProps {
  className?: string;
}

export const FormInputField: FC<FormInputFieldProps> = ({
  className,
  placeholder,
  options,
  validationScheme,
  type = 'text',
  setState,
  error,
  value = ''
}) => {
  const { t } = useTranslation();
  const { isShowErrors } = useReduxSelector((state) => state.shared);
  const [wasChanged, setWasChanged] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | File>(value);
  const debouncedValue = useDebounce(inputValue, 500);
  const [maxLength, setMaxLength] = useState<number>();

  // TODO need refact

  useEffect(() => {
    if (validationScheme?.maxLength) {
      setMaxLength(validationScheme.maxLength);
    }

    if (validationScheme?.length) {
      setMaxLength(Math.max(...validationScheme.length));
    }
  }, [validationScheme]);

  useEffect(() => {
    if (validationScheme) {
      const err: string | null = inputValidation(debouncedValue, validationScheme, t);
      setState(debouncedValue, err || '');
    } else {
      setState(debouncedValue, '');
    }
    if (!wasChanged && debouncedValue) {
      setWasChanged(true);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className={classNames(styles.field, {}, [className])}>
      {(() => {
        switch (type) {
          case 'select':
            if (!setState) return null;
            return (
              <Select
                className={classNames(styles.select, {
                  [styles.error]: !!error && (wasChanged || isShowErrors)
                })}
                options={options}
                placeholder={t(placeholder || '')}
                onChange={(option) => setInputValue(option.value)}
                initialValue={options?.find((option) => option.value === inputValue)}
              />
            );

          case 'tel':
            if (!setState) return null;
            return (
              <PhoneNumber
                error={!!error && (wasChanged || isShowErrors)}
                className={classNames(styles.select, {
                  [styles.error]: !!error && (wasChanged || isShowErrors)
                })}
                onChange={setInputValue}
                value={inputValue as string}
              />
            );

          case 'text':
          case 'numbers':
            return (
              <Input
                className={classNames(styles.input, {
                  [styles.error]: !!error && (wasChanged || isShowErrors)
                })}
                type={type}
                placeholder={t(placeholder || '')}
                value={inputValue as string}
                setValue={setInputValue}
                maxLength={maxLength}
              />
            );
          case 'file':
            return (
              <FileInput
                className={classNames(styles.select, {
                  [styles.error]: !!error && (wasChanged || isShowErrors)
                })}
                title={t('addFile')}
                handleFileChange={setInputValue}
                error={!!error && ((wasChanged && value) || isShowErrors) ? error : ''}
                file={inputValue as File}
              />
            );
          default:
            return (
              <Input
                className={classNames(styles.input, {
                  [styles.error]: !!error && (wasChanged || isShowErrors)
                })}
                type={type}
                placeholder={t(placeholder || '')}
                value={inputValue as string}
                setValue={setInputValue}
                maxLength={maxLength}
              />
            );
        }
      })()}
      {!!error && (wasChanged || isShowErrors) && type !== 'file' && (
        <div>
          <Icon className={styles.errorIcon} type="error" data-after-text={error} />
        </div>
      )}
    </div>
  );
};
