import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, switchMap, BehaviorSubject } from 'rxjs';
import { catchError, filter, finalize, take } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private spinner: NgxSpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.authService.getAccessToken();

    if (token) {
      authReq = this.addTokenHeader(req, token);
    }

    // Show loader before sending the request
    this.spinner.show();

    return next.handle(authReq).pipe(
      finalize(() => {
        // Hide loader when request is complete
        this.spinner.hide();
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(() => new Error(error.message));
      })
    );
  }

  private addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // Show loader while refreshing token
      this.spinner.show();

      return this.authService.refreshToken().pipe(
        switchMap((newToken) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(newToken.token);

          return next.handle(this.addTokenHeader(req, newToken.token)).pipe(
            finalize(() => {
              // Hide loader when request is complete
              this.spinner.hide();
            })
          );
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.logout();

          this.spinner.hide(); // Hide loader in case of error
          return throwError(() => new Error(error.message));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addTokenHeader(req, token)).pipe(
          finalize(() => {
            this.spinner.hide(); // Hide loader when request is complete
          })
        ))
      );
    }
  }
}
