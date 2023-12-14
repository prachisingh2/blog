import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  addUser(data:any){
    return this.http.post<any>("http://localhost:3000/profile",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  login(){
    return this.http.get<any>("http://localhost:3000/profile");
  }
}
