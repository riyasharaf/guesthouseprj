import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'guest-house-app';
  showNavigation = false;
  isAdminSection = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
    
      this.showNavigation = !event.url.includes('/home') && event.url !== '/';
      
    
      this.isAdminSection = event.url.includes('/admin');
    });
  }
}
