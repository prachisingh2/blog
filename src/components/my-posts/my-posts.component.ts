import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  myPost:any;
  constructor(private restApi:ApiService,private route:Router) {
    let uname=localStorage.getItem('user');
    if(uname===""){
      this.route.navigate(['login']);
    }
   }

  ngOnInit(): void {
    this.getMyPost();
  }
  getMyPost(){
   
    this.restApi.getMyPost(localStorage.getItem('user_id')).subscribe(res=>{
      this.myPost=res;
    })
  }
  deletePost(i:number){
    let res=confirm("Are you sure you want to delete this post?");
    if(res){
    this.restApi.deletePost(i).subscribe(res=>
      { this.getMyPost();
        alert("Post Deleted");
    })
  }

}
}
