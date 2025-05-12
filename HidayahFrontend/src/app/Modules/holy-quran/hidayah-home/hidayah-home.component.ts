import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../../../Shared/search.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hidayah-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './hidayah-home.component.html',
  styleUrl: './hidayah-home.component.css'
})
export class HidayahHomeComponent implements OnInit{
  searchQuery: string = ''; 
  snitizedSvg:any;
  pages: any[] = [];

  constructor
  (
    private router:Router,
    private searchService: SearchService,
    // private hidayahService: HidayahService,
     private sanitizer: DomSanitizer
    )
    {}
  ngOnInit() {
    // this.hidayahService.getPagesWithCards().subscribe(response => {
    //   if (response.respCode === 200) {
    //     this.pages = response.respData.map((page: any) => {
    //       return {
    //         ...page,
    //         cards: page.cards.map((card: any) => ({
    //           ...card,
    //           sanitizedSvg: this.sanitizer.bypassSecurityTrustHtml(card.icon) // Sanitize SVG
    //         }))
    //       };
    //     });
    //   }
    // });
  }
  navigateTo(route: string) {
    window.location.href = route; // You can also use Angular Router
  }
  navigateToHolyQuran(){
    this.router.navigate(['hidayah/holyQuran'],{ queryParams: { ref: 'ksdjfihuw&%9348@#$%&^9sj@f93449twssgsd' }})
  }
  onSearch() {
    this.searchService.SEARCH(this.searchQuery);
  }
  
  
}
