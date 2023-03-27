import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectSelf = (state: RootState) => state;

const dataOwnerSelector = createSelector(selectSelf, (state) => state.owner.owner);

export { dataOwnerSelector };
