import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { PostModel } from '../../interfaces/post-model';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  myPost: any;

  constructor(
    private restApi: ApiService,
    private router: Router,
    private authService: AuthService) {
    this.authService.getCurrentUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['login']);
      }
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.getMyPost();
  }

  showMore: { [key: string]: boolean } = {};

  toggleShowMore(pid: number, event: any) {
    event.stopPropagation();
    this.showMore[pid.toString()] = !this.showMore[pid.toString()];
  }

  getMyPost() {
    this.authService.getCurrentUser().subscribe(user => {
      // console.log('Current user id:',currentUserId); 
      if (user) {
        this.restApi.getMyPost(user.id).subscribe(res => {
          this.myPost = res;
          // console.log('Fetched Posts:', this.myPost);
        });
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  viewPost(post: PostModel) {
    this.router.navigate(['/view-post', post.pid]);
  }

  deletePost(i: number) {
    let res = confirm("Are you sure you want to delete this post?");
    if (res) {
      this.restApi.deletePost(i).subscribe(res => {
        this.getMyPost();
        alert("Post Deleted");
        this.router.navigate(['/my-posts']);
      });
    }
  }

}