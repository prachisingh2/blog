import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private baseUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }

  getPostsByCategory(categoryName: string): Observable<any> {
    console.log('CategoryName: ', categoryName);
    return this.http.get(`${this.baseUrl}/category/${encodeURIComponent(categoryName)}`);
  }

  getCategoryList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/category`);
  }
}