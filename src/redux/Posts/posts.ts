import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PostsSliceState, Status } from './types';
import { fetchPosts } from './asyncActions';

const initialState: PostsSliceState = {
  posts: [],
  status: Status.LOADING,
  searchValue: '',
  firstSliceElement: 0,
  secondSliceElement: 10,
};

const PostsSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {
    setCurrentElement(state, action: PayloadAction<number>) {
      state.firstSliceElement = action.payload - 10;
      state.secondSliceElement = action.payload;
    },
    setFirstSliceElement(state, action) {
      state.firstSliceElement = action.payload;
    },
    setSecondSliceElement(state, action) {
      state.secondSliceElement = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = Status.LOADING;
      state.posts = [];
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.status = Status.ERROR;
      state.posts = [];
    });
  },
});

export const { setFirstSliceElement, setSecondSliceElement, setCurrentElement, setSearchValue } =
  PostsSlice.actions;

export default PostsSlice.reducer;
