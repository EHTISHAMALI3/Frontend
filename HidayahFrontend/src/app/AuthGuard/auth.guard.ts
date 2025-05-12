import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../Auth/services/auth.service';
import { NotificationsService } from '../Shared/services/notifications.service';

@Injectable({
  providedIn: 'root', // Ensure it's provided at the root level
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private notificationService:NotificationsService) {}


  canActivate(): boolean {
    const token = this.authService.GET_TOKEN();
    if (token && !this.authService.IS_TOKEN_EXPIRED(token)) {
      return true;
    }
    // Not logged in, redirect to login
     // Invalid or expired token
    //  this.notificationService.error('Session expired. Please sign in.');
     this.authService.REMOVE_TOKEN()
     this.router.navigate(['/sign-in']);
     return false;
  }
}
