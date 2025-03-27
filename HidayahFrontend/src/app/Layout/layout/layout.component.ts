import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../Services/search.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  searchQuery: string = ''; 
  userName:any;
  constructor(private router:Router,private searchService: SearchService){}
  ngOnInit(): void {
    this.userName=localStorage.getItem("user_name")
  }
  navigateToHolyQuran(){
    this.router.navigate(['holyQuran'],{ queryParams: { ref: 'ksdjfihuw&%9348@#$%&^9sj@f93449twssgsd' }})
  }
  onSearch() {
    this.searchService.search(this.searchQuery);
  }
  navigateToLogin(){
    this.router.navigate(['/signin'])
    localStorage.clear()
  }
}
