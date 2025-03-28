import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ALPHA_BETS, COMPLETED_SLIDES } from '../SHARED';
import { CarouselComponent, SlidesOutputData } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-practice-board',
  templateUrl: './practice-board.component.html',
  styleUrl: './practice-board.component.css'
})
export class PracticeBoardComponent implements OnInit,AfterViewInit{
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: CarouselComponent;

  customOptions:any;
  widgets =ALPHA_BETS;
  completedSlides=COMPLETED_SLIDES
  svg!:SafeHtml;
  svgIcons: SafeHtml[] = [];
  defaultPracticeBoardSvg:boolean=true
  otherPracticeBoardSvg:boolean=false;
  selectedSlide = ALPHA_BETS[0]; // Default selection
  slides = [1,2,3,4,5,6,7,8,9,10];
  activeSlides!: SlidesOutputData;


    constructor(private router:Router,private sanitizer: DomSanitizer){}
    ngOnInit(): void {
      this.svgIcons = ALPHA_BETS.map(svg => this.sanitizer.bypassSecurityTrustHtml(svg.svg));
      this.customOptions  = {
        loop: false, // Stops looping (prevents wrap-around)
        margin: 10,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        rtl: true, // Moves only right to left
        mouseDrag: true, // Disables dragging
        touchDrag: true, // Disables swiping
        pullDrag: true, // Prevents pulling slides back
        responsive: {
          0: { items: 2 },
          600: { items: 4 },
          1000: { items: 8 }
        }
      };
            // Reset letters to initial state
            this.completedSlides = this.completedSlides.map((_, index) => index === 0);
  
            // Reset selected slide
            this.selectedSlide = ALPHA_BETS[0];
    }
    ngAfterViewInit(): void {
      this.practiceAgain()
    }
    navigateToHolyQuran(){
      this.router.navigate(['hidayah/holyQuran'],{ queryParams: { ref: 'ksdjfihuwasdasd&%9348@#$%&^9sj@f93d' }})
    }
    navigateToHidayahHome(){
      this.router.navigate(['hidayah/home'],{ queryParams: { ref: 'ksd&$&^%*afasdaauw&%9348@#$%&^9sj@f93d' }})

    }
   
  toggleClass(index: number) {
    if (index === 0 || this.completedSlides[index - 1]) {
      this.completedSlides[index] = true;
    }
    this.checkCompletionStatus(); // Check if all are green

  }
  getSlideClass(index: number): string {
    if (index === 0) {
      return "green-class"; 
    }
    if (this.completedSlides[index - 1]) {
      // console.log("<-------slide index----->",this.completedSlides[index])
      return this.completedSlides[index] ? "green-class" : "red-class";
    }
    return "disabled-class";
  }
    sanitizedSvg: SafeHtml | null = null;

  selectSlide(slide: any) {
// console.log("<-----Current slide----->",slide) 
if(slide.name=="Alif"){
  this.defaultPracticeBoardSvg=true;
  this.otherPracticeBoardSvg=false;
  this.selectedSlide = slide;
  return
}
if (slide.name === "Bari Ya") {
  this.selectedSlide = slide; // Ensure `selectedSlide` updates
  return;
}
if (this.selectedSlide === slide) {
  this.defaultPracticeBoardSvg=false
  this.otherPracticeBoardSvg=true;
      return;
      // this.sanitizedSvg = null; // Remove SVG if clicked again
    } else {
      this.owlCarousel.next(); // ✅ Move to next slide

      this.selectedSlide = slide;
      this.defaultPracticeBoardSvg=false
      this.otherPracticeBoardSvg=true;
      this.sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(slide.svg);
    }
  }
  onSpeakerClick(selectedSpeech: string) {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
  
    setTimeout(() => {
      const voices = window.speechSynthesis.getVoices();
      // console.log("Available voices:", voices);
  
      this.speakText(selectedSpeech, "en-GB", voices);
    }, 1000); // Delay to ensure voices load
  }
  
  speakText(text: string, lang: string, voices: SpeechSynthesisVoice[]) {
    if (!voices.length) {
      // console.warn("No voices available, retrying...");
      return;
    }
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
  
    // 🔹 Select an Arabic voice (ar-SA)
    const arabicVoice = voices.find((voice) => voice.lang === "en-GB");
    if (arabicVoice) {
      utterance.voice = arabicVoice;
      // console.log("Using Arabic voice:", arabicVoice.name);
    } else {
      // console.warn("No Arabic voice found! Using default.");
    }
  
    // utterance.onstart = () => console.log("Speech started...");
    // utterance.onend = () => console.log("Speech ended.");
    // utterance.onerror = (event) => console.error("Speech error:", event.error);
  
    window.speechSynthesis.speak(utterance);
  }
  
  attemptCount = 0; // Track number of attempts
  allLettersCompleted = false; // Track if all letters are green
  
  // Method to check if all slides are green
  checkCompletionStatus() {
    this.allLettersCompleted = this.completedSlides.every(status => status);
  }
  // slidesStore!: any[];
  // getPassedData(data: SlidesOutputData) {
  //   this.activeSlides = data;
  //   console.log(this.activeSlides);
  // }
  
  practiceAgain() {
    if (this.allLettersCompleted) {
      console.log("✅ Resetting Practice Board...");

      // Reset slide completion tracking
      this.completedSlides = this.completedSlides.map((_, index) => index === 0);

      // Reset selected slide
      this.selectedSlide = ALPHA_BETS[0];

      // Reset board state
      this.defaultPracticeBoardSvg = true;
      this.otherPracticeBoardSvg = false;

      // Reset completion status
      this.allLettersCompleted = false;

      // ✅ Move to the FIRST SLIDE (Index 0)
      setTimeout(() => {
        if (this.owlCarousel) {
          console.log("🎯 Moving to slide 0...");
          this.owlCarousel.to('owl-slide-0'); // ✅ Move to slide 0 with smooth 500ms transition
        } else {
          console.error("❌ Owl Carousel reference not found!");
        }
      }, 300); // Small delay for smooth transition
    }
  }
  
  
}
