import { formSend } from 'http/index';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { CompanyRequisites } from 'components/CompanyRequisites';
import { v4 as uuidv4 } from 'uuid';
import { DynamicFieldCreator } from 'components/DynamicFieldCreator';
import { Modal } from 'components/shared/Modal';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { IDocumentsForm } from 'types/forms';
import { HOME_PAGE } from 'consts/consts';
import { reqEmployersFormActions } from 'store/slice/reqEmployersForm';
import { employersFormActions } from 'store/slice/employersForm';
import { userBankFormActions } from 'store/slice/userBankForm';
import { mainFormActions } from 'store/slice/mainForm';
import { useTranslation } from 'react-i18next';
import { openDB } from 'idb';
import { useReduxSelector } from 'store';
import { sharedActions } from 'store/slice/shared';
import { Footer } from 'components/Footer';
import { getModalContent } from './const';
import styles from './InfoPage.module.scss';

const initialDocuments: IDocumentsForm[] = [
  {
    id: uuidv4(),
    isSelected: false
  }
];

export const InfoPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'close' | 'send' | 'success' | 'error';
    isLoading: boolean;
  }>({
    isOpen: false,
    isLoading: false,
    type: 'send'
  });
  const wrapperRef = useRef(null);
  const [documents, setDocuments] = useState<IDocumentsForm[]>([]);
  const dispatch = useDispatch();

  const { companyType } = useReduxSelector((state) => state.shared);
  const mainForm = useReduxSelector((state) => state.mainForm);
  const userBankForm = useReduxSelector((state) => state.userBankForm);
  const requiredEmployerForm = useReduxSelector((state) => state.reqEmployersForm);
  const employerForm = useReduxSelector((state) => state.employersForm);

  const hasErrors = (): boolean => {
    const forms = [mainForm, ...employerForm, ...requiredEmployerForm, ...userBankForm, ...documents];
    return forms.some((form) => {
      return form.errors && Object.values(form.errors).some((error) => error);
    });
  };

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = true;
  };

  useEffect(() => {
    const loadDocuments = async () => {
      const db = await openDB('documentsDB', 1, {
        upgrade(db) {
          db.createObjectStore('documents', { keyPath: 'id' });
        }
      });
      const allDocuments = await db.getAll('documents');
      if (allDocuments.length === 0) {
        await db.add('documents', initialDocuments[0]);
        setDocuments(initialDocuments);
      } else {
        setDocuments(allDocuments);
      }
    };

    loadDocuments();
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const sendButtonClick = () => {
    if (hasErrors()) {
      dispatch(sharedActions.showErrors());
    } else {
      setModal({ isOpen: true, type: 'send', isLoading: false });
    }
  };

  const onModalClick = async () => {
    switch (modal.type) {
      case 'send':
        setModal((prev) => ({ ...prev, isLoading: true }));
        const isSuccess = await formSend(
          companyType,
          mainForm,
          requiredEmployerForm,
          employerForm,
          userBankForm,
          documents
        );
        setModal((prev) => ({ ...prev, isLoading: false }));
        if (isSuccess) {
          setModal((prev) => ({ ...prev, type: 'success' }));
        } else {
          setModal((prev) => ({ ...prev, type: 'error' }));
        }
        break;
      case 'close':
      case 'error':
        navigate(HOME_PAGE);
        break;
      case 'success':
        navigate(HOME_PAGE);
        dispatch(reqEmployersFormActions.removeAllEmployers());
        dispatch(employersFormActions.removeAllEmployers());
        dispatch(userBankFormActions.removeAllBank());
        dispatch(mainFormActions.clearAll());
        dispatch(sharedActions.clearAll());
        const db = await openDB('documentsDB', 1);
        await db.transaction('documents', 'readwrite').objectStore('documents').clear();
        setDocuments(initialDocuments);
        localStorage.clear();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.target === wrapperRef.current) {
      sendButtonClick();
    }
  };

  return (
    <>
      <div className={styles.wrapper} role="button" tabIndex={0} ref={wrapperRef} onKeyDown={handleKeyDown}>
        <h1 className={styles.title}>{t('infoPage.title')}</h1>
        <div className={styles.container}>
          <div className={styles.forms}>
            <CompanyRequisites />
            <DynamicFieldCreator
              documents={documents}
              setDocuments={setDocuments}
              userBankForm={userBankForm}
              requiredEmployerForm={requiredEmployerForm}
              employerForm={employerForm}
            />
          </div>
          <Footer cancel={() => setModal({ isOpen: true, type: 'close', isLoading: false })} send={sendButtonClick} />
        </div>
      </div>
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        onClick={onModalClick}
        message={getModalContent(t)[modal.type].message}
        actionText={getModalContent(t)[modal.type].actionText}
        isLoading={modal.isLoading}
      />
    </>
  );
};
