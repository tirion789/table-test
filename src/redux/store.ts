import { configureStore } from '@reduxjs/toolkit';

import PostsSlice from './Posts/posts';

export const store = configureStore({
  reducer: {
    postsSlice: PostsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
