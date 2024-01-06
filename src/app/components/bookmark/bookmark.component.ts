import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../interfaces/post-model';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent implements OnInit {
  bookmarkedPosts: PostModel[] = [];

  constructor(private postService: PostService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBookmarkedPosts();
  }

  getBookmarkedPosts() {
    const userId = this.userService.getUserId();
    this.authService.getBookmarkedPosts(userId).subscribe((posts: PostModel[]) => {
      this.bookmarkedPosts = posts;
    });
  }

  removeBookmarkPost(postId: number | undefined): void {
    if (postId !== undefined) {
      this.postService.removeBookmarkPost(postId).subscribe(() => {
        this.getBookmarkedPosts();
      });
    }
  }

  viewPost(post: PostModel) {
    this.router.navigate(['/view-post', post.pid]);
  }

}