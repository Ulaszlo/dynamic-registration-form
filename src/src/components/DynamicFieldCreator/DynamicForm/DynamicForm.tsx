import { Checkbox } from 'components/shared/Checkbox';
import { ReactNode, useEffect, useState } from 'react';
import { classNames } from 'utils';
import { SizeType } from 'types/forms';
import { FieldControl } from 'components/DynamicFieldCreator/FieldControl';
import styles from './DynamicForm.module.scss';

interface IBaseItem {
  id: string;
  isSelected: boolean;
}
interface IHeader {
  title: string;
  width: SizeType;
}
interface FieldControlProps<T extends IBaseItem> {
  className?: string;
  subtitle?: string;
  items: T[];
  headers: IHeader[];
  addItem: (item: T) => void;
  toggle: (id: string) => void;
  toggleAll: (select: boolean) => void;
  removeAll: () => void;
  remove: (id: string) => void;
  inputsItem: (item: T) => ReactNode;
}

export const DynamicForm = <T extends IBaseItem>({
  className,
  subtitle,
  items,
  headers,
  addItem,
  removeAll,
  toggleAll,
  toggle,
  remove,
  inputsItem
}: FieldControlProps<T>) => {
  const [isAllRowsSelected, setIsAllRowsSelected] = useState(false);
  const [isHalfChecked, setIsHalfChecked] = useState(false);
  useEffect(() => {
    const selectedLength = items.filter((item) => item.isSelected).length;
    const allSelected = items.length === selectedLength && items.length > 0;
    setIsHalfChecked(!!selectedLength);
    setIsAllRowsSelected(allSelected);
  }, [items]);

  return (
    <div className={classNames(styles.wrapper, { [styles.wrapper_clear]: !items.length }, [className])}>
      <FieldControl subtitle={subtitle} items={items} addItem={addItem} remove={remove} removeAll={removeAll} />
      {!!items.length && (
        <div className={styles.block}>
          <div className={styles.headers}>
            <Checkbox
              className={styles.checkbox}
              value={isAllRowsSelected}
              isHalfChecked={isHalfChecked}
              onChange={(checked) => toggleAll(checked)}
            />
            <header className={styles.titles}>
              {headers.map((header) => (
                <div className={classNames(styles.field, {}, [styles[header.width]])} key={header.title}>
                  {header.title}
                </div>
              ))}
            </header>
          </div>
          {items.map((item) => (
            <div
              key={item.id}
              className={classNames(styles.inputsWrapper, { [styles.inputsWrapper_selected]: item.isSelected })}
            >
              <Checkbox
                className={styles.checkbox}
                id={item.id}
                value={item.isSelected}
                onChange={() => toggle(item.id)}
              />
              {inputsItem(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
