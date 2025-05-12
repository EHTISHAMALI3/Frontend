import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  SAFE_LOCAL_STORAGE_GET(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }
  
  SAFE_LOCAL_STORAGE_SET(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }
  
  SAFE_SESSION_STORAGE_SET(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(key, value);
    }
  }
  
  SAFE_SESSION_STORAGE_GET(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(key);
    }
    return null;
  }
  
  SAFE_LOCAL_STORAGE_REMOVE(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
  
  SAFE_SESSION_STORAGE_REMOVE(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
  }
}
