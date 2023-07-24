import { RootState } from '../store';

export const selectPosts = (state: RootState) => state.postsSlice.posts;

export const selectFirstElementSlice = (state: RootState) => state.postsSlice.firstSliceElement;

export const selectSecondElementSlice = (state: RootState) => state.postsSlice.secondSliceElement;

export const searchValue = (state: RootState) => state.postsSlice.searchValue;

export const status = (state: RootState) => state.postsSlice.status;
