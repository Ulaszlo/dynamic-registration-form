import { FC, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { classNames } from 'utils';
import { COUNTRIES } from 'consts/consts';
import { FormInputField } from 'components/FormInputField';
import { useReduxSelector } from 'store';
import { mainFormActions } from 'store/slice/mainForm';
import type { FieldProps, IMainForm } from 'types/forms';
import styles from './CompanyRequisites.module.scss';

const CompanyRequisites: FC = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const mainForm = useReduxSelector((state) => state.mainForm);

  const handleSetState = useCallback(
    (field: keyof IMainForm, value: string, error: string) => {
      dispatch(mainFormActions.updateMainForm({ field, value, error }));
    },
    [dispatch]
  );

  const renderSection = useCallback(
    (section: FieldProps) => (
      <div key={section.title} className={classNames(styles.container)}>
        <h3 className={styles.title}>{section.title}</h3>
        {section.rows.map((row) => (
          <div key={row.name} className={styles.form}>
            <div className={styles.name}>{row.input.validationScheme?.isRequired ? `${row.name}*` : row.name}</div>
            <FormInputField className={styles.row} {...row.input} />
          </div>
        ))}
      </div>
    ),
    []
  );

  const mockMainInfo: FieldProps[] = useMemo(
    () => [
      {
        title: t('staticForm.title'),
        rows: [
          {
            name: t('staticForm.companyName'),
            input: {
              placeholder: t('staticForm.enterFullCompanyName'),
              validationScheme: { maxLength: 255, isRequired: true },
              value: mainForm.companyName ?? '',
              error: mainForm.errors?.companyName,
              setState: (value, error) => typeof value === 'string' && handleSetState('companyName', value, error)
            }
          },
          {
            name: t('staticForm.companyCountry'),
            input: {
              placeholder: t('staticForm.selectCountry'),
              type: 'select',
              validationScheme: {
                isRequired: true,
                selectTypes: COUNTRIES
              },
              options: COUNTRIES.map((country) => ({ label: t(country), value: country })),
              value: mainForm.country ?? '',
              error: mainForm.errors?.country,
              setState: (value, error) => typeof value === 'string' && handleSetState('country', value, error)
            }
          },
          {
            name: t('staticForm.ownershipForm'),
            input: {
              placeholder: t('staticForm.specifyOwnershipForm'),
              validationScheme: { maxLength: 255, isRequired: true },
              value: mainForm.ownershipForm ?? '',
              error: mainForm.errors?.ownershipForm,
              setState: (value, error) => typeof value === 'string' && handleSetState('ownershipForm', value, error)
            }
          },
          {
            name: 'ИНН',
            input: {
              placeholder: t('staticForm.enterINN'),
              type: 'numbers',
              validationScheme: { length: [10, 12], isRequired: true },
              value: mainForm.INN ?? '',
              error: mainForm.errors?.INN,
              setState: (value, error) => typeof value === 'string' && handleSetState('INN', value, error)
            }
          },
          {
            name: 'КПП',
            input: {
              placeholder: t('staticForm.enterKPP'),
              type: 'numbers',
              validationScheme: { length: [9] },
              value: mainForm.KPP ?? '',
              error: mainForm.errors?.KPP,
              setState: (value, error) => typeof value === 'string' && handleSetState('KPP', value, error)
            }
          },
          {
            name: t('staticForm.OKPOCode'),
            input: {
              placeholder: t('staticForm.enterOKPO'),
              type: 'numbers',
              validationScheme: { length: [8, 10] },
              value: mainForm.OKPO ?? '',
              error: mainForm.errors?.OKPO,
              setState: (value, error) => typeof value === 'string' && handleSetState('OKPO', value, error)
            }
          },
          {
            name: t('staticForm.OKPFcode'),
            input: {
              placeholder: t('staticForm.enterOKOPF'),
              type: 'numbers',
              validationScheme: { length: [5] },
              value: mainForm.OKOPF ?? '',
              error: mainForm.errors?.OKOPF,
              setState: (value, error) => typeof value === 'string' && handleSetState('OKOPF', value, error)
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
              value: mainForm.companyEmail ?? '',
              error: mainForm.errors?.companyEmail,
              setState: (value, error) => typeof value === 'string' && handleSetState('companyEmail', value, error)
            }
          },
          {
            name: t('staticForm.companyPhone'),
            input: {
              placeholder: '(XXX) XXX-XX-XX',
              type: 'tel',
              validationScheme: { isPhone: true },
              value: mainForm.companyPhone ?? '',
              error: mainForm.errors?.companyPhone,
              setState: (value, error) => typeof value === 'string' && handleSetState('companyPhone', value, error)
            }
          },
          {
            name: t('staticForm.fax'),
            input: {
              placeholder: 'XXXXXXXXXX',
              type: 'tel',
              validationScheme: { isPhone: true },
              value: mainForm.companyFax ?? '',
              error: mainForm.errors?.companyFax,
              setState: (value, error) => typeof value === 'string' && handleSetState('companyFax', value, error)
            }
          },
          {
            name: t('staticForm.companyWebsite'),
            input: {
              placeholder: t('staticForm.enterWebsiteAddress'),
              validationScheme: { maxLength: 255 },
              value: mainForm.companySite ?? '',
              error: mainForm.errors?.companySite,
              setState: (value, error) => typeof value === 'string' && handleSetState('companySite', value, error)
            }
          }
        ]
      }
    ],
    [t, mainForm, handleSetState]
  );

  return <>{mockMainInfo.map(renderSection)}</>;
});

CompanyRequisites.displayName = 'CompanyRequisites';

export { CompanyRequisites };
