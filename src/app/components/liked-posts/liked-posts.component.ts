import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../interfaces/post-model';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-liked-posts',
  templateUrl: './liked-posts.component.html',
  styleUrl: './liked-posts.component.css'
})

export class LikedPostsComponent implements OnInit {
  likedPosts: PostModel[] = [];

  constructor(private apiService: ApiService,
    private postService: PostService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getLikedPosts();
  }

  getLikedPosts(): void {
    const user = this.userService.getCurrentUser();
    console.log('Current User:', user);  // Log current user

    if (user && user.id) {
      this.postService.getPosts().subscribe(posts => {
        console.log('Posts:', posts);  // Log posts
        this.likedPosts = posts.filter(post => post.likedBy && post.likedBy.includes(user.toString()));
        console.log('Liked Posts:', this.likedPosts);  // Log liked posts
      });
    } else {
      console.log("User or User ID is undefined");
    }
  }
}