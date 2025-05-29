import { FC } from 'react';
import { classNames } from 'utils';
import { IText } from 'types/text';
import styles from './TextBlock.module.scss';

interface TextBlockProps {
  className?: string;
  text?: IText[];
}

export const TextBlock: FC<TextBlockProps> = ({ className, text = [] }) => {
  return (
    <div className={classNames(styles.textBlock, {}, [className])}>
      {text.length > 0 &&
        text.map((textItem) => (
          <div key={textItem.title} className={styles.textBlock_item}>
            {textItem.title && (
              <h3
                className={classNames(styles.textBlock_title, {
                  [styles.textBlock_title__primary]: !!textItem.isPrimaryTitle
                })}
              >
                {textItem.title}
              </h3>
            )}
            {Array.isArray(textItem.paragraphs)
              ? textItem.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={styles.textBlock_paragraph}>
                    {paragraph}
                  </p>
                ))
              : textItem.paragraphs && <p className={styles.textBlock_paragraph}>{textItem.paragraphs}</p>}
          </div>
        ))}
    </div>
  );
};
