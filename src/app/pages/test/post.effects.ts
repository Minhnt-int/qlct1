import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostServiceService } from './test/post.service.service';
import * as postActions from './post.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { Post } from './test/post.model';
@Injectable()
export class postEffect {
  constructor(
    private actions$: Actions,
    private postService: PostServiceService
  ) {}

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.getPosts),
      switchMap(() =>
        this.postService.getPosts().pipe(
          map((posts: Post[]) => postActions.getPostsSuccess({ data: posts })),
          catchError((error) => of(postActions.getPostsFailed({ error })))
        )
      )
    )
  );
}
