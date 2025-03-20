import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private router: Router) {}

  letters = [
    { name: 'Mufradat', arabic: '', category: 'general' },
    { name: 'Alif', arabic: 'ا', category: 'letter' },
    { name: 'Ba', arabic: 'ب', category: 'letter' },
    { name: 'Ta', arabic: 'ت', category: 'letter' },
    { name: 'Tha', arabic: 'ث', category: 'letter' },
    { name: 'Jeem', arabic: 'ج', category: 'letter' },
    { name: 'Khaa', arabic: 'خ', category: 'letter' },
    { name: 'Daal', arabic: 'د', category: 'letter' },
  ];

  search(query: string) {
    console.log("Raw searchQuery:", query);
  
    const trimmedQuery = query.trim();
    console.log("Trimmed searchQuery:", trimmedQuery);
  
    if (!trimmedQuery) {
      alert("Please enter a valid search term.");
      return;
    }
  
    // Match only when the input exactly matches a name or Arabic letter
    const match = this.letters.find(letter =>
      letter.name.toLowerCase() === trimmedQuery.toLowerCase() || letter.arabic === trimmedQuery
    );
  
    console.log("Match Found:", match);
  
    if (match) {
      this.router.navigate(['practiceBoard'], { queryParams: { hidayah: trimmedQuery } });
    } else {
      alert("No matching practice board found!");
    }
  }
  
}
