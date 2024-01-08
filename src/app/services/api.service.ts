import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getPost() {
    return this.http.get<any>("http://localhost:3000/posts")
      .pipe(map((res: any) => {
        return res;
      }));
  }

  addPost(data: any) {
    //console.log('Author ID for postadd:', data.authorid);
    return this.http.post<any>("http://localhost:3000/posts", data, { withCredentials: true })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updatePost(data: any, pid: number) {
    //console.log('PID being sent:', pid);
    return this.http.put<any>("http://localhost:3000/posts/" + pid, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deletePost(pid: number) {
    return this.http.delete<any>("http://localhost:3000/posts/" + pid)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getSinglePost(pid: number) {
    // console.log('PID being sent:', pid);
    return this.http.get<any>("http://localhost:3000/posts/" + pid)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  addContact(data: any) {
    return this.http.post<any>("http://localhost:3000/comments", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getMyPost(authorid: number) {
    //console.log('Author ID being sent:', authorid);
    return this.http.get<any>("http://localhost:3000/author/" + authorid)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // Add comment
  addComment(pid: number, commentData: any) {
    return this.http.post<any>(`http://localhost:3000/posts/${pid}/comments`, commentData)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // Get comments
  getComments(pid: number) {
    return this.http.get<any>(`http://localhost:3000/posts/${pid}/comments`)
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
