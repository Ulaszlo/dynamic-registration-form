import { FC } from 'react';
import { classNames } from 'utils';
import { useReduxSelector } from 'store';
import { sharedActions } from 'store/slice/shared';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Select } from 'components/shared/Select';
import { Button } from 'components/shared/Button';
import { INFO_PAGE } from 'consts/consts';
import { COMPANY_CATEGORY } from 'pages/MainPage/const';
import { CompanyType } from 'types/forms';
import styles from './Registration.module.scss';

interface RegistrationProps {
  className?: string;
}

export const Registration: FC<RegistrationProps> = ({ className }) => {
  // const { t } = useTranslation();
  const { isPolicyAgree, companyType } = useReduxSelector((state) => state.shared);
  const initialOption = COMPANY_CATEGORY.find((option) => option.value === companyType) || COMPANY_CATEGORY[0];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={classNames(styles.registration, {}, [className])}>
      <p className={styles.registration_text}>Выберите категорию регистрируемой компании</p>
      <Select
        options={COMPANY_CATEGORY}
        // TODO переписать CompanyType на enum и избавится от as
        onChange={(option) => dispatch(sharedActions.setCompanyType(option.value as CompanyType))}
        initialValue={initialOption}
      />
      <Button
        className={styles.registration_btn}
        disabled={!(companyType && companyType !== '-1' && isPolicyAgree)}
        onClick={() => navigate(INFO_PAGE)}
      >
        Далее
      </Button>
    </div>
  );
};
