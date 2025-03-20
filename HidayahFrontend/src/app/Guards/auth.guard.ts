import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
      return true;
    }
    // Not logged in, redirect to login
    this.router.navigate(['/signin']);
    return false;
  }
}
