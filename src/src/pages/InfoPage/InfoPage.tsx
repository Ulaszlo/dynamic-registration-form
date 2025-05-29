import { KeyboardEvent, useRef, useState } from 'react';
import { useReduxSelector } from 'store';
import { sharedActions } from 'store/slice/shared';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useBeforeUnload, useIndexDB, useModalActions } from 'hooks';
import { DynamicFieldCreator } from 'components/DynamicFieldCreator';
import { CompanyRequisites } from 'components/CompanyRequisites';
import { Footer } from 'components/Footer';
import { Modal } from 'components/shared/Modal';
import { ModalControl } from 'components/shared/Modal/Modal';
import { getModalContent } from './const';
import styles from './InfoPage.module.scss';

export const InfoPage = () => {
  const { companyType } = useReduxSelector((state) => state.shared);
  const mainForm = useReduxSelector((state) => state.mainForm);
  const userBankForm = useReduxSelector((state) => state.userBankForm);
  const requiredEmployerForm = useReduxSelector((state) => state.reqEmployersForm);
  const employerForm = useReduxSelector((state) => state.employersForm);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [modal, setModal] = useState<ModalControl>({
    isOpen: false,
    isLoading: false,
    type: 'send'
  });

  useBeforeUnload();
  const { documents, setDocuments } = useIndexDB();
  const onModalClick = useModalActions(
    modal,
    setModal,
    setDocuments,
    companyType,
    mainForm,
    requiredEmployerForm,
    employerForm,
    userBankForm,
    documents
  );

  const hasErrors = (): boolean => {
    const forms = [mainForm, ...employerForm, ...requiredEmployerForm, ...userBankForm, ...documents];
    return forms.some((form) => {
      return form.errors && Object.values(form.errors).some((error) => error);
    });
  };

  const sendButtonClick = () => {
    if (hasErrors()) {
      dispatch(sharedActions.showErrors());
    } else {
      setModal({ isOpen: true, type: 'send', isLoading: false });
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
