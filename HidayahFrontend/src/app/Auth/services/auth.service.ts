import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import { Observable,tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BrowserStorageService } from '../../Shared/services/browser-storage.service';
import { Router } from '@angular/router';
import { STORAGE_KEYS } from '../../Models/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private HTTP: HttpClient,
    // private toastr: ToastrService,
    private ROUTER: Router,
    private BROWSER_STORAGE_SERVICE:BrowserStorageService,
  ) {}

  /**
   * Encrypt a string using the RSA public key.
   * The encryption uses RSA-OAEP with SHA-256 and the result is Base64-encoded.
   */
  ENCRYPTION_WITH_PUBLIC_KEY(valueToEncrypt: string): string {
    const rsa = forge.pki.publicKeyFromPem(environment.PUBLIC_KEY);
    return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  }

  DECRYPT(encryptedBase64: string): string {
    try {
      const encryptedBytes = forge.util.decode64(encryptedBase64);
      const privateKey = forge.pki.privateKeyFromPem(environment.PRIVATE_KEY);
      
      // Try switching to PKCS#1 v1.5 padding
      const decrypted = privateKey.decrypt(encryptedBytes, 'RSAES-PKCS1-V1_5');
      return decrypted;
    } catch (err) {
      console.error('Decryption failed:', err);
      return '';
    }
  }
  
  /**
   * Sign in by encrypting the credentials and posting them to the backend.
   */
  SIGN_IN(USER_NAME_OR_EMAIL: string, PASSWORD: string,IS_REMEMBER_ME_CHECKED:boolean): Observable<any> {
    // Encrypt the username and password using the RSA public key.
    const ENCRYPTED_USER_NAME = this.ENCRYPTION_WITH_PUBLIC_KEY(USER_NAME_OR_EMAIL);
    const ENCRYPTED_PASSWORD = this.ENCRYPTION_WITH_PUBLIC_KEY(PASSWORD);
    return this.HTTP
      .post<any>(`${environment.BASE_URL}/Users/Login`, { usernameOrEmail: ENCRYPTED_USER_NAME, password: ENCRYPTED_PASSWORD })
      .pipe(
        tap((response:any) => {
          if (IS_REMEMBER_ME_CHECKED) {
            console.log("<-------Response------->",response)
            // this.SET_TOKEN_LOCAL_STORAGE(response.respData.token);
            
            // const ENCODED_PAYLOAD =this.decodeJwt(response.respData.token); // From your earlier JWT decode method
            // console.log("<--------Encoded payload---------->",ENCODED_PAYLOAD);
            // const USER_ID = this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET("USER_ID",ENCODED_PAYLOAD.USER_ID);
            // const USER_NAME =  this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET("USER_NAME",ENCODED_PAYLOAD.USER_NAME);
            // const EMAIL =  this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET("EMAIL",ENCODED_PAYLOAD.EMAIL);
            // const ROLE_ID = this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET("ROLE_ID",ENCODED_PAYLOAD.ROLE_ID);
            // const IS_LOCKED =  this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET("IS_LOCKED",ENCODED_PAYLOAD.IS_LOCKED);
            // const FAILED_LOGIN_ATTEMPTS =  this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET("FAILED_LOGIN_ATTEMPTS",ENCODED_PAYLOAD.FAILED_LOGIN_ATTEMPTS);
            // this.SET_USER_NAME_LOCAL_STORAGE(response.respData.userName);
            // this.SET_EMAIl_LOCAL_STORAGE(response.respData.email);
            // this.SET_ROLE_ID_LOCAL_STORAGE(response.respData.role);
            // this.SET_IS_LOCKED_LOCAL_STORAGE(response.respData.isLocked);
            // this.SET_FAILED_LOGIN_ATTEMPTS_LOCAL_STORAGE(response.respData.failedLoginAttempts);
            this.SET_IN_STORAGE("LOCAL",STORAGE_KEYS.TOKEN,response.respData.token)
            this.SET_IN_STORAGE("LOCAL",STORAGE_KEYS.USER_NAME,response.respData.userName);
            this.SET_IN_STORAGE("LOCAL",STORAGE_KEYS.EMAIL,response.respData.email);
            this.SET_IN_STORAGE("LOCAL",STORAGE_KEYS.ROLE_ID,response.respData.role)
            this.SET_IN_STORAGE("LOCAL",STORAGE_KEYS.IS_LOCKED,response.respData.isLocked);
            this.SET_IN_STORAGE("LOCAL",STORAGE_KEYS.FAILED_LOGIN_ATTEMPTS,response.respData.failedLoginAttempts)
            this.SET_IN_STORAGE("LOCAL",STORAGE_KEYS.CAN_VIEW,response.respData.canView)
            this.SET_IN_STORAGE("LOCAL",STORAGE_KEYS.CAN_ADD,response.respData.canAdd)
            this.SET_IN_STORAGE("LOCAL",STORAGE_KEYS.CAN_UPDATE,response.respData.canUpdate)
            this.SET_IN_STORAGE("LOCAL",STORAGE_KEYS.CAN_DELETE,response.respData.canDelete)


          } else {
            // const ENCODED_PAYLOAD =this.decodeJwt(response.respData.token); // From your earlier JWT decode method
            // this.SET_TOEN_SESSION_STORAGE(response.respData.token);
            // const USER_NAME =  this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_SET("USER_NAME",ENCODED_PAYLOAD.USER_NAME);
            // const ROLE_ID = this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_SET("ROLE_ID",ENCODED_PAYLOAD.ROLE_ID);
            // this.SET_USER_NAME_SESSION_STORAGE(response.respData.userName);
            // this.SET_ROLE_ID_SESSION_STORAGE(response.respData.role);
            // this.SET_IS_LOCKED_SESSION_STORAGE(response.respData.isLocked);
            // this.SET_FAILED_LOGIN_ATTEMPTS_SESSION_STORAGE(response.respData.failedLoginAttempts);
            this.SET_IN_STORAGE("SESSION",STORAGE_KEYS.TOKEN,response.respData.token)
            this.SET_IN_STORAGE("SESSION",STORAGE_KEYS.USER_NAME,response.respData.userName);
            this.SET_IN_STORAGE("SESSION",STORAGE_KEYS.EMAIL,response.respData.email);
            this.SET_IN_STORAGE("SESSION",STORAGE_KEYS.ROLE_ID,response.respData.role)
            this.SET_IN_STORAGE("SESSION",STORAGE_KEYS.IS_LOCKED,response.respData.isLocked);
            this.SET_IN_STORAGE("SESSION",STORAGE_KEYS.FAILED_LOGIN_ATTEMPTS,response.respData.failedLoginAttempts);
            this.SET_IN_STORAGE("SESSION",STORAGE_KEYS.CAN_VIEW,response.respData.canView)
            this.SET_IN_STORAGE("SESSION",STORAGE_KEYS.CAN_ADD,response.respData.canAdd)
            this.SET_IN_STORAGE("SESSION",STORAGE_KEYS.CAN_UPDATE,response.respData.canUpdate)
            this.SET_IN_STORAGE("SESSION",STORAGE_KEYS.CAN_DELETE,response.respData.canDelete)
          }
          
          
          // localStorage.setItem(this.TOKEN_KEY, response.respData.token.token);
          // localStorage.setItem("username",response.respData.token.userName);
          // localStorage.setItem("roleid", response.respData.token.role); // or whatever key it is
          // console.log("<-----Set Item----->",response.respData)
        })
      );
  }

  REDIRECT_BASED_ON_ROLE(): void {
    const ROLE_ID = this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_GET(STORAGE_KEYS.ROLE_ID) ||
                   this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_GET(STORAGE_KEYS.ROLE_ID);
    // const USER_ROLE_ID = this.DECRYPT(ROLE_ID ?? '')
    const USER_ROLE_ID = ROLE_ID ?? ''
    const ADMIN_ROLES = ['2', '3', '4', '5'];
    if (ADMIN_ROLES.includes(USER_ROLE_ID)) {
      this.ROUTER.navigate(['/admin/add-institute']);
    } else {
      this.ROUTER.navigate(['/user/user-profile']);
    }
  }
  // decodeJwt(token: string): any {
  //   try {
  //     const PAYLOAD = token.split('.')[1]; // Get the payload part of the JWT
  //     const BASE_64 = PAYLOAD.replace(/-/g, '+').replace(/_/g, '/');
  //     const JSON_PAYLOAD = decodeURIComponent(
  //       atob(BASE_64)
  //         .split('')
  //         .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
  //         .join('')
  //     );
  //     return JSON.parse(JSON_PAYLOAD);
  //   } catch (e) {
  //     console.error('Failed to decode JWT', e);
  //     return null;
  //   }
  // }
  
  // SET_TOKEN_LOCAL_STORAGE(TOKEN: string): void {
  //   // localStorage.setItem(this.TOKEN_KEY, token);
  //   this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET(this.TOKEN_KEY, TOKEN)
  // }
  // setSessionTokenInSession(token: string) {
  //   this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_SET(this.TOKEN_KEY, token);
  // }
  
  // SET_TOEN_SESSION_STORAGE(TOKEN: string):void{
  //   this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_SET(this.TOKEN_KEY, TOKEN)
  // }
  GET_TOKEN(): string | null {
    if (typeof window !== 'undefined') {
      // First check sessionStorage (temporary login)
      const SESSION_TOKEN = this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_GET(STORAGE_KEYS.TOKEN);
      if (SESSION_TOKEN) return SESSION_TOKEN;
  
      // Fallback to localStorage (Remember Me)
      return this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_GET(STORAGE_KEYS.TOKEN);
    }
    return null;
  }
  
  REMOVE_TOKEN(): void {
    if (typeof window !== 'undefined') {
      this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_REMOVE();
      this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_REMOVE();
    }
  }
  
  // Inside AuthService
