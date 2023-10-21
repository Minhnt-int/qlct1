import { Post } from './../pages/test/test/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { map, switchMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit {
  url = 'http://localhost:3000';

  ngOnInit(): void {}

  constructor(private http: HttpClient, private afs: AngularFirestore) {}

  // getData() {
  //   return this.http.get(`${this.url}/data`);
  // }
  // setData(param: any, id: number) {
  //   return this.http.put(`${this.url}/data/${id}`, param);
  // }
  // addData(param: any) {
  //   return this.http.post(`${this.url}/data`, param);
  // }
  // deleteData(id: number) {
  //   return this.http.delete(`${this.url}/data/${id}`);
  // }

  getData() {
    return this.afs.collection('qlct').valueChanges({
      idField: 'id',
    });
  }
  setData(param: any, id: string) {
    return from(this.afs.doc('qlct/' + id).set(param));
  }
  addData(param: any) {
    return from(this.afs.collection('qlct').add(param));
  }
  deleteData(id: string) {
    return from(this.afs.collection('qlct').doc(id).delete());
  }

  getField() {
    return this.afs.collection('fields').valueChanges({
      idField: 'id',
    });
  }
  setField(param: any, id: string) {
    return from(this.afs.doc('fields/' + id).set(param));
  }
  addField(param: any) {
    return from(this.afs.collection('fields').add(param));
  }
  deleteField(id: string) {
    return from(this.afs.collection('fields').doc(id).delete());
  }
  // deleteData(ids: number[]) {
  //   ids.forEach((id) => this.http.delete(`${this.url}/data/${id}`));
  //   return;
  // }
  // getField() {
  //   return this.http.get(`${this.url}/field`);
  // }
  // setField(param: any, id: number) {
  //   return this.http.put(`${this.url}/field/${id}`, param);
  // }
  // addField(param: any) {
  //   return this.http.post(`${this.url}/field`, param);
  // }
  // deleteField(id: number) {
  //   return this.http.delete(`${this.url}/field/${id}`);
  // }
}
