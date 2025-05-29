import { FormInputField } from 'components/FormInputField';
import { InputType, SizeType, ValidationScheme } from 'types/forms';
import { classNames } from 'utils';
import styles from './style.module.scss';

interface IBaseRow {
  id: string;
  errors?: { [key: string]: string | undefined };
}

export interface IFields<T> {
  name: keyof T;
  placeholder?: string;
  validationScheme?: ValidationScheme;
  size?: SizeType;
  type?: InputType;
}

interface IFormProps<T extends IBaseRow, S> {
  fields: IFields<T>[];
  formData: T;
  updateForm: (id: string, fieldName: keyof T, value: S, error: string) => void;
}

export const DynamicRow = <T extends IBaseRow, S>({ fields, formData, updateForm }: IFormProps<T, S>) => {
  return (
    <div className={styles.row}>
      {fields.map(({ name, placeholder, type, validationScheme, size = 'middle' }) => (
        <FormInputField
          key={name as string}
          className={classNames(styles.field, {}, [styles[size]])}
          placeholder={placeholder}
          type={type}
          value={formData[name] as string}
          error={formData.errors ? formData.errors[name] : ''}
          setState={(value, error) => updateForm(formData.id, name as keyof T, value as S, error)}
          validationScheme={validationScheme}
        />
      ))}
    </div>
  );
};
