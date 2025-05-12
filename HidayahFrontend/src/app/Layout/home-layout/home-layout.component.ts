import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService } from '../../Auth/services/auth.service';
import { SearchService } from '../../Shared/search.service';
import { BrowserStorageService } from '../../Shared/services/browser-storage.service';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,FormsModule,RouterModule],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {
 SEARCH_QUERY: string = ''; 
  USER_NAME:any;
  USER_ROLE_ID:any
  constructor(
    private ROUTER:Router,
    private SEARCH_SERVICE: SearchService,
    private AUTH_SERVICE:AuthService,
    private BROWSER_STORAGE_SERVICE:BrowserStorageService
  ){}
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
  ON_SEARCH() {
    this.SEARCH_SERVICE.SEARCH(this.SEARCH_QUERY);
  }
  NAVIGATE_TO_LOGIN(){    
    this.ROUTER.navigate(['/sign-in'])
    this.AUTH_SERVICE.REMOVE_TOKEN()
  }
}
