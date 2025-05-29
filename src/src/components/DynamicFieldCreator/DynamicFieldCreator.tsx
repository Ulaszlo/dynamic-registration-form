import { Dispatch, memo, SetStateAction } from 'react';
import { classNames } from 'utils';
import { IDocumentsForm, IEmployersForm, IUserBankForm } from 'types/forms';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';
import { userBankFormActions } from 'store/slice/userBankForm';
import { employersFormActions } from 'store/slice/employersForm';
import { reqEmployersFormActions } from 'store/slice/reqEmployersForm';
import { DynamicForm } from './DynamicForm';
import { DynamicRow } from './DynamicRow';
import { bankFields, documentsFields, employerFields, requiredEmployerFields } from './fields';
import styles from './DynamicFieldCreator.module.scss';

export interface DynamicFieldCreatorProps {
  className?: string;
  title?: string;
  documents: IDocumentsForm[];
  setDocuments: Dispatch<SetStateAction<IDocumentsForm[]>>;
  userBankForm: IUserBankForm[];
  requiredEmployerForm: IEmployersForm[];
  employerForm: IEmployersForm[];
}

export const DynamicFieldCreator = memo(
  ({
    className,
    title,
    documents,
    setDocuments,
    userBankForm,
    requiredEmployerForm,
    employerForm
  }: DynamicFieldCreatorProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const reqEmployerItem = (reqEmployer: IEmployersForm) => (
      <DynamicRow
        fields={requiredEmployerFields}
        formData={reqEmployer}
        updateForm={(id, field, value: string, error) =>
          dispatch(reqEmployersFormActions.updateEmployer({ id, field, value, error }))
        }
      />
    );

    const employerItem = (employer: IEmployersForm) => (
      <DynamicRow
        fields={employerFields}
        formData={employer}
        updateForm={(id, field, value: string, error) =>
          dispatch(employersFormActions.updateEmployer({ id, field, value, error }))
        }
      />
    );

    const bankItem = (bank: IUserBankForm) => (
      <DynamicRow
        fields={bankFields}
        formData={bank}
        updateForm={(id, field, value: string, error) =>
          dispatch(userBankFormActions.updateBank({ id, field, value, error }))
        }
      />
    );

    const documentItem = (document: IDocumentsForm) => (
      <DynamicRow
        fields={documentsFields}
        formData={document}
        updateForm={(id, field, value: File, error) =>
          updateDocument({ id, docFile: value, isSelected: false, errors: { docFile: error } })
        }
      />
    );

    const addDocument = async (document: IDocumentsForm) => {
      try {
        const db = await openDB('documentsDB', 1);
        await db.put('documents', document);
        setDocuments((docs) => [...docs, document]);
      } catch (error) {
        console.error(t('errors.addDocument'), error);
      }
    };

    const removeDocument = async (id: string) => {
      try {
        const db = await openDB('documentsDB', 1);
        await db.delete('documents', id);
        setDocuments((docs) => docs.filter((doc) => doc.id !== id));
      } catch (error) {
        console.error(t('errors.removeDocument'), error);
      }
    };

    const removeAllDocument = async () => {
      try {
        const db = await openDB('documentsDB', 1);
        await db.transaction('documents', 'readwrite').objectStore('documents').clear();
      } catch (error) {
        console.error(t('errors.removeAllDocuments'), error);
      }
      setDocuments([{ id: uuidv4(), isSelected: false }]);
    };

    const updateDocument = async (updatedDocument: IDocumentsForm) => {
      try {
        const db = await openDB('documentsDB', 1);
        await db.put('documents', updatedDocument);
        setDocuments((docs) => docs.map((doc) => (doc.id === updatedDocument.id ? updatedDocument : doc)));
      } catch (error) {
        console.error(t('errors.updateDocument'), error);
      }
    };

    return (
      <div className={classNames(styles.wrapper, {}, [className])}>
        <p className={styles.title}>{title}</p>

        <DynamicForm
          subtitle={t('dynamicForms.responsiblePersons')}
          headers={[
            { title: t('dynamicForms.position'), width: 'medium' },
            { title: t('dynamicForms.fullName'), width: 'medium' },
            { title: t('dynamicForms.phone'), width: 'small' },
            { title: t('dynamicForms.email'), width: 'small' }
          ]}
          items={requiredEmployerForm}
          toggle={(id) => dispatch(reqEmployersFormActions.toggleSelectEmployer(id))}
          toggleAll={(select) => dispatch(reqEmployersFormActions.toggleAllEmployers(select))}
          addItem={(employer) => dispatch(reqEmployersFormActions.addEmployer(employer))}
          removeAll={() => dispatch(reqEmployersFormActions.removeAllEmployers())}
          remove={(id) => dispatch(reqEmployersFormActions.removeEmployer(id))}
          inputsItem={(employer) => reqEmployerItem(employer)}
        />

        <DynamicForm
          subtitle={t('dynamicForms.additionalContacts')}
          headers={[
            { title: t('dynamicForms.position'), width: 'medium' },
            { title: t('dynamicForms.fullName'), width: 'medium' },
            { title: t('dynamicForms.phone'), width: 'small' },
            { title: t('dynamicForms.email'), width: 'small' }
          ]}
          items={employerForm}
          toggle={(id) => dispatch(employersFormActions.toggleSelectEmployer(id))}
          toggleAll={(select) => dispatch(employersFormActions.toggleAllEmployers(select))}
          addItem={(employer) => dispatch(employersFormActions.addEmployer(employer))}
          removeAll={() => dispatch(employersFormActions.removeAllEmployers())}
          remove={(id) => dispatch(employersFormActions.removeEmployer(id))}
          inputsItem={(employer) => employerItem(employer)}
        />

        <DynamicForm
          subtitle={t('dynamicForms.bankDetails')}
          headers={[
            { title: t('dynamicForms.bankName'), width: 'medium' },
            { title: t('dynamicForms.city'), width: 'small' },
            { title: t('dynamicForms.accountNumber'), width: 'small' },
            { title: t('dynamicForms.correspondentAccount'), width: 'small' },
            { title: t('dynamicForms.bik'), width: 'small' }
          ]}
          items={userBankForm}
          toggle={(id) => dispatch(userBankFormActions.toggleSelectBank(id))}
          toggleAll={(select) => dispatch(userBankFormActions.toggleAllBank(select))}
          addItem={(bank) => dispatch(userBankFormActions.addBank(bank))}
          removeAll={() => dispatch(userBankFormActions.removeAllBank())}
          remove={(id) => dispatch(userBankFormActions.removeBank(id))}
          inputsItem={(bank) => bankItem(bank)}
        />

        <DynamicForm
          subtitle={t('dynamicForms.legalDocuments')}
          headers={[
            { title: t('dynamicForms.fileName'), width: 'small' },
            { title: t('dynamicForms.file'), width: 'large' }
          ]}
          items={documents}
          toggle={(id) =>
            setDocuments((doc) => doc.map((d) => (d.id === id ? { ...d, isSelected: !d.isSelected } : d)))
          }
          toggleAll={(isSelected) => setDocuments((doc) => doc.map((d) => ({ ...d, isSelected })))}
          addItem={addDocument}
          removeAll={removeAllDocument}
          remove={removeDocument}
          inputsItem={(document) => documentItem(document)}
        />
      </div>
    );
  }
);
