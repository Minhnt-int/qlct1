import { createReducer, on } from '@ngrx/store';
import { getPosts, getPostsFailed, getPostsSuccess } from './post.action';
import { initialState } from './app.state';

export const postReducer = createReducer(
  initialState,
  on(getPosts, (state) => {
    return {
      ...state,
    };
  }),
  on(getPostsSuccess, (state, { data }) => {
    return {
      ...state,
      items: data,
    };
  }),
  on(getPostsFailed, (state, { error }) => {
    return {
      ...state,
      items: error,
    };
  })
);
