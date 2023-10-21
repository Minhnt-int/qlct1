import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Post } from './test/post.model';

export interface AppState extends EntityState<Post> {}
export const postAdapter = createEntityAdapter<Post>();
export const initialState: AppState = postAdapter.getInitialState();
