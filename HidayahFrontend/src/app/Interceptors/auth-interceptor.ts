import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../Auth/services/auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../Shared/services/notifications.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(
    private authService: AuthService,
    private router:Router,
    private notificationService:NotificationsService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Attach the token to the request headers if available.
    const token = this.authService.GET_TOKEN();
    // console.log("<-----InterceptorToke------->",token)
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(authReq).pipe(
      tap(event => {
        // If the server sends a new token in the response headers, update it.
        if (event instanceof HttpResponse) {
          // console.log('Response headers:', event.headers);
          const newToken = event.headers.get('Authorization');
          // console.log('<---- Refreshed Token ---->', newToken);
          if (newToken) {
            // The server might return the token as "Bearer <token>" so extract if necessary.
            const tokenParts = newToken.split(' ');
            if (tokenParts.length > 1) {
              this.authService.SET_TOKEN_LOCAL_STORAGE(tokenParts[1]);
            } else {
              this.authService.SET_TOKEN_LOCAL_STORAGE(newToken);
            }
          }
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // console.log("<------Session Expired -------->",error)
          // Token is expired or unauthorized. Here you can call a refresh token API if available.
          // For now, we'll assume no refresh token flow and log the user out.
          this.notificationService.error('Session expired. Please sign in again.')
          // Navigate to sign-in page
          this.router.navigate(['/sign-in']);
          this.authService.REMOVE_TOKEN();
          // Optionally, redirect to the login page.
          // For example: this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
