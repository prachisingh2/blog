import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from '../../interfaces/post-model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  formValue!: FormGroup;
  postObj: PostModel = new PostModel();
  post: PostModel = {};
  paramId;
  constructor(private formbuilder: FormBuilder, private restApi: ApiService, private route: Router, private activatedRouter: ActivatedRoute) {
    let uname = localStorage.getItem('user');
    if (uname === "") {
      this.route.navigate(['login']);
    }
    this.paramId = this.activatedRouter.snapshot.paramMap.get('id');
    if (this.paramId) {
      this.restApi.getSinglePost(+this.paramId).subscribe(res => this.post = res);
    }
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id: [new Date().valueOf()],
      author: [''],
      title: [''],
      content: [''],
      image: [''],
      createdAt: [new Date()]
    })
  }
  addNewPost(form: NgForm) {
    this.postObj.id = new Date().valueOf(),
      this.postObj.author = localStorage.getItem('user');
    this.postObj.title = form.value.title;
    this.postObj.content = form.value.content;
    this.postObj.image = form.value.image;
    this.postObj.createdAt = new Date();
    this.postObj.userid = localStorage.getItem('user_id');

    if (this.paramId) {
      this.restApi.updatePost(this.postObj, +this.paramId).subscribe(res => {
        alert("Post updated successfully");
        this.route.navigate(["/"]);
      });
    }
    else {

      this.restApi.addPost(this.postObj)
        .subscribe(res => {
          console.log(res);
          alert("New Post added successfully");
          this.route.navigate(["/"])
        },
          error => {
            alert("Something went wrong");
          })
    }

  }

}
