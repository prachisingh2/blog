import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  addPost(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getPost(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updatePost(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deletePost(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getSinglePost(id:number){
    return this.http.get<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  addContact(data:any){
    return this.http.post<any>("http://localhost:3000/comments",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getMyPost(uid:any){
    return this.http.get<any>("http://localhost:3000/posts?q="+uid)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
