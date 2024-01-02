import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: any;
  constructor(private router: Router,private userService: UserService) {
    this.username = this.userService.getUser();
    if (!this.username) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {

  }
  newPost() {
    this.router.navigate(["/new-post/add"]);
  }
  logout() {
    this.userService.clearUser();
    this.router.navigate(['login']);
    sessionStorage.clear();
  }


}
