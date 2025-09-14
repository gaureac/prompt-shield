import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from '@/store';
import { hydrate } from '@/store/emails/slice';
import { getDataFromStorage, setDataToStorage } from '@/utils/emailStorage.ts';

const StoreInitializer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeStore = async () => {
      try {
        const storage = await getDataFromStorage();

        dispatch(hydrate(storage));

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to load state:', error);
        setIsInitialized(true);
      }
    };

    initializeStore();

    const unsubscribe = store.subscribe(async () => {
      if (!isInitialized) return;

      const state = store.getState().emails;
      try {
        await setDataToStorage(state);
      } catch (error) {
        console.error('Failed to save state to storage:', error);
      }
    });

    return unsubscribe;
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <StoreInitializer>{children}</StoreInitializer>
    </Provider>
  );
};
