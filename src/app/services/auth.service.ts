import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  private currentUserId: number | null = null;

  getUsers() {
    return this.http.get<any>("http://localhost:3000/users", { withCredentials: true })
      .pipe(map((res: any) => {
        return res;
      }));
  }
  addUser(data: any) {
    return this.http.post<any>("http://localhost:3000/users/register", data, { withCredentials: true })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  login(data: any) {
    return this.http.post<any>("http://localhost:3000/users/login", data, { withCredentials: true })
      .pipe(map((res: any) => {
        //console.log(res.user);
        if (res && res.user) {
          this.currentUserId = res.user.id;
          return res.user;
        } else {
          throw new Error("Invalid credentials");
        }
      }));
  }

  // googleLogin(credential: string): Observable<any> {
  //   return this.http.post<any>("http://localhost:3000/users/login/google", { credential }, { withCredentials: true })
  //     .pipe(map((res: any) => {
  //       if (res && res.user) {
  //         this.currentUserId = res.user.id;
  //         return res.user;
  //       } else {
  //         throw new Error("Google login failed");
  //       }
  //     }));
  // }

  logout() {
    return this.http.get<any>("http://localhost:3000/users/logout", { withCredentials: true })
      .pipe(map((res: any) => {
        if (res && res.message === 'Logged out') {
          this.currentUserId = null;
          return true;
        } else {
          throw new Error('Logout failed');
        }
      }));
  }

  getCurrentUser() {
    return this.http.get<any>("http://localhost:3000/users/me", { withCredentials: true });

  }


  getCurrentUserId(): number | null {
    return this.currentUserId;
  }

  getEmail(): Observable<string> {
    return this.getCurrentUser().pipe(
      map(user => user.email)
    );
  }

  getBookmarkedPosts(userId: number) {
    return this.http.get<any>(`http://localhost:3000/users/${userId}/bookmarks`, { withCredentials: true })
      .pipe(map((res: any) => {
        return res;
      }));
  }
}