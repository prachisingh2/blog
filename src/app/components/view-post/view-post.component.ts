import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../interfaces/post-model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})

export class ViewPostComponent implements OnInit {
  post?: PostModel;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const postIdParam = this.route.snapshot.paramMap.get('pid');
    //console.log('POSTID: ',postIdParam);
    if (postIdParam) {
      const postId = Number(postIdParam);
      this.apiService.getSinglePost(postId).subscribe(data => {
       // console.log('POSTDATA: ',data);
        this.post = data[0];
      });
    } else {
      console.error('Post ID is not a number:', postIdParam);
    }
  }
}