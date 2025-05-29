import { Dispatch, FC, KeyboardEvent, SetStateAction } from 'react';
import { classNames } from 'utils';
import type { Option, SelectThemeType } from 'components/shared/Select';
import { Icon } from 'components/shared/Icon';
import styles from './MenuItem.module.scss';

interface MenuItemProps {
  onSelectValue: (option: Option) => void;
  option: Option;
  value: Option | Option[] | null;
  multiple?: boolean;
  theme: SelectThemeType;
  isOpen: boolean;
  optionsLength?: number;
  index?: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const MenuItem: FC<MenuItemProps> = ({
  onSelectValue,
  option,
  value,
  multiple,
  theme,
  isOpen,
  optionsLength,
  index,
  setIsOpen
}) => {
  const isSelected =
    multiple && value
      ? (value as Option[]).map((item) => item.value).includes(option.value)
      : option.label === (value as Option)?.label;

  const onSelectValueHandler = () => {
    if (!isSelected) {
      onSelectValue(option);
    }

    return null;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !isSelected) {
      onSelectValue(option);
    }

    if (event.key === 'Tab' && optionsLength) {
      index === optionsLength - 1 && setIsOpen(false);
    }

    return null;
  };

  return (
    <div
      className={classNames(
        styles.menuItem,
        { [styles.backlight]: isSelected, [styles.menuItem_disabled]: !!option.isDisabled },
        [styles[theme]]
      )}
      onClick={onSelectValueHandler}
      aria-disabled={option.isDisabled}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex,jsx-a11y/tabindex-no-positive
      tabIndex={isOpen ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      {option.icon ? <Icon type={option.icon} /> : null}
      <span className={styles.label} title={option.label}>
        {option.label}
      </span>
    </div>
  );
};
