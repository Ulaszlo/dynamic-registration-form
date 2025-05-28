import { FC } from 'react';
import { classNames } from 'utils';
import { useReduxSelector } from 'store';
import { sharedActions } from 'store/slice/shared';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button } from 'components/shared/Button';
import { Icon } from 'components/shared/Icon';
import { Checkbox } from 'components/shared/Checkbox';
import { TextBlock } from 'components/shared/TextBlock';
import { POLICY_TEXT, POLICY_TEXT_EN } from 'pages/MainPage/const';
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
    <section className={classNames(styles.info, {}, [className])} aria-label="Registration information">
      <div className={styles.info_header}>
        <h2 className={styles.info_text}>{t('registration.title')}</h2>
        <div className={styles.localization} role="region" aria-label="Language selection">
          <Button
            className={classNames(styles.localization_btn, { [styles.opacity]: i18n.language !== 'ru' })}
            theme="clear"
            onClick={() => i18n.language !== 'ru' && changeLanguage('ru')}
            aria-label="Switch to Russian"
            aria-pressed={i18n.language === 'ru'}
          >
            <Icon type="flagRussia" aria-hidden="true" /> RU
          </Button>
          <div className={styles.separator} aria-hidden="true" />
          <Button
            className={classNames(styles.localization_btn, { [styles.opacity]: i18n.language !== 'en' })}
            theme="clear"
            onClick={() => i18n.language !== 'en' && changeLanguage('en')}
            aria-label="Switch to English"
            aria-pressed={i18n.language === 'en'}
          >
            <Icon type="flagEngland" aria-hidden="true" /> EN
          </Button>
        </div>
      </div>
      <article className={styles.policy}>
        <TextBlock className={styles.policy_text} text={i18n.language === 'en' ? POLICY_TEXT_EN : POLICY_TEXT} />
        <div className={styles.policy_text} role="article" aria-label="User agreement content" />
      </article>
      <div role="group" aria-labelledby="policy-agreement-label">
        <Checkbox
          label={t('policy.checkboxLabel')}
          onChange={() => dispatch(sharedActions.togglePolicyAgree())}
          id="CheckboxPolicyId"
          value={isPolicyAgree}
          aria-required="true"
        />
      </div>
    </section>
  );
};
