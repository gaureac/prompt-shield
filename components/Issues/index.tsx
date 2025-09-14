import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissEmail } from '@/store/emails/slice';
import styles from './styles.module.scss';
import { selectActiveEmails } from '@/store/emails/selectors.ts';
import { AppDispatch } from '@/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';

const EmptyState = () => (
  <div className={styles.empty}>
    <h3 className={styles.title}>No e-mail addresses detected</h3>
  </div>
);

export const Issues: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeEmails = useSelector(selectActiveEmails);

  const handleDismiss = (email: string) => {
    dispatch(dismissEmail({ email }));
  };

  if (activeEmails.length === 0) return <EmptyState />;

  return (
    <>
      <h3 className={styles.title}>Email addresses detected</h3>
      <p className={styles.description}>
        The following email addresses were found in the text:
      </p>

      <div className={cn('bg-gray-50', styles.emailList)}>
        {activeEmails.map(email => {
          return (
            <div key={email} className={styles.emailItem}>
              <span>{email}</span>
              <Button
                onClick={() => handleDismiss(email)}
                className={cn('pt-0 pb-0', styles.dismissButton)}
              >
                Dismiss
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};
