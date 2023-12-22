import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from '../../interfaces/post-model';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';

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
    private router: Router, private http: HttpClient) {
    let uname = localStorage.getItem('user');
    if (uname !== "") {
      this.username = uname;
    }
    else {
      this.router.navigate(['login']);
    }
    this.http.get('/db.json').subscribe(data => {
      this.postData = data;
      this.filteredItems = this.postData;
    });
  }
  ngOnInit(): void {
    this.getAllPost();
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
        post.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }


}
