import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
private apiUrl = 'http://localhost:3000/users/messages';

constructor(private http: HttpClient) {}

// Method to retrieve messages for the current user
getMessages(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/all/${userId}`).pipe(
    map((res: any) => {
      return res;
    })
  );
}

// Method to send a new message
sendMessage(receiverId: number, content: string): Observable<any> {
  const messageData = { receiverId, content };
  return this.http.post<any>(`${this.apiUrl}`, messageData).pipe(
    map((res: any) => {
      return res;
    })
  );
}
}