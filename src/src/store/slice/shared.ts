import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyType, IMain } from 'types/forms';

const initialState: IMain = {
  isPolicyAgree: true,
  companyType: '1',
  isShowErrors: false
};
const sharedSlice = createSlice({
  name: 'shared ',
  initialState,
  reducers: {
    showErrors: (state) => {
      state.isShowErrors = true;
    },
    togglePolicyAgree: (state) => {
      state.isPolicyAgree = !state.isPolicyAgree;
    },
    setCompanyType: (state, action: PayloadAction<CompanyType>) => {
      state.companyType = action.payload;
    },
    clearAll: () => {
      return initialState;
    }
  }
});

export const { actions: sharedActions } = sharedSlice;
export const { reducer: sharedReducer } = sharedSlice;
