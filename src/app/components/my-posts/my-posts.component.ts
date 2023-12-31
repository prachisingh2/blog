import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  myPost: any;

  constructor(
    private restApi: ApiService,
    private route: Router,
    private authService: AuthService
  ) {
    let uname = this.authService.currentUser;
    if (!uname) {
      this.route.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.getMyPost();
  }

  getMyPost() {
    const currentUserId = this.authService.currentUserId;
    //console.log(this.authService.currentUserId);
    if (currentUserId) {
        this.restApi.getMyPost(currentUserId).subscribe(res => {
            this.myPost = res;
            //console.log(this.myPost);  
        });
    } else {
      this.route.navigate(['login']);
    }
  }

  deletePost(i: number) {
    let res = confirm("Are you sure you want to delete this post?");
    if (res) {
      this.restApi.deletePost(i).subscribe(res => {
        this.getMyPost();
        alert("Post Deleted");
      })
    }
  }
}