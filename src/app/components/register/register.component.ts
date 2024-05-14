import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

// declare global {
//   interface Window {
//     onGoogleSignUp: (googleUser: any) => void;
//   }
// }
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = { name: '', email: '', password: '' };
  confirmPassword: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platformId)) {
    //   // Browser-only code can safely run here
    //   window.onGoogleSignUp = this.onGoogleSignUp.bind(this);
    // }
  }

  onSignup(): void {
    if (this.user.password === this.confirmPassword) {
      this.auth.addUser(this.user).subscribe({
        next: (res) => {
          const newUser = { ...this.user, id: res.insertId };
          this.userService.setUser(newUser);
          this.router.navigate(["home"]);
        },
        error: (error) => {
          console.error("Some error occurred", error);
          alert("Some error occurred");
        }
      });
    } else {
      alert("Passwords do not match");
    }
  }

  // onGoogleSignUp(googleUser: any) {
  //   const id_token = googleUser.getAuthResponse().id_token;
  //   // Use the id_token to sign up the user via your authentication service
  //   this.auth.googleSignUp(id_token).subscribe({
  //     next: (res) => {
  //       // Handle successful signup, e.g., navigating to the home page
  //       this.router.navigate(["home"]);
  //     },
  //     error: (error) => {
  //       // Handle errors, e.g., showing a message to the user
  //       console.error('Error signing up with Google:', error);
  //     }
  //   });
  // }
}