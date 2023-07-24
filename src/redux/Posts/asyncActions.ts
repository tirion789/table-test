import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ApiRoutes } from '../../common/constans';
import { PostType } from './types';

export const fetchPosts = createAsyncThunk<PostType[]>('posts/fetchPosts', async () => {
  const { data } = await axios.get<PostType[]>(`${ApiRoutes.Posts}/posts`);

  return data;
});
