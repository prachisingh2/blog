import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router,
    private authenticationService: AuthService, 
    private userService: UserService) { }

  ngOnInit(): void {
  }
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
