import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserBankForm } from 'types/forms';
import { v4 as uuidv4 } from 'uuid';

const initialState: IUserBankForm[] = [
  {
    id: uuidv4(),
    isSelected: false
  }
];

const userBankFormSlice = createSlice({
  name: 'userBankForm',
  initialState,
  reducers: {
    toggleSelectBank: (state, action: PayloadAction<string>) => {
      return state.map((bank) => (bank.id === action.payload ? { ...bank, isSelected: !bank.isSelected } : bank));
    },
    toggleAllBank: (state, action: PayloadAction<boolean>) => {
      return state.map((bank) => ({ ...bank, isSelected: action.payload }));
    },
    removeAllBank: (state) => {
      return [{ id: uuidv4(), isSelected: false }];
    },
    addBank: (state, action: PayloadAction<IUserBankForm>) => {
      return [...state, action.payload];
    },
    updateBank: (
      state,
      action: PayloadAction<{ id: string; field: keyof IUserBankForm; value: string; error: string }>
    ) => {
      const { id, field, value, error } = action.payload;
      return state.map((bank) => {
        if (bank.id === id) {
          return { ...bank, [field]: value, errors: { ...bank.errors, [field]: error } };
        }
        return bank;
      });
    },
    removeBank: (state, action: PayloadAction<string>) => {
      return state.filter((bank) => bank.id !== action.payload);
    },
    setUserBankFormState: (state, action: PayloadAction<IUserBankForm[]>) => {
      return [...action.payload];
    }
  }
});

export const { actions: userBankFormActions } = userBankFormSlice;
export const { reducer: userBankFormReducer } = userBankFormSlice;
