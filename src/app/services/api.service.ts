import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  getPost() {
    return this.http.get<any>("http://localhost:3000/posts")
      .pipe(map((res: any) => {
        return res;
      }));
  }

  addPost(data: FormData) {
    //console.log('add post data:', data);
    return this.http.post<any>("http://localhost:3000/posts", data, { withCredentials: true })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  updatePost(data: FormData, pid: number) {
    //console.log('Update postdata:', data); console.log('PID being sent:', pid);
    return this.http.put<any>("http://localhost:3000/posts/" + pid, data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  deletePost(pid: number) {
    return this.http.delete<any>("http://localhost:3000/posts/" + pid)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getSinglePost(pid: number) {
    return this.http.get<any>("http://localhost:3000/posts/" + pid)
      .pipe(map((res: any) => {
        if (res) {
          if (res.media && res.media.data) {
            let mediaBase64 = btoa(new Uint8Array(res.media.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            let mediaUrl = 'data:image/jpeg;base64,' + mediaBase64;
            res.media = this.sanitizer.bypassSecurityTrustUrl(mediaUrl);
          }
          return res;
        } else {
          throw new Error('Post not found');
        }
      }));
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
