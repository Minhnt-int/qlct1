import { Post } from './test/post.model';
import { createAction, props, ActionType } from '@ngrx/store';

export const GET_POSTS = '@Post/posts';
export const GET_POSTS_SUCCESS = '@Post/postssuccess';
export const GET_POSTS_FAILED = '@Post/postsfailed';

export const getPosts = createAction(GET_POSTS);
export const getPostsSuccess = createAction(
  GET_POSTS_SUCCESS,
  props<{ data: Post[] }>()
);
export const getPostsFailed = createAction(
  GET_POSTS_FAILED,
  props<{ error?: string }>()
);
