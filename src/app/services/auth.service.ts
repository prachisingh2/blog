import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser: string | undefined;
  private _currentUserId: number | undefined;

  constructor(private http:HttpClient) { }
  getUsers() {
    return this.http.get<any>("http://localhost:3000/users")
      .pipe(map((res: any) => {
        return res;
      }));
  }
  addUser(data:any){
    return this.http.post<any>("http://localhost:3000/users/register",data)
      .pipe(map((res:any) => {
        return res;
      }));
  }

  login(data: any){
    return this.http.post<any>("http://localhost:3000/users/login", data)
      .pipe(map((res: any) => {
        console.log(res.user);
        if (res && res.user) {
          this._currentUser = res.user.name;  
          this._currentUserId = res.user.id; 
          return res.user;
        } else {
          throw new Error("Invalid credentials");
        }
      }));
  }

  logout() {
    this._currentUser = undefined;
    this._currentUserId = undefined;
  }

  get currentUser(): string | undefined {
    return this._currentUser;
  }

  get currentUserId(): number | undefined {
    return this._currentUserId;
  }
}