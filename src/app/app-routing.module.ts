import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LikedPostsComponent } from './components/liked-posts/liked-posts.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'liked-posts',
    component: LikedPostsComponent
  },
  { 
    path: 'new-post', 
    component: NewPostComponent 
  },
  {
    path: 'edit-post/:pid',
    component: NewPostComponent
  },
  {
    path:'my-posts',
    component: MyPostsComponent
  },
  { 
    path: 'view-post/:pid', 
    component: ViewPostComponent 
  }, 
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
