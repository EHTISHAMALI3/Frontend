import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../Services/search.service';

@Component({
  selector: 'app-holy-quran',
  templateUrl: './holy-quran.component.html',
  styleUrl: './holy-quran.component.css'
})
export class HolyQuranComponent {
  searchQuery: string = ''; 

  constructor(private router:Router,private searchService: SearchService){}

  navigateToNooraniPrimer(){
    this.router.navigate(['hidayah/nooraniPrimer'],{ queryParams: { ref: 'ksdjfihuwasdasd&%9348@#$%&^9sj@f93d' }})
  }
  navigateToHidayahHome(){
    this.router.navigate(['/hidayah/home'],{ queryParams: { ref: 'ksd&$&^%*afasdaauw&%9348@#$%&^9sj@f93d' }})

  }
  onSearch() {
    this.searchService.search(this.searchQuery);
  }
}
