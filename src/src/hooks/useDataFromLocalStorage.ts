import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useReduxSelector } from '../store';
import { DEBOUNCE, defaultFrom, defaultMainForm } from '../components/App';
import { EMPLOYERS_FORM, MAIN_FORM, REQ_EMPLOYERS_FORM, USER_BANK_FORM } from '../consts/consts';
import { getItemFromLocalStorage } from '../utils/getItemFromLocalStorage';
import { IEmployersForm, IMainForm, IUserBankForm } from '../types/forms';
import { mainFormActions } from '../store/slice/mainForm';
import { userBankFormActions } from '../store/slice/userBankForm';
import { reqEmployersFormActions } from '../store/slice/reqEmployersForm';
import { employersFormActions } from '../store/slice/employersForm';
import { useDebounce } from './useDebounce';

export const useDataFromLocalStorage = () => {
  const [isFirstMounting, setIsFirstMounting] = useState<boolean>(false);
  const dispatch = useDispatch();

  const mainForm = useReduxSelector((state) => state.mainForm);
  const userBankForm = useReduxSelector((state) => state.userBankForm);
  const employersForm = useReduxSelector((state) => state.employersForm);
  const reqEmployersForm = useReduxSelector((state) => state.reqEmployersForm);

  const debouncedMainForm = useDebounce(mainForm, DEBOUNCE);
  const debouncedUserBankForm = useDebounce(userBankForm, DEBOUNCE);
  const debouncedEmployersForm = useDebounce(employersForm, DEBOUNCE);
  const debouncedReqEmployersForm = useDebounce(reqEmployersForm, DEBOUNCE);

  useEffect(() => {
    if (isFirstMounting) {
      localStorage.setItem(MAIN_FORM, JSON.stringify(debouncedMainForm));
    }
  }, [debouncedMainForm]);

  useEffect(() => {
    if (isFirstMounting) {
      localStorage.setItem(USER_BANK_FORM, JSON.stringify(debouncedUserBankForm));
    }
  }, [debouncedUserBankForm]);

  useEffect(() => {
    if (isFirstMounting) {
      localStorage.setItem(REQ_EMPLOYERS_FORM, JSON.stringify(debouncedReqEmployersForm));
    }
  }, [debouncedReqEmployersForm]);

  useEffect(() => {
    if (isFirstMounting) {
      localStorage.setItem(EMPLOYERS_FORM, JSON.stringify(debouncedEmployersForm));
    }
  }, [debouncedEmployersForm]);

  useEffect(() => {
    getItemFromLocalStorage<IMainForm>(
      MAIN_FORM,
      (newValue) => dispatch(mainFormActions.setMainFormState(newValue)),
      defaultMainForm
    );

    getItemFromLocalStorage<IUserBankForm[]>(
      USER_BANK_FORM,
      (newValue) => dispatch(userBankFormActions.setUserBankFormState(newValue)),
      [defaultFrom]
    );
    getItemFromLocalStorage<IEmployersForm[]>(
      REQ_EMPLOYERS_FORM,
      (newValue) => dispatch(reqEmployersFormActions.setReqEmployerForm(newValue)),
      [defaultFrom]
    );

    getItemFromLocalStorage<IEmployersForm[]>(
      EMPLOYERS_FORM,
      (newValue) => dispatch(employersFormActions.setEmployerForm(newValue)),
      []
    );
    setIsFirstMounting(true);
  }, []);

  return {};
};
