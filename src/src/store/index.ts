import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userBankFormReducer } from './slice/userBankForm';
import { mainFormReducer } from './slice/mainForm';
import { employersFormReducer } from './slice/employersForm';
import { reqEmployersFormReducer } from './slice/reqEmployersForm';
import { sharedReducer } from './slice/shared';

const rootReducer = combineReducers({
  mainForm: mainFormReducer,
  reqEmployersForm: reqEmployersFormReducer,
  employersForm: employersFormReducer,
  userBankForm: userBankFormReducer,
  shared: sharedReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
