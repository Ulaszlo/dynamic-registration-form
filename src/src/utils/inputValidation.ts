import { ValidationScheme } from 'types/forms';
import parsePhoneNumber from 'libphonenumber-js';
import { TFunction } from 'i18next';

function validatePhoneNumber(phone: string) {
  const parsedPhone = parsePhoneNumber(phone);
  if (!parsedPhone) return false;
  return parsedPhone.isValid();
}

function validateEmail(email: string) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

export const inputValidation = (value: string | File | undefined, scheme: ValidationScheme, t: TFunction) => {
  const { maxLength, minLength, length, isRequired, isPhone, fileTypes, maxSize, isEmail, selectTypes } = scheme;

  if (isRequired && !value) return t('validationErrors.requiredField');

  if (typeof value === 'string') {
    if (isRequired && !value.trim().length) return t('validationErrors.requiredField');
    if (value && maxLength && maxLength < value.length) return t('validationErrors.maxLength', { maxLength });
    if (value && minLength && minLength > value.length) return t('validationErrors.minLength', { minLength });
    if (value && length && !length.includes(value.length))
      return t('validationErrors.exactLength', { lengths: length.join(` ${t('common.or')} `) });
    if (value && isPhone && !validatePhoneNumber(value)) return t('validationErrors.invalidPhone');
    if (value && isEmail && !validateEmail(value)) return t('validationErrors.invalidEmail');
    if (value && selectTypes && !selectTypes.includes(value)) return t('validationErrors.invalidValue');
  } else {
    if (isRequired && !value) return t('validationErrors.fileRequired');
    if (value && maxSize && value.size > maxSize)
      return t('validationErrors.fileTooLarge', { maxSize: maxSize / 1024 / 1024 });

    if (value && fileTypes?.length) {
      const allowedExtensions = new RegExp(`\\.(${fileTypes.join('|')})$`, 'i');
      if (!allowedExtensions.test(value.name)) {
        return t('validationErrors.invalidFileType', {
          types: formatFileTypes(fileTypes, t)
        });
      }
    }
  }
  return null;
};

function formatFileTypes(types: string[], t: TFunction) {
  if (types.length === 1) return `.${types[0]}`;
  if (types.length === 2) return `.${types.join(` ${t('common.and')} .`)}`;

  const lastType = types.pop();
  return `.${types.join(', ')} ${t('common.and')} .${lastType}`;
}
