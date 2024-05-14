import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: any;
  messages: any[] = [];
  darkMode: boolean = false;

  constructor(private router: Router,
    private userService: UserService,
    private messageService: MessageService) {
    this.username = this.userService.getUser();
    if (!this.username) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    // this.themeService.getDarkMode().subscribe(isDarkModeEnabled => {
    //   this.darkMode = isDarkModeEnabled;
    //   if (isDarkModeEnabled) {
    //     document.body.classList.add('dark-mode');
    //   } else {
    //     document.body.classList.remove('dark-mode');
    //   }
    // });
  }


  newPost() {
    this.router.navigate(["/new-post/add"]);
  }

  logout() {
    this.userService.clearUser();
    this.router.navigate(['login']);
    sessionStorage.clear();
  }

  openMessages() {
    const userId = this.userService.getUserId();
    this.messageService.getMessages(userId).subscribe(messages => {
      this.messages = messages;
    });
  }

  // toggleDarkMode() {
  //   const newDarkModeState = !this.darkMode;
  //   this.themeService.setDarkMode(newDarkModeState).subscribe({
  //     next: (response) => {
  //     console.log('Dark mode preference updated:', response);
  //     this.darkMode = newDarkModeState;
  //     if (this.darkMode) {
  //       document.body.classList.add('dark-mode');
  //     } else {
  //       document.body.classList.remove('dark-mode');
  //     }
  //   },
  //   error: (error) => {
  //     console.error('Failed to update dark mode preference:', error);
  //   }
  // });
  // }
  
}
