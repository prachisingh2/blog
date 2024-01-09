import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PostModel } from '../../interfaces/post-model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})

export class ViewPostComponent implements OnInit {
  post?: PostModel; inputText = '';
  comments: any[] = [];
  newComment = '';
  postId!: number;
  userEmail?: string;
  userid!: number
  replyFormId: number | null = null;
  postTranslated = false;
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'it', label: 'Italian' },
    { code: 'pt', label: 'Portuguese' },
    { code: 'ru', label: 'Russian' },
    { code: 'ja', label: 'Japanese' },
    { code: 'zh', label: 'Chinese' },
    { code: 'hi', label: 'Hindi' },
    { code: 'te', label: 'Telugu' },
    { code: 'ta', label: 'Tamil' }, 
    { code: 'ml', label: 'Malayalam' }, 
    { code: 'kn', label: 'Kannada' },
    { code: 'ar', label: 'Arabic' },
    { code: 'ko', label: 'Korean' },
    { code: 'el', label: 'Greek' },
    { code: 'nl', label: 'Dutch' }
  ];

  @ViewChild('commentsSection') commentsSection!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private userService: UserService,
    private translateService: TranslateService
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

  translatePost(sourceLang: string, targetLang: string) {
    if (this.post) {
      if (this.post.title) {
        this.translateText(this.post.title, sourceLang, targetLang).then(translatedTitle => {
          this.post!.title = translatedTitle;
        });
      }
      if (this.post.content) {
        this.translateText(this.post.content, sourceLang, targetLang).then(translatedContent => {
          this.post!.content = translatedContent;
        });
      }
    }
  }

  async translateText(text: string, sourceLang: string, targetLang: string) {
    let chunks = this.splitTextIntoChunks(text, 500);
    let translatedChunks = await Promise.all(chunks.map(chunk => {
      return this.translateService.translate(chunk, sourceLang, targetLang).toPromise()
        .then(response => response.responseData.translatedText);
    }));

    return translatedChunks.join(' ');
  }

  splitTextIntoChunks(text: string, maxChunkSize: number): string[] {
    let chunks = [];
    let i = 0;
    while (i < text.length) {
      chunks.push(text.slice(i, i + maxChunkSize));
      i += maxChunkSize;
    }
    return chunks;
  }
}
