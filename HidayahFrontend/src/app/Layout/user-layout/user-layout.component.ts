import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BrowserStorageService } from '../../Shared/services/browser-storage.service';
import { AuthService } from '../../Auth/services/auth.service';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent implements OnInit{
  USER_NAME:any;
  USER_ROLE_ID:any


  constructor(private ROUTER:Router,private BROWSER_STORAGE_SERVICE:BrowserStorageService,private AUTH_SERVICE:AuthService){}

  ngOnInit(): void {
    const encryptedUsername =
    this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_GET("USER_NAME") ||
    this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_GET("USER_NAME");
    // console.log("<-------User Name------>",encryptedUsername)

  const roleId =
    this.BROWSER_STORAGE_SERVICE.SAFE_LOCAL_STORAGE_GET("ROLE_ID") ||
    this.BROWSER_STORAGE_SERVICE.SAFE_SESSION_STORAGE_GET("ROLE_ID");
  
  if (encryptedUsername) {
    this.USER_NAME = this.AUTH_SERVICE.DECRYPT(encryptedUsername);
        console.log("<------encryptedUsername----->",this.USER_NAME)
    this.USER_ROLE_ID = this.AUTH_SERVICE.DECRYPT(roleId ?? '');

    // Optional redirect to 'home' if user landed on 'hidayah'
    if (this.ROUTER.url === '/hidayah' || this.ROUTER.url === '/hidayah/') {
      this.ROUTER.navigate(['/hidayah/home']);
    }
  } else {
    this.ROUTER.navigate(['/sign-in']);
  }
  }
  NAVIGATE_TOHOLY_QURAN(){
    this.ROUTER.navigate(['holyQuran'],{ queryParams: { ref: 'ksdjfihuw&%9348@#$%&^9sj@f93449twssgsd' }})
  }
  NAVIGATE_TO_LOGIN(){    
    this.ROUTER.navigate(['/sign-in'])
    this.AUTH_SERVICE.REMOVE_TOKEN()
  }
  NAVIGATE_TO_HOME(){
    this.ROUTER.navigate(['/hidayah/home'])
  }
}
