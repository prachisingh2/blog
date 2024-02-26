import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'blApp';

  constructor(
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  ngOnInit() {
    this.themeService.getDarkMode().subscribe(isDarkModeEnabled => {
      if (isPlatformBrowser(this.platformId)) {
        if (isDarkModeEnabled) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      }
    });
  }

  toggleDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      const isDarkMode = !document.body.classList.contains('dark-mode');
      this.themeService.setDarkMode(isDarkMode);
      console.log('Dark mode is now:', isDarkMode);
    }
  }
}