import { FC } from 'react';
import { classNames } from 'utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useReduxSelector } from '../../store';
import { Button } from '../shared/Button';
import { COMPANY_CATEGORY, POLICY_TEXT } from '../../pages/MainPage/const';
import { Icon } from '../shared/Icon';
import { TextBlock } from '../shared/TextBlock';
import { Checkbox } from '../shared/Checkbox';
import { sharedActions } from '../../store/slice/shared';
import styles from './Info.module.scss';

interface InfoProps {
  className?: string;
}

export const Info: FC<InfoProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const { isPolicyAgree } = useReduxSelector((state) => state.shared);
  const dispatch = useDispatch();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  return (
    <div className={styles.info}>
      <div className={styles.info_header}>
        <p className={styles.info_text}>
          Для успешного прохождения регистрации рекомендуется ознакомиться с Инструкцией по регистрации
        </p>
        <div className={styles.localization}>
          <Button
            className={classNames(styles.localization_btn, { [styles.opacity]: i18n.language !== 'ru' })}
            theme="clear"
            onClick={() => i18n.language !== 'ru' && changeLanguage('ru')}
          >
            <Icon type="flagRussia" /> RU
          </Button>
          <div className={styles.separator} />
          <Button
            className={classNames(styles.localization_btn, { [styles.opacity]: i18n.language !== 'en' })}
            theme="clear"
            onClick={() => i18n.language !== 'en' && changeLanguage('en')}
          >
            <Icon type="flagEngland" /> EN
          </Button>
        </div>
      </div>
      <div className={styles.policy}>
        <p className={styles.policy_title}>Пользовательское соглашение</p>
        <TextBlock className={styles.policy_text} text={POLICY_TEXT} />
      </div>
      <Checkbox
        label="Я принимаю условия пользовательского соглашения"
        onChange={() => dispatch(sharedActions.togglePolicyAgree())}
        id="CheckboxPolicyId"
        value={isPolicyAgree}
      />
    </div>
  );
};
