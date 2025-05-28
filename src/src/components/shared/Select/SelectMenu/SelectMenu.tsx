import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import { classNames } from 'utils';
import { Group, Option, SelectThemeType } from '../Select';
import { MenuItem } from './MenuItem';
import styles from './SelectMenu.module.scss';

interface SelectMenuProps {
  isOpen: boolean;
  onSelectValue: (option: Option) => void;
  options: Option[];
  value: Option | Option[] | null;
  groups?: Group[];
  multiple?: boolean;
  theme: SelectThemeType;
  isLoading?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const SelectMenu: FC<SelectMenuProps> = ({
  isOpen,
  theme,
  groups = [],
  onSelectValue,
  options,
  multiple,
  value,
  isLoading,
  setIsOpen
}) => {
  const groupsWithOptions = useMemo(() => {
    if (!groups.length) return [{ group: null, options }];
    return groups.map((group) => ({ group, options: options.filter((option) => option.groupId === group.id) }));
  }, [groups, options]);

  const getMenuItems = (options: Option[]) => {
    if (!options.length) return <p key="empty">Нет данных</p>;
    return options.map((option, index) => (
      <MenuItem
        key={option.value}
        value={value}
        onSelectValue={onSelectValue}
        option={option}
        multiple={multiple}
        theme={theme}
        isOpen={isOpen}
        optionsLength={options.length}
        index={index}
        setIsOpen={setIsOpen}
      />
    ));
  };

  return (
    <div className={classNames(styles.menuBox, { [styles.menuBox_hidden]: !isOpen }, [styles[theme]])}>
      <div className={styles.menu}>
        {isLoading && <p key="loading">Загрузка...</p>}
        {!isLoading &&
          groupsWithOptions.map(({ group, options }) => {
            return group ? (
              <div className={styles.menu_group} key={group.id}>
                <span className={styles.menu_group_label}>{group.label}</span>
                {getMenuItems(options)}
              </div>
            ) : (
              getMenuItems(options)
            );
          })}
      </div>
    </div>
  );
};
