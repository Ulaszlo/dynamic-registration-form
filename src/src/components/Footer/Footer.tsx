import { Button } from 'components/shared/Button';
import { FC } from 'react';
import { classNames } from 'utils';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

interface FooterProps {
  className?: string;
  cancel: () => void;
  send: () => void;
}

export const Footer: FC<FooterProps> = ({ className, cancel, send }) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(styles.footer, {}, [className])}>
      <p>{t('footerInfo')}</p>
      <div className={styles.footer_actions}>
        <Button className={styles.cancel} theme="secondary" onClick={cancel}>
          {t('cancel')}
        </Button>
        <Button className={styles.send} onClick={send}>
          {t('send')}
        </Button>
      </div>
    </div>
  );
};
