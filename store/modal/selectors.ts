import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

const selectModalState = (state: RootState) => state.modal;

export const selectModalIsOpen = createSelector(
  selectModalState,
  modalState => modalState.isOpen
);
