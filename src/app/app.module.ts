import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpBackend, HttpClient  } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    NewPostComponent,
    ContactFormComponent,
    MyPostsComponent,
    ViewPostComponent,
    BookmarkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'new-post/add',component:NewPostComponent},
      {path:'new-post/:id',component:NewPostComponent},
      {path:'contact-us',component:ContactFormComponent},
      {path:'signup',component:RegisterComponent},
      {path:'login',component:LoginComponent},
      {path:'home',component:HomeComponent},
      {path:'my-posts',component:MyPostsComponent},
      {path:'**',component:LoginComponent}
    ]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [
    { provide: HttpClient, deps: [HttpBackend] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
