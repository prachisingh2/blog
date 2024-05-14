import { Component, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; 
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
   private router: Router,
    private authenticationService: AuthService, 
    private userService: UserService,
    private http:HttpClient) { }

  ngOnInit(): void {
  }


  // onSignIn(googleUser: any) {
  //   const id_token = googleUser.getAuthResponse().id_token;
  //   console.log('ID Token:', id_token); 
  //   this.authenticationService.googleLogin(id_token).subscribe({
  //     next: (res) => {
  //       console.log('Login successful:', res);
  //       this.userService.setUser(res);
  //       this.router.navigate(["home"]);
  //     },
  //     error: (error) => {
  //       console.error('Error logging in:', error);
  //     }
  //   });
  // }
  
  onLogin(form: NgForm) {
    const loginData = { email: form.value.email, password: form.value.password };
   // console.log(loginData);
    this.authenticationService.login(loginData).subscribe(res => {
      if (res) {
        this.userService.setUser(res);
        this.router.navigate(["home"]);
      } else {
        alert("Invalid login credentials");
      }
    },  err => {
      if (err.status === 401) {
        alert(err.error.message);
      } else {
        alert("Something went wrong");
      }
    });
  }

}
