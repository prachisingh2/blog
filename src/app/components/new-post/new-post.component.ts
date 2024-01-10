import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from '../../interfaces/post-model';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';

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
  categories: any[] = [];
  filteredItems: any;

  constructor(private formbuilder: FormBuilder,
    private restApi: ApiService,
    private route: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private categoryService: CategoryService) {
    this.paramId = this.activatedRouter.snapshot.paramMap.get('pid');
    this.authService.getCurrentUser().subscribe(user => {
      if (!user) {
        this.route.navigate(['login']);
      } else {
        this.postObj.author = user.name;
      }
    });

    if (this.paramId) {
      console.log('paramId:', this.paramId);
      this.restApi.getSinglePost(+this.paramId).subscribe(res => this.post = res[0]);
    }
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      author: [''],
      title: [''],
      content: [''],
      category: [''],
      image: [''],
      createdAt: [new Date()]
    });
    this.categoryService.getPostsByCategory('').subscribe(data => {
      this.categories = data;
    }, error => {
      console.error('Error fetching categories:', error);
    });
  }

  addNewPost(form: NgForm) {
    this.postObj.title = form.value.title;
    this.postObj.content = form.value.content;
    this.postObj.category = form.value.category;
    this.postObj.image = form.value.image;
    let date = new Date();
    let formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    this.postObj.createdAt = formattedDate;
    this.postObj.userid = this.authService.getEmail();

    if (this.paramId) {
      this.restApi.updatePost(this.postObj, +this.paramId).subscribe(res => {
        alert("Post updated successfully");
        this.route.navigate(["/my-posts"]);
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
          });
    }
  }
  filterByCategory(category: string | undefined) {
    if (category) {
      this.categoryService.getPostsByCategory(category).subscribe(
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