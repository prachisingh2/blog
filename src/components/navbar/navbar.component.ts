import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: any;
  constructor(private router: Router) {
    let uname = localStorage.getItem('user');
    if (uname !== "") {
      this.username = uname;
    }
    else {
      this.router.navigate(['login']);
    }

  }

  ngOnInit(): void {

  }
  newPost() {
    this.router.navigate(["/new-post/add"]);
  }
  logout() {
    localStorage.setItem('user', "");
    localStorage.setItem('user_id', "");
    localStorage.setItem('email', "");
    this.router.navigate(['login']);
    sessionStorage.clear();
  }


}
