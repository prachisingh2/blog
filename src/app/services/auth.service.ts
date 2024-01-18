import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
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
          return res.user;
        } else {
          throw new Error("Invalid credentials");
        }
      }));
  }

  logout() {
    return this.http.get<any>("http://localhost:3000/users/logout", { withCredentials: true })
      .pipe(map((res: any) => {
        if (res && res.message === 'Logged out') {
          return true;
        } else {
          throw new Error('Logout failed');
        }
      }));
  }

  getCurrentUser() {
    return this.http.get<any>("http://localhost:3000/users/me", { withCredentials: true });
    
  }
}