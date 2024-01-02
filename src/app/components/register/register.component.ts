import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = { name: '', email: '', password: '' };
  confirmPassword: string = '';

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  onSignup(): void {
    if (this.user.password === this.confirmPassword) {
      this.user.id = new Date().valueOf();
      this.auth.addUser(this.user).subscribe(
        res => {
          this.userService.setUser(this.user);
          this.router.navigate(["home"]);
        },
        error => {
          alert("Some error occurred");
        }
      );
    } else {
      alert("Passwords do not match");
    }
  }
}