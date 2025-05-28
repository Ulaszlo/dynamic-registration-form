import React, { FC } from 'react';
import { classNames } from 'utils';
import { Button } from 'components/shared/Button';
import styles from './ErrorPage.module.scss';

interface PageErrorProps {
  className?: string;
}

export const ErrorPage: FC<PageErrorProps> = ({ className }) => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(styles.pageError, {}, [className])}>
      <div className={styles.box}>
        <p className={styles.text}>Произошла непредвиденная ошибка</p>
        <Button className={styles.btn} onClick={reloadPage}>
          Обновить страницу
        </Button>
      </div>
    </div>
  );
};
