import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);      
  constructor(private http: HttpClient, private authService: AuthService) {
    this.initializeDarkMode();
    }  

  setDarkMode(isDarkMode: boolean): void {
    this.darkModeSubject.next(isDarkMode);
    }
      
    getDarkMode(): Observable<boolean> {
      return this.darkModeSubject.asObservable();
    }
      
    private initializeDarkMode(): void {
      const userId = this.authService.getCurrentUserId();
      if (userId) {
        this.http.get<boolean>(`http://localhost:3000/users/${userId}/darkmode`).subscribe(
          (darkModeEnabled) => {
            this.darkModeSubject.next(darkModeEnabled);
          },

          (error) => {
            console.error('Error fetching dark mode preference:', error);
          }
      );
    }
  }
}