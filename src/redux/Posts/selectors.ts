import { RootState } from '../store';

export const selectPosts = (state: RootState) => state.postsSlice.posts;

export const selectStartSliceElement = (state: RootState) => state.postsSlice.startSliceElement;

export const selectEndSliceElement = (state: RootState) => state.postsSlice.endSliceElement;

export const searchValue = (state: RootState) => state.postsSlice.searchValue;

export const status = (state: RootState) => state.postsSlice.status;
