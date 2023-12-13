import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogs: Blog[] = [];

  saveBlog(blog: Blog): void {
    this.blogs.push(blog);
  }
}

interface Blog {
  title: string;
  author: string;
  description: string;
  details: string;
}