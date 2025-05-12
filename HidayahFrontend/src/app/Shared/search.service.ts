import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private ROUTER: Router) {}

  LETTERS = [
    { name: 'Mufradat', arabic: '', category: 'general' },
    { name: 'Alif',  arabic: 'ا', category: 'letter' },
    { name: 'Ba',    arabic: 'ب', category: 'letter' },
    { name: 'Ta',    arabic: 'ت', category: 'letter' },
    { name: 'Tha',   arabic: 'ث', category: 'letter' },
    { name: 'Jeem',  arabic: 'ج', category: 'letter' },
    { name: 'Khaa',  arabic: 'خ', category: 'letter' },
    { name: 'Daal',  arabic: 'د', category: 'letter' },
    { name: "Dhal",  arabic: "ذ", category: 'letter' },
    { name: "Ra",    arabic: "ر", category: 'letter' },
    { name: "Zay",   arabic: "ز", category: 'letter' },
    { name: "Seen",  arabic: "س", category: 'letter' },
    { name: "Sheen", arabic: "ش", category: 'letter' },
    { name: "Sad",   arabic: "ص", category: 'letter' },
    { name: "Dad",   arabic: "ض", category: 'letter' },
    { name: "Taa",   arabic: "ط", category: 'letter' },
    { name: "Zaa",   arabic: "ظ", category: 'letter' },
    { name: "Ain",   arabic: "ع", category: 'letter' },
    { name: "Ghain", arabic: "غ", category: 'letter' },
    { name: "Fa",    arabic: "ف", category: 'letter' },
    { name: "Qaf",   arabic: "ق", category: 'letter' },
    { name: "Kaf",   arabic: "ك", category: 'letter' },
    { name: "Lam",   arabic: "ل", category: 'letter' },
    { name: "Meem",  arabic: "م", category: 'letter' },
    { name: "Noon",  arabic: "ن", category: 'letter' },
    { name: "Ha",    arabic: "ه", category: 'letter' },
    { name: "Waw",   arabic: "و", category: 'letter' },
    { name: "Ya",    arabic: "ي", category: 'letter' },
    { name: "Hamza", arabic: "ء", category: 'letter' }
  ];

  SEARCH(QUERY: string) {
    console.log("Raw searchQuery:", QUERY);
  
    const TRIMMED_QUERY = QUERY.trim();
    console.log("Trimmed searchQuery:", TRIMMED_QUERY);
  
    if (!TRIMMED_QUERY) {
      alert("Please enter a valid search term.");
      return;
    }
  
    // Match only when the input exactly matches a name or Arabic letter
    const MATCH = this.LETTERS.find(LETTER =>
      LETTER.name.toLowerCase() === TRIMMED_QUERY.toLowerCase() || LETTER.arabic === TRIMMED_QUERY
    );
  
    console.log("Match Found:", MATCH);
  
    if (MATCH) {
      this.ROUTER.navigate(['hidayah/individual-letters'], { queryParams: { hidayah: TRIMMED_QUERY } });
    } else {
      alert("No matching practice board found!");
    }
  }
  
}
