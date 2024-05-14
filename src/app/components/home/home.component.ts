import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from '../../interfaces/post-model';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

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
  bookmarkedPosts: PostModel[] = [];
  categoryList: any = [];
  selectedCategory: string | null = null;
  post: PostModel = {
    isPrivate: false
  };
  isLiked = false;
  expandedPostId: number | null = null;
  isDarkMode: boolean = false;

  constructor(private restApi: ApiService,
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private postService: PostService,
    private authService: AuthService,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef) {

    this.username = this.userService.getUser();
    if (!this.username) {
      this.router.navigate(['login']);
    }
    this.http.get('http://localhost:3000/posts').subscribe(data => {
      this.postData = data;
      this.postData = this.postData.map((post: PostModel) => ({
        ...post,
        isLiked: false
      }));
      this.filteredItems = this.postData;
    });
  }

  categoryMap: { [key: number]: string } = {};

  ngOnInit(): void {
    this.themeService.getDarkMode().subscribe(darkMode => {
      this.isDarkMode = darkMode;
      this.cdr.detectChanges();
    });
    this.getBookmarkedPosts();
    this.getCategories().then(() => {
      this.getAllPost();
    });
  }

  async getCategories(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.postService.getCategoryList().subscribe(
        (data: any) => {
          this.categoryList = data;
          data.forEach((category: any) => {
            this.categoryMap[category.id] = category.cname;
          });
         // console.log('CategoryElements:', this.categoryList);
          resolve();
        },
        (error) => {
          console.error('Error:', error);
          reject();
        }
      );
    });
  }

  toggleShowMore(pid: number, event: any) {
    event.stopPropagation();
    this.expandedPostId = this.expandedPostId === pid ? null : pid;
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

  selectedFilter: string | null = null;

  filter(filterOption: string) {
    this.selectedFilter = filterOption;
    if (filterOption === 'date') {
      this.filteredItems = [...this.filteredItems].sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filterOption === 'author') {
      this.filteredItems = [...this.filteredItems].sort((a: any, b: any) =>
        a.author.localeCompare(b.author)
      );
    }
  }

  clearFilter() {
    this.selectedFilter = null;
    this.filteredItems = [...this.postData];
  }

  likePost(post: PostModel, event: any): void {
    event.stopPropagation();
    post.isLiked = !post.isLiked;
    if (post.pid !== undefined) {
      if (post.isLiked) {
        post.likes = (post.likes ?? 0) + 1;
        this.postService.likePost(post.pid).subscribe(() => {
          console.log('Updated likes for post');
        });
      }
      else {
        post.likes = (post.likes ?? 0) - 1;
        this.postService.unlikePost(post.pid).subscribe(() => {
          console.log('Updated likes for post');
        });
      }
    }
  }

  bookmarkPost(post: PostModel, event: any): void {
    event.stopPropagation();
    if (post.pid !== undefined) {
      if (post.bookmarked) {
        this.postService.removeBookmarkPost(post.pid).subscribe(() => {
          alert("Post unbookmarked");
          post.bookmarked = false;
          this.getBookmarkedPosts();
        });
      } else {
        this.postService.addBookmark(post.pid).subscribe(() => {
          alert("Post bookmarked");
          post.bookmarked = true;
          this.getBookmarkedPosts();
        });
      }
    }
  }

  getBookmarkedPosts() {
    const userId = this.userService.getUserId();
    this.authService.getBookmarkedPosts(userId).subscribe((posts: PostModel[]) => {
      this.bookmarkedPosts = posts;
    });
  }

  viewPost(post: PostModel) {
    this.router.navigate(['/view-post', post.pid]);
  }

  filterByCategory(category: string | undefined) {
    if (category) {
      this.postService.getPostsByCategory(category).subscribe(
        (data: any) => {
          this.filteredItems = data;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
  
}