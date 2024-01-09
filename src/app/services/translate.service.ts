import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  translate(text: string, fromLang: string, toLang: string): Observable<any> {
    const url = `${environment.myMemoryApiUrl}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
    return this.http.get(url);

  //   const body = {
  //     text: text,
  //     source_language: fromLang,
  //     target_language: toLang
  //   };

  //   return this.http.post(url, body).pipe(
  //     catchError(error => {
  //       console.log('Error response:', error);
  //       throw error;
  //     })
  //   );
  // }
  }
}