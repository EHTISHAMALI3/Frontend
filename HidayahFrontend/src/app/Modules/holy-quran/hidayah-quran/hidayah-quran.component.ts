import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../../Shared/search.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hidayah-quran',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './hidayah-quran.component.html',
  styleUrl: './hidayah-quran.component.css'
})
export class HidayahQuranComponent {
  searchQuery: string = ''; 

  constructor(private router:Router,private searchService: SearchService){}

  navigateToNooraniPrimer(){
    this.router.navigate(['hidayah/nooraniPrimer'],{ queryParams: { ref: 'ksdjfihuwasdasd&%9348@#$%&^9sj@f93d' }})
  }
  navigateToHidayahHome(){
    this.router.navigate(['/hidayah/home'],{ queryParams: { ref: 'ksd&$&^%*afasdaauw&%9348@#$%&^9sj@f93d' }})

  }
  onSearch() {
    this.searchService.SEARCH(this.searchQuery);
  }
}
