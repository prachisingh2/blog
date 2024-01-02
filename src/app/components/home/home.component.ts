import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from '../../interfaces/post-model';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postData: any;
  username: any;
  searchText: any;
  filteredItems: any;

  constructor(private restApi: ApiService,
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private postService: PostService) {
    this.username = this.userService.getUser();
    if (!this.username) {
      this.router.navigate(['login']);
    }
    this.http.get('http://localhost:3000/posts').subscribe(data => {
      this.postData = data;
      this.filteredItems = this.postData;
    });
  }
  ngOnInit(): void {
    this.getAllPost();
  }
  showMore: { [key: string]: boolean } = {};

  toggleShowMore(pid:number, event:any) {
    event.stopPropagation();
    this.showMore[pid.toString()] = !this.showMore[pid.toString()];
  }

  getAllPost() {
    this.restApi.getPost().subscribe(res => {
      this.postData = res;
      this.filteredItems = this.postData;
    })
  }
  deletePost(i: number) {
    let res = confirm("Are you sure you want to delete this post?");
    if (res) {
      this.restApi.deletePost(i).subscribe(res => {
        this.getAllPost();
        alert("Post Deleted");
      })
    }
  }
  search() {
    if (!this.searchText) {
      this.filteredItems = this.postData;
    } else {
      this.filteredItems = this.postData.filter((post: any) =>
        post.title.toLowerCase().includes(this.searchText.toLowerCase()) || 
        post.author.toLowerCase().includes(this.searchText.toLowerCase())  
      );
    }
  }
  likePost(post: PostModel, event: any): void {
    event.stopPropagation();
    
    const user = this.userService.getUser();
    const userId = user ? user.id : null;
  
    if (post.pid !== undefined && userId) {
      this.postService.likePost(post.pid.toString(), userId.toString()).subscribe((updatedPost: PostModel) => {
        post.likes = updatedPost.likes ? updatedPost.likes : 0;
        post.likedBy = updatedPost.likedBy;
      });
    }
  }
  
  viewPost(post:PostModel) {
    this.router.navigate(['/view-post', post.pid]);
  }
}
