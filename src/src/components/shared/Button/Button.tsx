import { ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode } from 'react';
import { classNames } from 'utils';
import styles from './Button.module.scss';

type ButtonTheme = 'primary' | 'secondary' | 'clear';

export type BackgroundColor = 'green' | 'blue' | 'purple' | 'grey';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  theme?: ButtonTheme;
  backgroundColor?: BackgroundColor;
}

export const Button = forwardRef(
  (
    { className, theme = 'primary', backgroundColor, children, ...otherProps }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        className={classNames(
          styles.button,
          {
            [styles.disabled]: !!otherProps.disabled,
            [styles[backgroundColor || '']]: !!backgroundColor
          },
          [className, styles[theme]]
        )}
        type="button"
        ref={ref}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
);
