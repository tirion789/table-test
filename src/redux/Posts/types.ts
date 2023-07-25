export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsSliceState {
  posts: PostType[];
  status: Status;
  startSliceElement: number;
  endSliceElement: number;
  searchValue: string;
}
