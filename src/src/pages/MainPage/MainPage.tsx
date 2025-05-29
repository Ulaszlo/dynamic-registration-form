import { useTranslation } from 'react-i18next';
import { Registration } from 'components/Registration';
import { Info } from 'components/Info';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { t } = useTranslation();
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>{t('mainPage.title')}</h1>
      <div className={styles.container}>
        <Registration />
        <Info />
      </div>
    </main>
  );
};
