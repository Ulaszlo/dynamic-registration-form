import { formSend } from 'http/index';
import { Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { reqEmployersFormActions } from 'store/slice/reqEmployersForm';
import { employersFormActions } from 'store/slice/employersForm';
import { userBankFormActions } from 'store/slice/userBankForm';
import { mainFormActions } from 'store/slice/mainForm';
import { sharedActions } from 'store/slice/shared';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { openDB } from 'idb';
import { HOME_PAGE } from 'consts/consts';
import { CompanyType, IDocumentsForm, IEmployersForm, IMainForm, IUserBankForm } from 'types/forms';
import { ModalControl } from 'components/shared/Modal/Modal';

const initialDocuments: IDocumentsForm[] = [
  {
    id: uuidv4(),
    isSelected: false
  }
];

export const useModalActions = (
  modal: ModalControl,
  setModal: Dispatch<SetStateAction<ModalControl>>,
  setDocuments: Dispatch<SetStateAction<IDocumentsForm[]>>,
  companyType: CompanyType,
  mainForm: IMainForm & {
    errors: {
      [p: string]: string;
    };
  },
  requiredEmployerForm: IEmployersForm[],
  employerForm: IEmployersForm[],
  userBankForm: IUserBankForm[],
  documents: IDocumentsForm[]
) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleModalAction = async () => {
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

  return handleModalAction;
};
