import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap } from 'rxjs/operators';
import { Post } from './post.model';
import { Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  constructor(private afs: AngularFirestore) {}

  getPosts() {
    return this.afs.collection<Post>('posts').valueChanges({
      idField: 'id',
    });
  }
  setPost(id: string, data: any) {
    return from(this.afs.collection('posts').doc(id).update(data)).pipe(
      switchMap(
        () =>
          this.afs
            .collection('posts')
            .doc(id)
            .valueChanges() as Observable<Post>
      )
    );
  }
  createPost(data: any) {
    return from(this.afs.collection<Post>('posts').add(data));
  }

  getPostById(id: string) {
    return this.afs
      .collection('posts')
      .doc<Post>(id)
      .valueChanges()
      .pipe(
        map((post) => {
          return {
            ...post,
            id,
          } as Post;
        })
      );
  }
}
