import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  blog: Blog = {
    title: '',
    author: '',
    description: '',
    details: ''
  };

  constructor(private router: Router,
    private blogService: BlogService) { }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  submitBlog() {
    // save the blog using the blog service
    this.blogService.saveBlog(this.blog);
    // reset the form
    this.blog = {
      title: '',
      author: '',
      description: '',
      details: ''
    };
  }
}

interface Blog {
  title: string;
  author: string;
  description: string;
  details: string;
}