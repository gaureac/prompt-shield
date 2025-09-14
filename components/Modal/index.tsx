import React, { useEffect, useCallback } from 'react';
import styles from './styles.module.scss';
import { selectModalIsOpen } from '@/store/modal/selectors.ts';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/store/modal/slice.ts';
import { setCurrentEmails } from '@/store/emails/slice.ts';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/utils';

interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title = '',
  description = '',
}) => {
  const isOpen = useSelector(selectModalIsOpen);
  const dispatch = useDispatch();

  const handleCancel = useCallback(() => {
    dispatch(closeModal());
    dispatch(setCurrentEmails({ emails: [] }));
  }, [dispatch]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCancel();
    };

    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      dispatch(setCurrentEmails({ emails: [] }));
    };
  }, [dispatch, handleCancel]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && handleCancel()}>
      <DialogContent
        className={cn('sm:max-w-[425px]', styles.container)}
        closeButtonClassName="!text-black hover:text-zinc-800"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};