IS_TOKEN_EXPIRED(TOKEN: string): boolean {
  try {
    const PAYLOAD = JSON.parse(atob(TOKEN.split('.')[1]));
    const EXPIRATION = PAYLOAD.exp;
    const NOW = Math.floor(Date.now() / 1000);
    return EXPIRATION < NOW;
  } catch (error) {
    return true;
  }
}

 // set values in local storage
//  SET_EMAIl_LOCAL_STORAGE(EMAIL:string){
//   this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET(`${this.EMAIL}`,EMAIL);
// }
// SET_USER_NAME_LOCAL_STORAGE(USER_NAME:string){
//   this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET(`${this.USER_NAME}`,USER_NAME)
// }
// SET_ROLE_ID_LOCAL_STORAGE(ROLE_ID:string){
//   this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET(`${this.ROLE_ID}`,ROLE_ID);
// }

// SET_IS_LOCKED_LOCAL_STORAGE(IS_LOCKED:string){
//   this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET(`${this.IS_LOCKED}`,IS_LOCKED);
// }
// SET_FAILED_LOGIN_ATTEMPTS_LOCAL_STORAGE(FAILED_LOGIN_ATTEMPTS_LOCAL_STORAGE:string){
//   this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET(`${this.FAILED_LOGIN_ATTEMPTS}`,FAILED_LOGIN_ATTEMPTS_LOCAL_STORAGE);
// }
// // set values in session storage
// SET_EMAIl_SESSION_STORAGE(EMAIL:string){
//   this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_SET(`${this.EMAIL}`,EMAIL);
// }
// SET_USER_NAME_SESSION_STORAGE(USER_NAME:string){
//   this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_SET(`${this.USER_NAME}`,USER_NAME);
// }
// SET_ROLE_ID_SESSION_STORAGE(ROLE_ID:string){
//   this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_SET(`${this.ROLE_ID}`,ROLE_ID);
// }

// SET_IS_LOCKED_SESSION_STORAGE(IS_LOCKED:string){
//   this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_SET(`${this.IS_LOCKED}`,IS_LOCKED);

// }
// SET_FAILED_LOGIN_ATTEMPTS_SESSION_STORAGE(FAILED_LOGIN_ATTEMPTS:string){
//   this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_SET(`${this.FAILED_LOGIN_ATTEMPTS}`,FAILED_LOGIN_ATTEMPTS);
// }

SET_IN_STORAGE(TYPE: 'LOCAL' | 'SESSION', KEY: string, VALUE: string): void {
  if (TYPE === 'LOCAL') {
    this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_SET(KEY, VALUE);
  } else {
    this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_SET(KEY, VALUE);
  }
}

}

