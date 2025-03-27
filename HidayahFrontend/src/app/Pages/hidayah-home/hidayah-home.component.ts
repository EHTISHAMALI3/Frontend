import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { SearchService } from '../../Services/search.service';

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
    this.router.navigate(['hidayah/holyQuran'],{ queryParams: { ref: 'ksdjfihuw&%9348@#$%&^9sj@f93449twssgsd' }})
  }
  onSearch() {
    this.searchService.search(this.searchQuery);
  }
  
  
}
