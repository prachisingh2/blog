import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;
  private currentUser: User | null;

  constructor() {
    this.currentUser = null;
    this.user = null;
  }

  setUser(user: User): void {
    this.user = user;
    this.currentUser = user;
  }

  getUser(): any {
    return this.user;
  }

  getUserId(): number {
    return this.user ? this.user.id : null;
  }

  getEmail(): string {
    return this.user ? this.user.email : null;
  }

  clearUser(): void {
    this.user = null;
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

}