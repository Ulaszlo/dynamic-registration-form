export type CompanyType = '-1' | '0' | '1' | '2';
export type InputType = 'tel' | 'text' | 'select' | 'file' | 'numbers';
export type SizeType = 'small' | 'medium' | 'large';

export interface Option {
  label: string;
  value: string;
}

export interface ValidationScheme {
  maxLength?: number;
  minLength?: number;
  length?: number[];
  isRequired?: boolean;
  isEmail?: boolean;
  isPhone?: boolean;
  maxSize?: number;
  selectTypes?: string[];
  fileTypes?: ('pdf' | 'tiff')[];
}

export interface IMain {
  isPolicyAgree: boolean;
  companyType: CompanyType;
  isShowErrors: boolean;
}

export interface InputProps {
  options?: Option[];
  value: string | File;
  error?: string;
  setState: (value: string | File, error: string) => void;
  placeholder?: string;
  validationScheme?: ValidationScheme;
  type?: InputType;
}

export interface RowsProps {
  name: string;
  input: InputProps;
}

export interface FieldProps {
  title: string;
  rows: RowsProps[];
}

export interface IPolicyForm {
  isPolicyAgree: boolean;
  companyType: CompanyType;
}

export interface IMainForm {
  companyName?: string;
  country?: string;
  ownershipForm?: string;
  INN?: string;
  KPP?: string;
  OKPO?: string;
  OKOPF?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyFax?: string;
  companySite?: string;
  errors?: {
    [key in
      | 'companyName'
      | 'country'
      | 'ownershipForm'
      | 'INN'
      | 'KPP'
      | 'OKPO'
      | 'OKOPF'
      | 'companyEmail'
      | 'companyPhone'
      | 'companyFax'
      | 'companySite']?: string;
  };
}

export interface IEmployersForm {
  id: string;
  isSelected: boolean;
  position?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
  errors?: {
    [key in 'position' | 'name' | 'phoneNumber' | 'email']?: string;
  };
}

export interface IUserBankForm {
  id: string;
  isSelected: boolean;
  banc?: string;
  city?: string;
  businessAcc?: string;
  correspAcc?: string;
  BIC?: string;
  errors?: {
    [key in 'banc' | 'city' | 'businessAcc' | 'correspAcc' | 'BIC']?: string;
  };
}

export interface IDocumentsForm {
  id: string;
  isSelected: boolean;
  docName?: string;
  docFile?: File;
  errors?: {
    [key in 'docName' | 'docFile']?: string;
  };
  content?: string;
  filename?: string;
}

export interface Row {
  id: string;
  isSelected: boolean;
  inputs: { input: InputProps }[];
}

interface Header {
  title: string;
  width: SizeType;
}

export interface ContactData {
  headers: Header[];
  row: Row[];
}
