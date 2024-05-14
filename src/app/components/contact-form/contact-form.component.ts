import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactInfo } from '../../interfaces/contact-info';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contact:ContactInfo=new ContactInfo();
  isDarkMode: boolean = false;

  constructor(private restApi:ApiService,
    private route:Router,
    private authService: AuthService,
    private themeService: ThemeService,
    private cdr:ChangeDetectorRef) { 
      this.authService.getCurrentUser().subscribe(user => {
        if (!user) {
          this.route.navigate(['login']);
        }
      });
    }

  ngOnInit(): void {
    this.themeService.getDarkMode().subscribe(darkMode => {
      this.isDarkMode = darkMode;
      this.cdr.detectChanges();
    });
  }
  
  newContact(form:NgForm){
    this.contact.name=form.value.name;
    this.contact.email=form.value.email;
    this.contact.subject=form.value.subject;
    this.contact.message=form.value.message;
    this.restApi.addContact(this.contact)
    .subscribe(res=>{
      console.log(res);
      alert("Message sent successfully");
      this.route.navigate(["/"])
    },
    error=>{
      alert("Something went wrong");
    })

  }

}
