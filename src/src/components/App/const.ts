import { IMainForm } from 'types/forms';
import { v4 as uuidv4 } from 'uuid';

export const DEBOUNCE = 3000;
export const defaultMainForm: IMainForm = {
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
  companySite: undefined
};
export const defaultFrom = {
  id: uuidv4(),
  isSelected: false
};
