import { Button } from 'components/shared/Button';
import { Icon } from 'components/shared/Icon';
import { v4 as uuidv4 } from 'uuid';
import { classNames } from 'utils';
import styles from './FieldControl.module.scss';

interface IBaseItem {
  id: string;
  isSelected: boolean;
}

interface FieldControlProps<T extends IBaseItem> {
  className?: string;
  subtitle?: string;
  items: T[];
  addItem: (item: T) => void;
  removeAll: () => void;
  remove: (id: string) => void;
}

export const FieldControl = <T extends IBaseItem>({
  className,
  subtitle,
  items,
  addItem,
  removeAll,
  remove
}: FieldControlProps<T>) => {
  const deleteSelectedRows = () => {
    const itemsCount = items.length;
    const selectedItems = items.filter((item) => item.isSelected);
    if (itemsCount === selectedItems.length) {
      removeAll();
    } else {
      selectedItems.forEach((item) => (item.id ? remove(item.id) : null));
    }
  };

  const addRowHandler = () => {
    const newItem: T = { id: uuidv4(), isSelected: false } as T;
    addItem(newItem);
  };

  const isDeleteButtonDisabled = !items.find((item) => item.isSelected);

  return (
    <div className={classNames(styles.container, {}, [className])}>
      <p className={styles.title}>{subtitle}</p>
      <div className={styles.separator} />
      <Button className={styles.clear} theme="clear" onClick={addRowHandler} title="Добавить">
        <Icon type="add" />
      </Button>
      <Button
        className={styles.trash}
        theme="clear"
        onClick={deleteSelectedRows}
        disabled={isDeleteButtonDisabled}
        title="Удалить"
      >
        <Icon type="trash" />
      </Button>
    </div>
  );
};
