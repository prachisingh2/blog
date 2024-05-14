import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from '../../interfaces/post-model';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { HttpClient } from '@angular/common/http';

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
  categoryList: any = [];
  selectedCategory: any;

  constructor(private http: HttpClient,
    private formbuilder: FormBuilder,
    private restApi: ApiService,
    private route: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService) {
    this.paramId = this.activatedRouter.snapshot.paramMap.get('pid');
    this.authService.getCurrentUser().subscribe(user => {
      if (!user) {
        this.route.navigate(['login']);
      } else {
        this.postObj.author = user.name;
      }
    });

    if (this.paramId) {
      //console.log('paramId:', this.paramId);
      this.restApi.getSinglePost(+this.paramId).subscribe(res => this.post = res);
    }
  }

  ngOnInit(): void {
    this.post = {category_id: undefined};
    this.formValue = this.formbuilder.group({
      author: [''],
      title: [''],
      content: [''],
      category_id: [''],
      image: [''],
      scheduledAt: [''],
      createdAt: [new Date()]
    });
    this.getCategories();
  }

  addNewPost(form: NgForm) {
    let formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('content', form.value.content);
    formData.append('createdAt', new Date().toISOString().slice(0, 19).replace('T', ' '));
    formData.append('author', this.postObj.author);
    const scheduledAtValue = form.value.scheduledAt ? new Date(form.value.scheduledAt).toISOString().slice(0, 19).replace('T', ' ') : null;
    
    if (this.post && this.post.category_id) {
      formData.append('category_id', Number(this.post.category_id).toString());
    }    
  
    if (this.selectedFile) {
      formData.append('media', this.selectedFile, this.selectedFile.name);
    }
  
    if (this.post.image) {
      formData.append('image', this.post.image);
    }
    
    if (scheduledAtValue) {
      formData.append('scheduledAt', scheduledAtValue);
    }
  
    this.authService.getEmail().subscribe(email => {
      formData.append('userid', email);
      
      if (this.paramId) {
        this.restApi.updatePost(formData, +this.paramId).subscribe(res => {
          alert("Post updated successfully");
          this.route.navigate(["/my-posts"]);
        }, error => {
          alert("Something went wrong");
        });
      } else {
        this.restApi.addPost(formData).subscribe(res => {
          alert("New Post added successfully");
          this.route.navigate(["/my-posts"]);
        }, error => {
          alert("Something went wrong");
        });
      }
    });
  }

  getCategories(): void {
    this.postService.getCategoryList().subscribe(
      (data: any) => {
        this.categories = data;
        // console.log('CategoryElements:', this.categoryList);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  selectedFile!: File;

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    if (file) {
      this.selectedFile = file[0];
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.cname === c2.cname : c1 === c2;
  }

  onCategoryChange(categoryId: number) {
    this.post.category_id = categoryId;
    //console.log(this.post.category_id);
  }
}