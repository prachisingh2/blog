import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostModel } from '../../interfaces/post-model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})

export class ViewPostComponent implements OnInit {
  post?: PostModel;
  comments: any[] = [];
  newComment = '';
  postId!: number;
  userEmail?: string;
  userid!: number
  replyFormId: number | null = null;

  @ViewChild('commentsSection') commentsSection!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const postIdParam = this.route.snapshot.paramMap.get('pid');

    //console.log('POSTID: ',postIdParam);
    if (postIdParam) {
      this.postId = Number(postIdParam);
      this.apiService.getSinglePost(this.postId).subscribe(data => {
        this.post = data[0];
      });

      this.apiService.getComments(this.postId).subscribe(data => {
        this.comments = data;
      });
    } else {
      console.error('Post ID is not a number:', postIdParam);
    }
    this.userid = this.userService.getUserId();
    this.authService.getEmail().subscribe(email => {
      this.userEmail = email;
    });
  }

  createComment(parentCommentId?: number): void {
    let dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    let commentData = {
      email: this.userEmail,
      user_id: this.userid,
      comment: this.newComment,
      created_at: dateTime,
      parent_comment_id: parentCommentId || null
    };

    this.apiService.addComment(this.postId, commentData).subscribe(() => {
      this.apiService.getComments(this.postId).subscribe(data => {
        this.comments = data;
      });
      this.newComment = '';
    });
  }
  showComments = false;

  toggleComments() {
    this.showComments = !this.showComments;
  }
  showReplyForm(commentId: number): void {
    this.replyFormId = commentId;
  }
  toggleReplies(commentId: number) {
    const comment = this.comments.find(c => c.id === commentId);
    if (comment) {
      comment.showReplies = !comment.showReplies;
    }
  }
}