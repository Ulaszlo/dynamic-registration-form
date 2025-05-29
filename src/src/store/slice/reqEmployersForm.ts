import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployersForm } from 'types/forms';
import { v4 as uuidv4 } from 'uuid';

const initialState: IEmployersForm[] = [
  {
    id: uuidv4(),
    isSelected: false
  }
];

const reqEmployersFormSlice = createSlice({
  name: 'reqEmployersForm',
  initialState,
  reducers: {
    addEmployer: (state, action: PayloadAction<IEmployersForm>) => {
      state.push({ ...action.payload, id: uuidv4() });
    },
    updateEmployer: (
      state,
      action: PayloadAction<{ id: string; field: keyof IEmployersForm; value: string; error: string }>
    ) => {
      const { id, field, value, error } = action.payload;
      const employer = state.find((employer) => employer.id === id);
      if (employer && field !== 'isSelected') {
        employer[field] = value;
        employer.errors = { ...employer.errors, [field]: error };
      }
    },
    removeEmployer: (state, action: PayloadAction<string>) => {
      return state.filter((employer) => employer.id !== action.payload);
    },
    removeAllEmployers: () => {
      return [{ id: uuidv4(), isSelected: false }];
    },
    toggleSelectEmployer: (state, action: PayloadAction<string>) => {
      const employer = state.find((employer) => employer.id === action.payload);
      if (employer) {
        employer.isSelected = !employer.isSelected;
      }
    },
    toggleAllEmployers: (state, action: PayloadAction<boolean>) => {
      state.forEach((employer) => {
        employer.isSelected = action.payload;
      });
    },
    setReqEmployerForm: (state, action: PayloadAction<IEmployersForm[]>) => {
      return [...action.payload];
    }
  }
});

export const { actions: reqEmployersFormActions } = reqEmployersFormSlice;
export const { reducer: reqEmployersFormReducer } = reqEmployersFormSlice;
