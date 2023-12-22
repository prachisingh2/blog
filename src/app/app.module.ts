import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewPostComponent } from './components/new-post/new-post.component';
import { RouterModule } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    NewPostComponent,
    ContactFormComponent,
    MyPostsComponent
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
