import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'guest-house-app';
  showNavigation = false;
  isAdminSection = false;

  constructor(private router: Router) {
    // Subscribe to router events to update navigation visibility
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Don't show navigation on login page
      this.showNavigation = !event.url.includes('/login');
      
      // Check if we're in admin section
      this.isAdminSection = event.url.includes('/admin');
    });
  }

  ngOnInit() {
    // Initial check for navigation visibility
    this.showNavigation = !this.router.url.includes('/login');
    this.isAdminSection = this.router.url.includes('/admin');
  }
}
