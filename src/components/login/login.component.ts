import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router,
    private authenticationService: AuthService,) { }

  ngOnInit(): void {
  }
  onLogin(form:NgForm){
    this.authenticationService.login().subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === form.value.email && a.password === form.value.password 
      });
      if(user){
       
        localStorage.setItem('user',user.name);
        localStorage.setItem('user_id',user.email+user.password);
        localStorage.setItem('email',user.email);
      this.router.navigate(["home"])
      }else{
        alert("user not found")
      }
    },err=>{
      alert("Something went wrong")
    })

}

}
