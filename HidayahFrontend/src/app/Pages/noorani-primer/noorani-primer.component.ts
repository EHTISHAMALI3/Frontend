import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../Services/search.service';

@Component({
  selector: 'app-noorani-primer',
  templateUrl: './noorani-primer.component.html',
  styleUrl: './noorani-primer.component.css'
})
export class NooraniPrimerComponent {
  searchQuery: string = ''; 

  constructor(private router:Router,private searchService: SearchService){}
  navigateToPracticeBoard(){
    this.router.navigate(['hidayah/practiceBoard'],{ queryParams: { ref: 'safa4989348sjkfjs&%9348@#$%&^9sj@f93449twssgsd' }})
  }
  navigateToHolyQuran(){
    this.router.navigate(['hidayah/holyQuran'],{ queryParams: { ref: 'ksdjfihuwasdasd&%9348@#$%&^9sj@f93d' }})
  }
  navigateToHidayahHome(){
    this.router.navigate(['hidayah/home'],{ queryParams: { ref: 'ksd&$&^%*afasdaauw&%9348@#$%&^9sj@f93d' }})
  }
  onSearch() {
    this.searchService.search(this.searchQuery);
  }
}