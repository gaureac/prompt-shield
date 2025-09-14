import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { openModal } from '@/store/modal/slice';
import { Modal } from '@/components/Modal';
import { Tabs } from '@/components/Tabs';
import { addToHistory, setCurrentEmails } from '@/store/emails/slice.ts';
import '@/styles/globals.css';

export const App = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'OPEN_MODAL') {
        const emails = e.data.payload?.emails || [];
        dispatch(setCurrentEmails({ emails }));
        dispatch(addToHistory({ emails }));
        dispatch(openModal());
      }
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <Modal>
      <Tabs />
    </Modal>
  );
};
