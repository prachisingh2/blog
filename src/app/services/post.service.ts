import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { PostModel } from '../interfaces/post-model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:3000/posts');
  }

  // likePost(postId: string, userId: string): Observable<any> {
  //   return this.http.get<PostModel>(`http://localhost:3000/posts/${postId}`).pipe(
  //     switchMap(post => {
  //       post.likes = post.likes ? post.likes + 1 : 1;
  //       post.likedBy = post.likedBy ? [...post.likedBy, userId] : [userId];
  //       return this.http.put(`http://localhost:3000/posts/${postId}`, post);
  //     }),
  //     catchError(error => {
  //       console.error('Error in likePost:', error);
  //       throw error;
  //     })
  //   );
  // }
  getSinglePost(pid: number) {
    return this.http.get<any>("http://localhost:3000/posts/" + pid)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  // getSinglePostByTitle(title: string) {
  //   return this.http.get<any>(`http://localhost:3000/posts/?title=${title}`)
  //     .pipe(map((res: any) => {
  //       return res;
  //     }))
  // }
}