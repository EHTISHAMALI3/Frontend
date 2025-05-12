import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent, CarouselModule} from 'ngx-owl-carousel-o';
import { SharedModule } from '../../../Shared/shared.module';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import RecordRTC from 'recordrtc';
import { ALPHA_BETS, COMPLETED_SLIDES } from '../../../Shared/qaidah-data';
import { NotificationsService } from '../../../Shared/services/notifications.service';
import { TranscriptionServiceService } from '../services/transcription-service.service';
import { GenericApiService } from '../../admin-panel/developer-portal/services/generic-api-service';

@Component({
  selector: 'app-compound-letters',
  standalone: true,
  imports: [CommonModule,CarouselModule,SharedModule],
  templateUrl: './compound-letters.component.html',
  styleUrl: './compound-letters.component.css'
})
export class CompoundLettersComponent implements OnInit{
  @ViewChild('OWL_CAROUSEL', { static: false }) OWL_CAROUSEL!: CarouselComponent;
  
    // slider variables
    CUSTOM_OPTIONS: any;                                // slider setting options
    SLIDER_DATA: any[] = [];                            // store slider data from API response
    COMPLETED_SLIDES = COMPLETED_SLIDES
    // SANITIZED_SVG!: SafeHtml; // Add this line
    SVG_ICONS: SafeHtml[] = [];
    SELECTED_SLIDE: any;                                // Default selection (from API)
    CURRENT_ROUTE: string = '';
    queryParams: any = {};
    //practice module variables
    RECORDER: any;
    IS_RECORDING = false;
    AUDIO_BLOB: Blob | null = null;
    AUDIO_URL: string | null = null;
    RECORDING_TIME_OUT: any;
    ATTEMPT_COUNT = 0;                                   // Track number of attempts
    ALL_LETTERS_COMPLETED = false;                      // Track if all letters are green
    ASSESMENT_STARTED: boolean = false;
    private CURRENT_AUDIO: HTMLAudioElement | null = null;
    IS_SPEAKING = false;
    // USER
    IS_ASSESMENT_STARTED = false;
    IS_ASSESMENTCOMPLETED = false;
    ASSESMENT_STATS = {
      TOTAL_ATTEMPTS: 0,
      CORRECT_ATTEMPTS: 0,
      IN_CORRECT_ATTEMPTS: 0
    };
    TIP_LIST: { TEXT: string, IS_CORRECT: boolean }[] = [];
  
    constructor(
      private ROUTER: Router,
      private SANITIZER: DomSanitizer,
      private ACTIVATED_ROUTE: ActivatedRoute,
      private NG_ZONE: NgZone,
      private TOASTR: ToastrService,
      private NOTIFICATION_SERVICE: NotificationsService,
      private TRANSCRIPTION_SERVICE: TranscriptionServiceService,
      private GENERIC_SERVICE: GenericApiService<any>
      
    ) { }
  
    // navigation
    HAVIGATETOHOLYQURAN() {
      this.ROUTER.navigate(['hidayah/holyQuran'], { queryParams: { ref: 'ksdjfihuwasdasd&%9348@#$%&^9sj@f93d' } });
    }
  
    NAVIGATETOHIDAYAHHOME() {
      this.ROUTER.navigate(['hidayah/home'], { queryParams: { ref: 'ksd&$&^%*afasdaauw&%9348@#$%&^9sj@f93d' } });
    }
  
