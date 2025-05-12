import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../../Shared/search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hidayah-noorani-primer',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './hidayah-noorani-primer.component.html',
  styleUrl: './hidayah-noorani-primer.component.css'
})
export class HidayahNooraniPrimerComponent {
  searchQuery: string = ''; 

  constructor(private router:Router,private searchService: SearchService){}
  navigateToIndividualLettersBoard(){
    this.router.navigate(['hidayah/individual-letters'],{ queryParams: { ref: 'safa4989348sjkfjs&%9348@#$%&^9sj@f93449twssgsd' }})
  }
  navigateToCompoundLettersBoard(){
    this.router.navigate(['hidayah/compound-letters'],{ queryParams: { ref: 'safa4989348sjkfjs&%9348@#$%&^9sj@f93449twssgsd' }})
  }
  navigateToHolyQuran(){
    this.router.navigate(['hidayah/holyQuran'],{ queryParams: { ref: 'ksdjfihuwasdasd&%9348@#$%&^9sj@f93d' }})
  }
  navigateToHidayahHome(){
    this.router.navigate(['hidayah/home'],{ queryParams: { ref: 'ksd&$&^%*afasdaauw&%9348@#$%&^9sj@f93d' }})
  }
  onSearch() {
    this.searchService.SEARCH(this.searchQuery);
  }
  userType: string = 'Admin'; // or 'SuperAdmin' or 'Student', etc.
  
  get isAdminOrSuperAdmin(): boolean {
    return this.userType === 'Admin' || this.userType === 'SuperAdmin';
  }
}