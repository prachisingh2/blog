import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { PostModel } from '../interfaces/post-model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://localhost:3000/posts';
  constructor(private http: HttpClient) { }

  getPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.url);
  }

  addBookmark(postId: number): Observable<PostModel> {
    return this.http.post<PostModel>(`${this.url}/${postId}/bookmark`, {}, { withCredentials: true });
  }

  removeBookmarkPost(postId: number): Observable<PostModel> {
    return this.http.delete<PostModel>(`${this.url}/${postId}/bookmarked`, { withCredentials: true });
  }

  getSinglePost(pid: number) {
    return this.http.get<any>(`${this.url}/${pid}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  likePost(postId: number): Observable<any> {
    return this.http.post<any>(`${this.url}/${postId}/like`, {}, { withCredentials: true });
  }

  unlikePost(postId: number): Observable<any> {
    return this.http.post<any>(`${this.url}/${postId}/unlike`, {}, { withCredentials: true });
  }

  getPostsByCategory(categoryName: string): Observable<any> {
    //console.log('CategoryName: ', categoryName);
    return this.http.get(`${this.url}/category/${encodeURIComponent(categoryName)}`);
  }

  getCategoryList(): Observable<any> {
    return this.http.get(`${this.url}/category`);
    // .pipe(tap(data => console.log(data)));
  }
}