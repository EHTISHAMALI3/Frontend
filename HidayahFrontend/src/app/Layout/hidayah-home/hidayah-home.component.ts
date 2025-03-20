import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../Services/search.service';
const availablePages = [
  { name: 'Practice Board', path: 'practiceBoard' },
  { name: 'Holy Quran', path: '/holyQuran' },
];
@Component({
  selector: 'app-hidayah-home',
  templateUrl: './hidayah-home.component.html',
  styleUrl: './hidayah-home.component.css'
})
export class HidayahHomeComponent implements OnInit{
  searchQuery: string = ''; 
  constructor(private router:Router,private searchService: SearchService){}
  ngOnInit(): void {
  }
  navigateToHolyQuran(){
    this.router.navigate(['holyQuran'],{ queryParams: { ref: 'ksdjfihuw&%9348@#$%&^9sj@f93449twssgsd' }})
  }
  onSearch() {
    this.searchService.search(this.searchQuery);
  }
  
  
}
