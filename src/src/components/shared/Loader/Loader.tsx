import { FC } from 'react';
import { classNames } from 'utils';
import styles from './Loader.module.scss';

interface LoaderProps {
  size?: number;
  thickness?: number;
  color?: string;
  duration?: string;
  className?: string;
}

export const Loader: FC<LoaderProps> = ({
  size = 68,
  thickness = 3.5,
  color = '#000',
  duration = '1.5s',
  className
}) => {
  const loaderStyles = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${thickness}px`,
    borderTopWidth: `${thickness}px`,
    borderColor: color,
    borderTopColor: 'transparent',
    animationDuration: duration
  };

  return <div className={classNames(styles.loader, {}, [className])} style={loaderStyles} />;
};
