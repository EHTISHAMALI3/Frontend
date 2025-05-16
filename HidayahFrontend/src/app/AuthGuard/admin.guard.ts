import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Auth/services/auth.service';
import { STORAGE_KEYS } from '../Models/storage-keys';
import { BrowserStorageService } from '../Shared/services/browser-storage.service';
import { NotificationsService } from '../Shared/services/notifications.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Ensure it's provided at the root level
})


export class AdminAuthGuard {
      ADMIN_ROLES = ['2', '3', '4', '5'];
  
    constructor(private authService: AuthService, private router: Router,private notificationService:NotificationsService,private BROWSER_STORAGE_SERVICE:BrowserStorageService) {}
  
  
    canActivate(): boolean {
          const ROLE_ID = this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_GET(STORAGE_KEYS.ROLE_ID) ||
          this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_GET(STORAGE_KEYS.ROLE_ID);
          const token = this.authService.GET_TOKEN();
      if (token && !this.authService.IS_TOKEN_EXPIRED(token) && this.ADMIN_ROLES.includes(ROLE_ID ?? '')) {
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
