import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as forge from 'node-forge';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.base_url}/Users/Login`;
  private refreshTokenUrl = `${environment.base_url}/Users/RefreshToken`;

  // Manage authentication state using a BehaviorSubject
  private authState = new BehaviorSubject<boolean>(this.hasValidToken());

  // Your RSA public key (from your public.pem file)
  publicKey: string = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQZ0YVolLtPXXSowc6CopEXzGI
  /Tvri6hYT3KZ45G97DQn8ocydBQXSZfRR92MpiZHQn1zydpVBOCj7tUnSh1QoSN9
  aISG+tuLggYWdav6XlW2JAlduHkMbbyug9aoWIyaZjXXzyV+0e3hjwQhfTeQj9DL
  uGssWNX3YuYgf/e5LQIDAQAB
  -----END PUBLIC KEY-----`;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  /**
   * Encrypt a string using the RSA public key.
   * The encryption uses RSA-OAEP with SHA-256 and the result is Base64-encoded.
   */
  encryptWithPublicKey(valueToEncrypt: string): string {
    const rsa = forge.pki.publicKeyFromPem(this.publicKey);
    return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  }

  /**
   * Sign in by encrypting the credentials and posting them to the backend.
   */
  signin(username: string, password: string): Observable<any> {
    // Encrypt the username and password using the RSA public key.
    const encryptedUsername = this.encryptWithPublicKey(username);
    const encryptedPassword = this.encryptWithPublicKey(password);

    return this.http
      .post<any>(this.apiUrl, { username: encryptedUsername, password: encryptedPassword })
      .pipe(
        map((response) => {
          // Store tokens and update session state
          this.storeTokens(response.token, response.refreshToken);
          this.authState.next(true);
          this.toastr.success('You have successfully logged in');
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          this.toastr.error('Login failed. Please check your credentials!');
          return throwError(() => new Error(error.message));
        })
      );
  }

  /**
   * Store tokens and, if available, the expiry time (decoded from the JWT).
   */
  private storeTokens(token: string, refreshToken: string) {
    const decodedToken = this.decodeToken(token);
    const expiryTime = decodedToken?.exp ? decodedToken.exp * 1000 : null;

    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refreshToken);
    if (decodedToken && decodedToken.UserName) {
      localStorage.setItem('user_name', decodedToken.UserName);
    }
    if (expiryTime) {
      localStorage.setItem('token_expiry', expiryTime.toString());
    }
  }

  /**
   * Decode a JWT token to extract the payload.
   */
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  /**
   * Retrieve the access token from local storage.
   */
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Retrieve the refresh token from local storage.
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  /**
   * Check if the token is expired.
   */
  isTokenExpired(): boolean {
    const expiryTime = localStorage.getItem('token_expiry');
    return expiryTime ? Date.now() > +expiryTime : true;
  }

  /**
   * Expose the authentication state as an observable.
   */
  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }

  /**
   * Check if there is a valid (non-expired) token stored.
   */
  private hasValidToken(): boolean {
    const token = this.getAccessToken();
    return token !== null && !this.isTokenExpired();
  }

  /**
   * Request a new access token using the refresh token.
   */
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token found'));
    }

    return this.http.post<any>(this.refreshTokenUrl, { refreshToken }).pipe(
      map((response) => {
        this.storeTokens(response.token, response.refreshToken);
        return response;
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => new Error(error.message));
      })
    );
  }

  /**
   * Log out the user and clean up all session data.
   */
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expiry');
    localStorage.removeItem('user_name');
    this.authState.next(false);
    this.router.navigate(['/signin']);
  }
}
