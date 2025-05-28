import { useRef, useState, InputHTMLAttributes, MouseEvent, KeyboardEvent, useEffect, memo } from 'react';
import { useClickOutside } from 'hooks';
import { classNames } from 'utils';
import { Icon } from 'components/shared/Icon';
import { IconType } from 'components/shared/Icon/Icon';
import { SelectMenu } from './SelectMenu';
import styles from './Select.module.scss';

export type SelectThemeType = 'primary' | 'secondary' | 'clearing' | 'flag';

export interface Option<T = string> {
  label: string;
  value: T;
  groupId?: string;
  icon?: IconType;
  isDisabled?: boolean;
}

export interface Group {
  label: string;
  id: string;
}

interface SelectProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string;
  label?: string;
  theme?: SelectThemeType;
  options?: Option[];
  placeholder?: string;
  groups?: Group[];
  onChange?: (option: Option) => void;
  additionalIcon?: IconType;
  initialValue?: Option;
}

export const Select = memo(
  ({
    multiple,
    className,
    label,
    theme = 'secondary',
    options,
    placeholder,
    groups,
    onChange,
    additionalIcon,
    initialValue,
    ...otherProps
  }: SelectProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useClickOutside(ref);
    const [value, setValue] = useState<Option | null>(initialValue || null);
    const selectValue = JSON.stringify(value);
    useEffect(() => {
      if (initialValue) {
        setValue(initialValue);
      }
    }, [initialValue]);
    const toggleOpen = () => {
      setIsOpen((prevState) => !prevState);
    };

    const onSelectValue = (option: Option) => {
      setValue(option);

      if (onChange) {
        onChange(option);
      }
    };

    const clearSelectValue = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setValue(null);
    };

    const arrowIconColor = !!value && !isOpen && theme === 'primary' ? '#fff' : '#707070';

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') setIsOpen(!isOpen);
      if (e.key === 'Escape') setIsOpen(false);
    };

    return (
      <div
        className={classNames(styles.container, { [styles.isOpen]: isOpen, [styles.selected]: !!value && !isOpen }, [
          className,
          styles[theme]
        ])}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex,jsx-a11y/tabindex-no-positive
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.selectBox}>
          <div className={classNames(styles.wrapper, {})} ref={ref} onClick={toggleOpen}>
            {additionalIcon && (
              <div className={classNames(styles.iconWrapper, {}, [styles.iconWrapper_additional])}>
                <Icon type={additionalIcon} />
              </div>
            )}
            <input className={styles.hidden} value={selectValue} readOnly {...otherProps} />
            <div className={styles.selectedBox} title={(value as Option)?.label}>
              {value !== null && value.icon ? <Icon type={value.icon} /> : null}
              <span className={styles.select}>
                {value !== null && (value as Option).label ? (value as Option).label : placeholder}
              </span>
            </div>
            <div className={styles.box}>
              <div
                className={classNames(styles.icon, {
                  [styles.icon_isOpen]: isOpen
                })}
              >
                <Icon type="arrowThin" color={arrowIconColor} />
              </div>
              {(theme === 'clearing' || multiple) && (
                <div
                  onClick={clearSelectValue}
                  className={classNames(styles.iconWrapper, {}, [styles.iconWrapper_delete])}
                >
                  <Icon type="closeThin" />
                </div>
              )}
            </div>
          </div>
          <SelectMenu
            multiple={multiple}
            isOpen={isOpen}
            onSelectValue={onSelectValue}
            options={options || []}
            value={value}
            groups={groups}
            setIsOpen={setIsOpen}
            theme={theme}
          />
        </div>
      </div>
    );
  }
);