    ngOnInit(): void {
      this.ROUTER.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.CURRENT_ROUTE = event.urlAfterRedirects;
          this.queryParams = this.ACTIVATED_ROUTE.snapshot.queryParams;
        }
      });
  
      // Fetching letters from API response
      this.GETALLLETTERS();
  
      // Initializing carousel options
      this.CUSTOM_OPTIONS = {
        loop: false,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        rtl: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        responsive: {
          0: { items: 2 },
          600: { items: 4 },
          1000: { items: 8 }
        }
      };
    }
  
    /**
   * Fetches all individual letters from the backend API and prepares them for display.
   * 
   * - Appends the base URL to each letter's `svgPath` and `audioPath`.
   * - Sanitizes the SVG paths to safely render HTML content.
   * - Initializes `completedSlides` with only the first slide marked as complete.
   * - Sets the first letter as the default selected slide.
   */
    GETALLLETTERS() {
      this.GENERIC_SERVICE.GET_ALL("CompoundLetters/all").subscribe({
        next: (response:any) => {
          const baseUrl = 'https://localhost:7077/'; // Replace with your actual backend base URL
  
          this.SLIDER_DATA = response.respData.map((LETTER: any) => ({
            ...LETTER,
            SVG_PATH: baseUrl + LETTER.svgPath,       // Append base URL to svgPath
            AUDIO_PATH: baseUrl + LETTER.audioPath    // Append base URL to audioPath
          }));
  
          this.SVG_ICONS = this.SLIDER_DATA.map(svg =>
            this.SANITIZER.bypassSecurityTrustHtml(svg.svgPath)
          );
  
          this.COMPLETED_SLIDES = this.COMPLETED_SLIDES.map((_, index) => index === 0);
          this.SELECTED_SLIDE = this.SLIDER_DATA[0];
          this.TIPLIST();
        },
        error: (err) => {
          console.error('Error fetching letters:', err);
        }
      });
    }
  
    TIPLIST() {
      this.TIP_LIST = [
        { TEXT: this.SELECTED_SLIDE.urdu, IS_CORRECT: true },   // First Tip already green
        { TEXT: this.SELECTED_SLIDE.urdu, IS_CORRECT: false }   // Second Tip red initially
      ];
    }
    
    GETNAMEWITHOUTBRACKETS(NAME: string): string {
      return NAME
        .replace(/\s*\(.*?\)\s*/g, '') // remove anything inside brackets
        .replace(/[0-9]/g, '')         // remove all digits
        .trim();
    }
    
  
    GETBRACKETCONTENT(NAME: string): string {
      const MATCH = NAME.match(/\((.*?)\)/);
      return MATCH ? MATCH[1] : '';
    }
  
    ONSLIDECLICK(INDEX: number, SLIDE: any) {
      if (this.ASSESMENT_STARTED) return; // Prevent manual click if assessment is active
      this.TOGGLECLASS(INDEX);
      this.SELECTSLIDE(SLIDE);
    }
  
    SELECTSLIDE(SLIDE: any) {
      // Check if the slide is "ی" or not, move to next if it's not.
      if (SLIDE.name === "ی") {
        this.SELECTED_SLIDE = SLIDE;
        this.TIPLIST(); // Initialize tips when the slide is selected
        return;
      }
      else {
        this.OWL_CAROUSEL.next(); // Move to next slide
        this.SELECTED_SLIDE = SLIDE;
        // this.SANITIZED_SVG = this.SANITIZER.bypassSecurityTrustHtml(SLIDE.SVG_PATH); // Sanitized SVG content
        this.TIPLIST();  // Initialize tips when the slide is selected
      }
    }
  
    // Returns the CSS class for a slide based on its completion status and previous slide
    GETSLIDECLASS(index: number): string {
      if (index === 0) {
        return "green-class";
      }
      if (this.COMPLETED_SLIDES[index - 1]) {
        return this.COMPLETED_SLIDES[index] ? "green-class" : "red-class";
      }
      return "disabled-class";
    }
  
    /**
   * Marks the current slide as completed if it's the first slide
   * or if the previous slide has already been completed.
   * After marking, it checks whether all slides have been completed.
   * 
   * @param index - Index of the slide to be toggled.
   */
    TOGGLECLASS(index: number) {
      if (index === 0 || this.COMPLETED_SLIDES[index - 1]) {
        this.COMPLETED_SLIDES[index] = true;
      }
      this.CHECKCOMPLETIONSTATUS();
    }
  
    // to check slides status 
    CHECKCOMPLETIONSTATUS() {
      this.ALL_LETTERS_COMPLETED = this.COMPLETED_SLIDES.every(c => c);
      if (this.ALL_LETTERS_COMPLETED) {
        this.ATTEMPT_COUNT++;
      }
      if (this.IS_ASSESMENT_STARTED && this.ALL_LETTERS_COMPLETED) {
        this.ATTEMPT_COUNT++; // ✅ Track how many times user completed
        this.IS_ASSESMENTCOMPLETED = true;
      }
    }
  
    ONSPEAKERCLICK(SELECTED_SLIDE_NAME: string) {
      window.speechSynthesis.cancel();
      if (this.CURRENT_AUDIO) {
        this.CURRENT_AUDIO.pause();
        this.CURRENT_AUDIO.currentTime = 0;
        this.CURRENT_AUDIO = null;
        this.IS_SPEAKING = false;
      }
      const SLIDE = this.SLIDER_DATA.find(slide => slide.name === SELECTED_SLIDE_NAME);
  
      if (!SLIDE || !SLIDE.AUDIO_PATH) {
        this.TOASTR.warning('No audio found for: ' + SELECTED_SLIDE_NAME);
        return;
      }
      const AUDIO = new Audio(SLIDE.AUDIO_PATH);
      this.CURRENT_AUDIO = AUDIO;
      this.IS_SPEAKING = true;
      AUDIO.play().catch(err => {
        this.TOASTR.error('Audio playback failed: ' + err);
        this.IS_SPEAKING = false;
      });
      AUDIO.onended = () => {
        this.CURRENT_AUDIO = null;
        this.IS_SPEAKING = false;
      };
    }
  
    TOGGLERECORDING() {
      if (this.IS_RECORDING) {
        this.STOPRECORDING();
      } else {
        this.STARTRECORDING();
      }
    }
    STARTRECORDING() {
      this.IS_RECORDING = true;
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.RECORDER = new RecordRTC(stream, {
          type: 'audio',
          mimeType: 'audio/webm',
        });
        this.RECORDER.startRecording();
  
        // Auto stop after 3 seconds
        this.RECORDING_TIME_OUT = setTimeout(() => {
          this.IS_RECORDING = false;
          this.STOPRECORDING();
        }, 2000); // 3 seconds
      });
    }
  
    STOPRECORDING() {
      clearTimeout(this.RECORDING_TIME_OUT); // Stop timeout if manually stopped
  
      this.RECORDER.stopRecording(() => {
        this.AUDIO_BLOB = this.RECORDER.getBlob();
        this.IS_RECORDING = false;
  
        if (this.AUDIO_BLOB) {
          this.AUDIO_URL = URL.createObjectURL(this.AUDIO_BLOB);
          this.SENDTOAPI();
        } else {
          console.error('Recording failed: AUDIO_BLOB is null');
        }
      });
    }
  
    PRACTICEAGAIN() {
      this.NG_ZONE.run(() => {
        if (this.ALL_LETTERS_COMPLETED) {
          console.log("✅ Resetting Practice Board...");
  
          // Reset slide completion tracking
          this.COMPLETED_SLIDES = this.COMPLETED_SLIDES.map((_, index) => index === 0);
          // Reset selected slide
          this.SELECTED_SLIDE = this.SLIDER_DATA[0];
  
          // Reset board state
          // this.defaultPracticeBoardSvg = true;
          // this.otherPracticeBoardSvg = false;
  
          // Reset completion status
          this.ALL_LETTERS_COMPLETED = false;
  
          // Move to the FIRST SLIDE (Index 0)
          setTimeout(() => {
            if (this.OWL_CAROUSEL) {
              console.log("🎯 Moving to slide 0...");
              this.OWL_CAROUSEL.to('owl-slide-0');
            } else {
              console.error("❌ Owl Carousel reference not found!");
            }
          }, 300);
        }
      });
    }
  
    STARTASSESMENT() {
      this.NG_ZONE.run(() => {
      this.ASSESMENT_STARTED = true;
      this.IS_ASSESMENT_STARTED = true;
      this.IS_ASSESMENTCOMPLETED = false;
      this.COMPLETED_SLIDES = this.COMPLETED_SLIDES.map((_, index) => index === 0);
      this.ASSESMENT_STATS = { TOTAL_ATTEMPTS: 0, CORRECT_ATTEMPTS: 0, IN_CORRECT_ATTEMPTS: 0 };
      // this.completedSlides = new Array(this.widgets.length).fill(false);
      this.SELECTED_SLIDE = this.SLIDER_DATA[0];
      this.OWL_CAROUSEL.to('owl-slide-0');
      this.TIPLIST(); // Initialize tips when the slide is selected
    });
    }
  
    SENDTOAPI() {
      if (!this.AUDIO_BLOB) return;
  
      const MP3_FILE = new File([this.AUDIO_BLOB], 'recording.mp3', { type: 'audio/webm' });
  
      const READER = new FileReader();
      READER.onload = () => {
        const base64Audio = READER.result as string;
        console.log(base64Audio);
        const FORMDATA = new FormData();
        FORMDATA.append('audio', MP3_FILE);
        FORMDATA.append('ground_truth', this.SELECTED_SLIDE.arabic);
  
        this.ASSESMENT_STATS.TOTAL_ATTEMPTS++;
  
        this.TRANSCRIPTION_SERVICE.transcribeAudio(FORMDATA).subscribe({
          next: (response: any) => {
             if (response.success==1 ) {
                const transcription = (response?.data?.transcription || '').trim();
                const actual = this.REMOVEDIACRITICS(transcription);
                
                const currentIndex = this.SLIDER_DATA.findIndex(a => a === this.SELECTED_SLIDE);
                const expected = this.REMOVEDIACRITICS(this.SELECTED_SLIDE.urdu);
                const expected2 = this.REMOVEDIACRITICS(this.SELECTED_SLIDE.arabic);
              if(actual !== expected && actual !== expected2 ){
                            // Check if the user spoke any other valid alphabet (but out of sequence)
                            const mismatch = this.SLIDER_DATA.find(item =>
                              this.REMOVEDIACRITICS(item.urdu) === actual ||
                              this.REMOVEDIACRITICS(item.arabic) === actual
                            );
                            if (mismatch) {
                              this.NOTIFICATION_SERVICE.error(`Out of order!', You pronounced "${transcription}", but please follow the correct sequence.`)
                              // Swal.fire('❌ Out of order!', `You pronounced "${transcription}", but please follow the correct sequence.`, 'warning');
                            } else {
                              // Swal.fire('❌ Try again!', 'Pronunciation did not match.', 'error');
                              this.NOTIFICATION_SERVICE.error('Try again! Pronunciation did not match.')
                            }
                            return; // 🚫 Do not proceed
              }
              else{
                if (!this.TIP_LIST[1].IS_CORRECT) {  // Only second tip will update
                  this.NG_ZONE.run(()=>{
                    this.TIP_LIST[1].IS_CORRECT = true;
                    this.TIP_LIST = [...this.TIP_LIST]; // 🔁 Triggers update in UI
                  })
  
                  this.ASSESMENT_STATS.CORRECT_ATTEMPTS++;
      
                  // Swal.fire('Excellent!', 'Pronunciation matched successfully!', 'success');
                  // this.NOTIFICATION_SERVICE.success("Pronunciation matched successfully!")
                  const currentIndex = this.SLIDER_DATA.findIndex(a => a === this.SELECTED_SLIDE);
                  this.COMPLETED_SLIDES[currentIndex] = true;
      
                  const nextIndex = currentIndex + 1;
                  if (nextIndex < this.SLIDER_DATA.length) {
                    this.SELECTED_SLIDE = this.SLIDER_DATA[nextIndex];
                    // this.ONSLIDECLICK(currentIndex,this.SELECTED_SLIDE)
                    // this.SELECTSLIDE(this.SELECTED_SLIDE)
                    this.TIPLIST();  // Reset tips for next slide
                    // this.OWL_CAROUSEL.to(`owl-slide-${nextIndex}`);
                  }
      
                  this.CHECKCOMPLETIONSTATUS();
                }
              }
           }
           else{
            this.NOTIFICATION_SERVICE.timedAlert(
              'API did not succeed..',
              'error'
            );
           }
          },
          error: (error) => {
            this.NOTIFICATION_SERVICE.timedAlert(
              `Error: ${error.error.message || 'Something went wrong!'}`,
              'error'
            );
          },
        });
      };
  
      READER.readAsDataURL(MP3_FILE);
    }
  
    // remove Arabic diacritics
    REMOVEDIACRITICS(value: string | undefined | null): string {
      if (!value) return '';
      return value.replace(/[\u064B-\u0652\u0610-\u061A\u06D6-\u06ED]/g, '') // remove diacritics
        .replace(/\s/g, '')                                         // remove spaces
        .toLowerCase();                                            // normalize casing
    }
  
  }
  