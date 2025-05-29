import { FC, memo } from 'react';
import { classNames } from 'utils';
import { FieldProps, IMainForm } from 'types/forms';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from 'consts/consts';
import { FormInputField } from 'components/FormInputField';
import { useDispatch } from 'react-redux';
import { mainFormActions } from 'store/slice/mainForm';
import { useReduxSelector } from 'store';
import styles from './CompanyRequisites.module.scss';

export const CompanyRequisites: FC = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const mainForm = useReduxSelector((state) => state.mainForm);
  const handleSetState = (field: keyof IMainForm, value: string, error: string) => {
    dispatch(mainFormActions.updateMainForm({ field, value, error }));
  };

  const mockMainInfo: FieldProps[] = [
    {
      title: t('staticForm.title'),
      rows: [
        {
          name: t('staticForm.companyName'),
          input: {
            placeholder: t('staticForm.enterFullCompanyName'),
            validationScheme: { maxLength: 255, isRequired: true },
            value: mainForm.companyName as string,
            error: mainForm.errors?.companyName,
            setState: (value, error) => handleSetState('companyName', value as string, error)
          }
        },
        {
          name: t('staticForm.companyCountry'),
          input: {
            placeholder: t('staticForm.selectCountry'),
            type: 'select',
            validationScheme: {
              isRequired: true,
              selectTypes: COUNTRIES.map((country) => country)
            },
            options: COUNTRIES.map((country) => ({ label: t(country), value: country })),
            value: mainForm.country as string,
            error: mainForm.errors?.country,
            setState: (value, error) => handleSetState('country', value as string, error)
          }
        },
        {
          name: t('staticForm.ownershipForm'),
          input: {
            placeholder: t('staticForm.specifyOwnershipForm'),
            validationScheme: { maxLength: 255, isRequired: true },
            value: mainForm.ownershipForm as string,
            error: mainForm.errors?.ownershipForm,
            setState: (value, error) => handleSetState('ownershipForm', value as string, error)
          }
        },
        {
          name: 'ИНН',
          input: {
            placeholder: t('staticForm.enterINN'),
            type: 'numbers',
            validationScheme: { length: [10, 12], isRequired: true },
            value: mainForm.INN as string,
            error: mainForm.errors?.INN,
            setState: (value, error) => handleSetState('INN', value as string, error)
          }
        },
        {
          name: 'КПП',
          input: {
            placeholder: t('staticForm.enterKPP'),
            type: 'numbers',
            validationScheme: { length: [9] },
            value: mainForm.KPP as string,
            error: mainForm.errors?.KPP,
            setState: (value, error) => handleSetState('KPP', value as string, error)
          }
        },
        {
          name: t('staticForm.OKPOCode'),
          input: {
            placeholder: t('staticForm.enterOKPO'),
            type: 'numbers',
            validationScheme: { length: [8, 10] },
            value: mainForm.OKPO as string,
            error: mainForm.errors?.OKPO,
            setState: (value, error) => handleSetState('OKPO', value as string, error)
          }
        },
        {
          name: t('staticForm.OKPFcode'),
          input: {
            placeholder: t('staticForm.enterOKOPF'),
            type: 'numbers',
            validationScheme: { length: [5] },
            value: mainForm.OKOPF as string,
            error: mainForm.errors?.OKOPF,
            setState: (value, error) => handleSetState('OKOPF', value as string, error)
          }
        }
      ]
    },
    {
      title: t('staticForm.contactInformation'),
      rows: [
        {
          name: t('staticForm.companyEmail'),
          input: {
            placeholder: 'example@mail.ru',
            validationScheme: { isRequired: true, isEmail: true, maxLength: 255 },
            value: mainForm.companyEmail as string,
            error: mainForm.errors?.companyEmail,
            setState: (value, error) => handleSetState('companyEmail', value as string, error)
          }
        },
        {
          name: t('staticForm.companyPhone'),
          input: {
            placeholder: '(XXX) XXX-XX-XX',
            type: 'tel',
            validationScheme: { isPhone: true },
            value: mainForm.companyPhone as string,
            error: mainForm.errors?.companyPhone,
            setState: (value, error) => handleSetState('companyPhone', value as string, error)
          }
        },
        {
          name: t('staticForm.fax'),
          input: {
            placeholder: 'XXXXXXXXXX',
            type: 'tel',
            validationScheme: { isPhone: true },
            value: mainForm.companyFax as string,
            error: mainForm.errors?.companyFax,
            setState: (value, error) => handleSetState('companyFax', value as string, error)
          }
        },
        {
          name: t('staticForm.companyWebsite'),
          input: {
            placeholder: t('staticForm.enterWebsiteAddress'),
            validationScheme: { maxLength: 255 },
            value: mainForm.companySite as string,
            error: mainForm.errors?.companySite,
            setState: (value, error) => handleSetState('companySite', value as string, error)
          }
        }
      ]
    }
  ];

  return (
    <>
      {mockMainInfo.map((section) => (
        <div key={section.title} className={classNames(styles.container, {}, [])}>
          <p className={styles.title}>{section.title}</p>
          {section.rows.map((row) => (
            <div key={row.name} className={styles.form}>
              <div className={styles.name}>{row.input.validationScheme?.isRequired ? `${row.name}*` : row.name}</div>
              <FormInputField className={styles.row} {...row.input} />
            </div>
          ))}
        </div>
      ))}
    </>
  );
});
