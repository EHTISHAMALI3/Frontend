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
  COMPOUND_LETTERS=[
    {
        "id": 1,
        "name": "Alif(A)",
        "arabic": "اَلِف",
        "urdu": "ا",
        "svgPath": "assets/icons/Alif(A).svg",
        "audioPath": "assets/audio/Alif(A).mp3",
        "createdBy": "Admin",
        "createdAt": "2025-04-24T08:12:21.467",
        "modifiedBy": "Admin",
        "modifiedAt": "2025-05-05T08:35:11.087",
        "deleted": false
    },
    {
        "id": 2,
        "name": "Baa(B)",
        "arabic": "بَا",
        "urdu": "ب",
        "svgPath": "assets/icons/Baa(B).svg",
        "audioPath": "assets/audio/Baa(B).mp3",
        "createdBy": "Admin",
        "createdAt": "2025-04-24T08:17:07.283",
        "modifiedBy": null,
        "modifiedAt": null,
        "deleted": false
    },
    {
        "id": 3,
        "name": "Taa(T)",
        "arabic": "تَا",
        "urdu": "ت",
        "svgPath": "assets/icons/Taa(T).svg",
        "audioPath": "assets/audio/Taa(T).mp3",
        "createdBy": "Admin",
        "createdAt": "2025-04-24T08:18:05.343",
        "modifiedBy": null,
        "modifiedAt": null,
        "deleted": false
    },
    {
        "id": 4,
        "name": "Saa(Th)",
        "arabic": "ثَا",
        "urdu": "ث",
        "svgPath": "assets/icons/Saa(Th).svg",
        "audioPath": "assets/audio/Saa(Th).mp3",
        "createdBy": "Admin",
        "createdAt": "2025-04-24T08:37:09.783",
        "modifiedBy": null,
        "modifiedAt": null,
        "deleted": false
    },
    {
        "id": 5,
        "name": "Jeem(J)",
        "arabic": "جِیْم",
        "urdu": "ج",
        "svgPath": "assets/icons/Jeem(J).svg",
        "audioPath": "assets/audio/Jeem(J).mp3",
        "createdBy": "Admin",
        "createdAt": "2025-04-24T08:38:36.713",
        "modifiedBy": null,
        "modifiedAt": null,
        "deleted": false
    },
    {
        "id": 6,
        "name": "Haa(Ḥ–deepH)",
        "arabic": "حَا",
        "urdu": "ح",
        "svgPath": "assets/icons/Haa(Ḥ–deepH).svg",
        "audioPath": "assets/audio/Haa(Ḥ–deepH).mp3",
        "createdBy": "Admin",
        "createdAt": "2025-04-24T08:41:40.263",
        "modifiedBy": null,
        "modifiedAt": null,
        "deleted": false
    },
    {
        "id": 7,
        "name": "Khaa(Kh)",
        "arabic": "خَا",
        "urdu": "خ",
        "svgPath": "assets/icons/Khaa(Kh).svg",
        "audioPath": "assets/audio/Khaa(Kh).mp3",
        "createdBy": "Admin",
        "createdAt": "2025-04-24T08:42:59.663",
        "modifiedBy": null,
        "modifiedAt": null,
        "deleted": false
    },
    {
        "id": 8,
        "name": "Daal(D)",
        "arabic": "دَال",
        "urdu": "د",
        "svgPath": "assets/icons/Daal(D).svg",
        "audioPath": "assets/audio/Daal(D).mp3",
        "createdBy": "Admin",
        "createdAt": "2025-04-24T08:43:51.843",
        "modifiedBy": null,
        "modifiedAt": null,
        "deleted": false
    },
    {
        "id": 9,
        "name": "Dhaal(Dh)",
        "arabic": "ذَال",
        "urdu": "ذ",
        "svgPath": "assets/icons/Dhaal(Dh).svg",
        "audioPath": "assets/audio/Dhaal(Dh).mp3",
        "createdBy": "Admin",
        "createdAt": "2025-04-24T08:45:12.917",
        "modifiedBy": null,
        "modifiedAt": null,
        "deleted": false
    },
    {
        "id": 10,
        "name": "Raa(R)",
        "arabic": "رَا",
        "urdu": "ر",
        "svgPath": "assets/icons/Raa(R).svg",
        "audioPath": "assets/audio/Raa(R).mp3",
        "createdBy": "Admin",
        "createdAt": "2025-04-24T08:47:37.033",
        "modifiedBy": null,
        "modifiedAt": null,
        "deleted": false
    }
]
    GETNAMEWITHOUTBRACKETS(NAME: string): string {
      return NAME
        .replace(/\s*\(.*?\)\s*/g, '') // remove anything inside brackets
        .replace(/[0-9]/g, '')         // remove all digits
        .trim();
    }
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
    const COMPOUND_MATCH = this.COMPOUND_LETTERS.find(LETTER =>
      LETTER.name.toLowerCase() === TRIMMED_QUERY.toLowerCase() ||
      LETTER.arabic === TRIMMED_QUERY ||
      this.GETNAMEWITHOUTBRACKETS(LETTER.name).toLowerCase() === TRIMMED_QUERY.toLowerCase()
    );
    console.log("Match Found:", MATCH);
  
    if (MATCH) {
      this.ROUTER.navigate(['hidayah/individual-letters'], { queryParams: { hidayah: TRIMMED_QUERY } });
    }
    else if(COMPOUND_MATCH){
      console.log("<------Compound----->",COMPOUND_MATCH)
    this.ROUTER.navigate(['hidayah/compound-letters'], { queryParams: { hidayah: TRIMMED_QUERY } });
    } 
    else {
      alert("No matching practice board found!");
    }
  }
  
}
