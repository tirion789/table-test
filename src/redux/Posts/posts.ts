import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PostsSliceState, Status } from './types';
import { fetchPosts } from './asyncActions';

const initialState: PostsSliceState = {
  posts: [],
  status: Status.LOADING,
  searchValue: '',
  startSliceElement: 0,
  endSliceElement: 10,
};

const PostsSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {
    setStartSliceElement(state, action) {
      state.startSliceElement = action.payload;
    },
    setEndSliceElement(state, action) {
      state.endSliceElement = action.payload;
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

export const { setStartSliceElement, setEndSliceElement, setSearchValue } = PostsSlice.actions;

export default PostsSlice.reducer;
