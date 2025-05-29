import { IDocumentsForm, IEmployersForm, IUserBankForm } from 'types/forms';
import { IFields } from './DynamicRow/DynamicRow';

export const employerFields: IFields<IEmployersForm>[] = [
  {
    name: 'position',
    placeholder: 'dynamicForms.placeholders.position',
    validationScheme: { isRequired: true, maxLength: 255 },
    size: 'medium'
  },
  {
    name: 'name',
    placeholder: 'dynamicForms.placeholders.fullName',
    validationScheme: { isRequired: true, maxLength: 255 },
    size: 'medium'
  },
  {
    name: 'phoneNumber',
    type: 'tel',
    placeholder: 'dynamicForms.placeholders.phone',
    validationScheme: { isRequired: false, isPhone: true, maxLength: 255 },
    size: 'small'
  },
  {
    name: 'email',
    placeholder: 'dynamicForms.placeholders.email',
    validationScheme: { isRequired: false, isEmail: true, maxLength: 255 },
    size: 'small'
  }
];

export const requiredEmployerFields: IFields<IEmployersForm>[] = employerFields.map((field) => {
  if (field.name === 'phoneNumber') {
    return {
      ...field,
      validationScheme: { isPhone: true, isRequired: true, maxLength: 255 }
    };
  }
  if (field.name === 'email') {
    return {
      ...field,
      validationScheme: { isEmail: true, isRequired: true, maxLength: 255 }
    };
  }
  return field;
});

export const bankFields: IFields<IUserBankForm>[] = [
  {
    name: 'banc',
    placeholder: 'dynamicForms.placeholders.bankName',
    validationScheme: { isRequired: true, maxLength: 255 },
    size: 'medium'
  },
  {
    name: 'city',
    placeholder: 'dynamicForms.placeholders.city',
    validationScheme: { isRequired: true, maxLength: 255 },
    size: 'small'
  },
  {
    name: 'businessAcc',
    placeholder: 'dynamicForms.placeholders.accountNumber',
    type: 'numbers',
    validationScheme: { isRequired: true, length: [20] },
    size: 'small'
  },
  {
    name: 'correspAcc',
    placeholder: 'dynamicForms.placeholders.correspondentAccount',
    type: 'numbers',
    validationScheme: { isRequired: true, length: [20] },
    size: 'small'
  },
  {
    name: 'BIC',
    placeholder: 'dynamicForms.placeholders.bik',
    type: 'numbers',
    validationScheme: { isRequired: true, length: [9] },
    size: 'small'
  }
];

export const documentsFields: IFields<IDocumentsForm>[] = [
  {
    name: 'docFile',
    type: 'file',
    placeholder: 'dynamicForms.placeholders.file',
    validationScheme: {
      isRequired: true,
      maxSize: 5242880,
      fileTypes: ['pdf', 'tiff']
    },
    size: 'large'
  }
];
