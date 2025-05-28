import React, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/index';

interface StoreProviderProps {
  children?: ReactNode;
}

export const StoreProviderRedux: FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
