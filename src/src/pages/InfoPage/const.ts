import { TFunction } from 'i18next';

export type ModalContentType = {
  message: string;
  actionText: string;
};

export type ModalContentDict = {
  send: ModalContentType;
  close: ModalContentType;
  success: ModalContentType;
  error: ModalContentType;
};

export const getModalContent = (t: TFunction): ModalContentDict => ({
  send: {
    message: t('modal.send.message'),
    actionText: t('modal.send.actionText')
  },
  close: {
    message: t('modal.close.message'),
    actionText: t('modal.close.actionText')
  },
  success: {
    message: t('modal.success.message'),
    actionText: t('modal.success.actionText')
  },
  error: {
    message: t('modal.error.message'),
    actionText: t('modal.error.actionText')
  }
});
