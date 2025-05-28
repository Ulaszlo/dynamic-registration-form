import { FC, HTMLAttributes } from 'react';
import { classNames } from 'utils';
import {
  Add,
  Download,
  FlagRussia,
  FlagEngland,
  Trash,
  ArrowThin,
  Checked,
  CloseThin,
  Warning,
  CloseCircle,
  CheckedBig,
  Error,
  Export,
  Import,
  Logo
} from 'components/shared/icons';
import styles from './Icon.module.scss';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  type: IconType;
  className?: string;
  color?: string;
}

export type IconType =
  | 'add'
  | 'download'
  | 'flagRussia'
  | 'flagEngland'
  | 'trash'
  | 'arrowThin'
  | 'closeThin'
  | 'checked'
  | 'warning'
  | 'closeCircle'
  | 'checkedBig'
  | 'error'
  | 'export'
  | 'import'
  | 'logo';
export const getIcons = (color?: string) => {
  return new Map<IconType, JSX.Element>([
    // action
    ['export', <Export color={color} />],
    ['import', <Import color={color} />],
    ['download', <Download color={color} />],
    ['trash', <Trash color={color} />],
    ['add', <Add color={color} />],
    ['closeCircle', <CloseCircle color={color} />],

    // flag
    ['flagRussia', <FlagRussia color={color} />],
    ['flagEngland', <FlagEngland color={color} />],

    //Thin
    ['arrowThin', <ArrowThin color={color} />],
    ['closeThin', <CloseThin color={color} />],

    // checked
    ['checkedBig', <CheckedBig color={color} />],
    ['checked', <Checked color={color} />],

    // warning / error
    ['warning', <Warning color={color} />],
    ['error', <Error color={color} />],

    // logo
    ['logo', <Logo color={color} />]
  ]);
};

export const Icon: FC<IconProps> = ({ type, className, color, ...rest }) => {
  const getIcon = (type: IconType) => {
    return getIcons(color).get(type);
  };

  return (
    <div className={classNames(styles.container, {}, [className])} {...rest}>
      {getIcon(type)}
    </div>
  );
};
