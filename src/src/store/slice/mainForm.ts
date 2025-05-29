import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMainForm } from 'types/forms';

const initialState: IMainForm & { errors: { [key: string]: string } } = {
  companyName: undefined,
  country: undefined,
  ownershipForm: undefined,
  INN: undefined,
  KPP: undefined,
  OKOPF: undefined,
  OKPO: undefined,
  companyEmail: undefined,
  companyFax: undefined,
  companyPhone: undefined,
  companySite: undefined,
  errors: {}
};

const mainFormSlice = createSlice({
  name: 'mainForm',
  initialState,
  reducers: {
    updateMainForm: (state, action: PayloadAction<{ field: keyof IMainForm; value: string; error: string }>) => {
      const { field, value, error } = action.payload;
      if (field !== 'errors') {
        state[field] = value;
        state.errors[field] = error;
      }
    },
    setMainFormState: (state, action: PayloadAction<IMainForm>) => {
      return { ...state, ...action.payload };
    },
    clearAll: () => {
      return initialState;
    }
  }
});

export const { actions: mainFormActions } = mainFormSlice;
export const { reducer: mainFormReducer } = mainFormSlice;
