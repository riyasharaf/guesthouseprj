import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');

    if (!isLoggedIn) {
      // Redirect to login page
      this.router.navigate(['/login']);
      return false;
    }

    // Check if user has the required role
    const requiredRole = route.data['role'];
    if (requiredRole && userRole !== requiredRole) {
      // Redirect to appropriate page based on role
      if (userRole === 'admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/user/bookings']);
      }
      return false;
    }

    return true;
  }
} 