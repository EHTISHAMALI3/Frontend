import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../Auth/services/auth.service';
import { BrowserStorageService } from '../../Shared/services/browser-storage.service';
import { STORAGE_KEYS } from '../../Models/storage-keys';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule,FormsModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
 userName:any

 CAN_VIEW:any;
 CAN_ADD:any;
 CAN_UPDATE:any;
 CAN_DELETE:any;

  constructor(
    private ROUTER:Router,
    private AUTH_SERVICE:AuthService,
    private BROWSER_STORAGE_SERVICE:BrowserStorageService
  ){}

  ngOnInit(): void {
    const encryptedUsername =
      this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_GET("USER_NAME") ||
      this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_GET("USER_NAME");
    const ENCRYPTED_CAN_VIEW = 
      this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_GET(STORAGE_KEYS.CAN_VIEW) ||
      this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_GET(STORAGE_KEYS.CAN_VIEW);
    const ENCRYPTED_CAN_ADD = 
      this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_GET(STORAGE_KEYS.CAN_ADD) ||
      this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_GET(STORAGE_KEYS.CAN_ADD);
    const ENCRYPTED_CAN_UPDATE = 
    this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_GET(STORAGE_KEYS.CAN_UPDATE) ||
    this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_GET(STORAGE_KEYS.CAN_UPDATE);
    const ENCRYPTED_CAN_DELETE = 
    this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_GET(STORAGE_KEYS.CAN_DELETE) ||
    this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_GET(STORAGE_KEYS.CAN_DELETE);
    this.userName = encryptedUsername
      ? this.AUTH_SERVICE.DECRYPT(encryptedUsername)
      : '';
      this.CAN_VIEW = ENCRYPTED_CAN_VIEW
      ? this.AUTH_SERVICE.DECRYPT(ENCRYPTED_CAN_VIEW)
      : '';
      this.CAN_ADD = ENCRYPTED_CAN_ADD
      ? this.AUTH_SERVICE.DECRYPT(ENCRYPTED_CAN_ADD)
      : '';
      this.CAN_UPDATE = ENCRYPTED_CAN_UPDATE
      ? this.AUTH_SERVICE.DECRYPT(ENCRYPTED_CAN_UPDATE)
      : '';
      this.CAN_DELETE = ENCRYPTED_CAN_DELETE
      ? this.AUTH_SERVICE.DECRYPT(ENCRYPTED_CAN_DELETE)
      : '';
      console.log("<------------->",this.CAN_DELETE)
    // Check both storages for "roleid"

  }
  navigateToLogin(){    
    this.ROUTER.navigate(['/sign-in'])
    this.AUTH_SERVICE.REMOVE_TOKEN()
  }
  navigateToHome(){
    this.ROUTER.navigate(['/hidayah/home'])
  }
  isInstitutionRoute(): boolean {
    return this.ROUTER.url.startsWith('/admin/add-institute') ||
           this.ROUTER.url.startsWith('/admin/add-branch') ||
           this.ROUTER.url.startsWith('/admin/add-lab') ||
           this.ROUTER.url.startsWith('/admin/browser-list');

  }
  isUserRoute(): boolean{
     return this.ROUTER.url.startsWith('/admin/add-user') ||
           this.ROUTER.url.startsWith('/admin/bulk-users-import') ||
           this.ROUTER.url.startsWith('/admin/access-management') ||
           this.ROUTER.url.startsWith('/admin/users-list');
  }
  isDeveloperRoute():boolean{
    return this.ROUTER.url.startsWith('/admin/add-individual-board-content') ||
    this.ROUTER.url.startsWith('/admin/add-compound-board-content');
  }
}
