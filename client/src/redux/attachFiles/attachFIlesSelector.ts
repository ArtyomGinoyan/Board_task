import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectSelf = (state: RootState) => state;

const dataFilesSelector = createSelector(selectSelf, (state) => state.files.files);

export { dataFilesSelector };
