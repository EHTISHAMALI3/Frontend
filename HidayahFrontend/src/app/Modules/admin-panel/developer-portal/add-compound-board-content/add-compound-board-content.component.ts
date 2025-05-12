import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../Shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericApiService } from '../services/generic-api-service';
import { NotificationsService } from '../../../../Shared/services/notifications.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-compound-board-content',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './add-compound-board-content.component.html',
  styleUrl: './add-compound-board-content.component.css'
})
export class AddCompoundBoardContentComponent implements OnInit {
  LETTERS: any[] = [];
  COMPOUND_FORM: FormGroup;
  IS_EDITING = false;
  SELECTED_ID: number | null = null;

  SVG_CONTENT: string | null = null;
  AUDIO_PREVIEW_URL: string | null = null;
  // Add to component
  CURRENT_PAGE = 1;
  PAGE_SIZE = 10;
  TOTAL_RECORDS = 0;

  constructor(
    private fb: FormBuilder,
    private API: GenericApiService<any>,
    private DOM_SANITIZER: DomSanitizer,
    private NOTIFICATION_SERVICE:NotificationsService
  ) {
    this.COMPOUND_FORM = this.fb.group({
      Name: ['', [Validators.required, Validators.maxLength(20)]],
      Arabic: ['', [Validators.required, Validators.maxLength(20)]],
      Urdu: ['', [Validators.required, Validators.maxLength(20)]],
      CreatedBy: ['', [Validators.required, Validators.maxLength(100)]],
      SvgFile: [null, Validators.required],  // Ensure file validation is included
      AudioFile: [null, Validators.required], // Ensure file validation is included
    });
    
  }

  ngOnInit(): void {
    this.LOADDATA();
  }

  // Modify loadData
  LOADDATA(): void {
    this.API.GET_PAGINATED('CompoundLetters', this.CURRENT_PAGE, this.PAGE_SIZE).subscribe((response: any) => {
      const baseUrl = 'https://localhost:7077/';
      const resp = response.respData; // Assuming API wraps with mApiResponse
      console.log("<-----Response data-----",resp)
      this.TOTAL_RECORDS = resp.totalRecords;
      this.LETTERS = (resp.items || []).map((letter: any) => ({
        ...letter,
        SVG_PATH: baseUrl + letter.svgPath,
        AUDIO_PATH: baseUrl + letter.audioPath
      }));
    });
  }
  CHNAGEPAGE(PAGE: number): void {
    if (PAGE >= 1 && (PAGE - 1) * this.PAGE_SIZE < this.TOTAL_RECORDS) {
      this.CURRENT_PAGE = PAGE;
      this.LOADDATA();
    }
  }


  ONIMAGEERROR(event: any) {
    event.target.src = 'assets/images/placeholder.svg'; // fallback image
  }

  ONSVGCHANGE(event: any) {
    const FILE = event.target.files[0];
    if (FILE && FILE.type === 'image/svg+xml') {
      this.COMPOUND_FORM.patchValue({ SvgFile: FILE });
  
      const reader = new FileReader();
      reader.onload = () => {
        this.SVG_CONTENT = reader.result as string; // Optional for preview
        console.log("<------Preview----", reader.result as string);
      };
      reader.readAsText(FILE);
    } else {
      this.NOTIFICATION_SERVICE.error('Invalid SVG file');
    }
  }
  
  ONAUDIOCHANGE(event: any) {
    const FILE = event.target.files[0];
    if (FILE && FILE.type.startsWith('audio/')) {
      this.AUDIO_PREVIEW_URL = URL.createObjectURL(FILE);
      this.COMPOUND_FORM.patchValue({ AudioFile: FILE });
    } else {
      this.NOTIFICATION_SERVICE.error('Invalid audio file');
    }
  }
  

  SUBMIT(): void {
    if (this.COMPOUND_FORM.invalid) return this.COMPOUND_FORM.markAllAsTouched();

    const formData = new FormData();
    formData.append('Name', this.COMPOUND_FORM.get('Name')?.value);
    formData.append('Arabic', this.COMPOUND_FORM.get('Arabic')?.value);
    formData.append('Urdu', this.COMPOUND_FORM.get('Urdu')?.value);
    formData.append('CreatedBy', this.COMPOUND_FORM.get('CreatedBy')?.value);

    // Append actual file content for both
    if (this.COMPOUND_FORM.get('SvgFile')?.value instanceof File) {
      formData.append('SvgFile', this.COMPOUND_FORM.get('SvgFile')?.value);
    } else if (this.SVG_CONTENT) {
      const BLOB = new Blob([this.SVG_CONTENT], { type: 'image/svg+xml' });
      formData.append('SvgFile', new File([BLOB], 'file.svg', { type: 'image/svg+xml' }));
    }

    if (this.COMPOUND_FORM.get('AudioFile')?.value instanceof File) {
      formData.append('AudioFile', this.COMPOUND_FORM.get('AudioFile')?.value);
    }

    if (this.IS_EDITING && this.SELECTED_ID) {
      this.API.UPDATE('CompoundLetters', this.SELECTED_ID, formData).subscribe({
        next :(response)=>{
          console.log("<------Response------>",response)
          this.NOTIFICATION_SERVICE.success(response.respMsg);
          this.RESETFORM();
          this.LOADDATA();
        },
        error: (err)=>{
          console.log("<------Error Handling IsEditing---->",err)
        }
      });
    } else {
      this.API.CREATE('CompoundLetters', formData).subscribe({
        next:(response)=>{
          this.NOTIFICATION_SERVICE.success(response.respMsg);
          this.RESETFORM();
          this.LOADDATA();
        },
        error: (err)=>{
          console.log("<-------Create Api Error------>",)
        }
      });
    }
  }


  EDIT(item: any): void {
    this.IS_EDITING = true;
    this.SELECTED_ID = item.id;

    this.COMPOUND_FORM.patchValue({
      Name: item.name,
      Arabic: item.arabic,
      Urdu: item.urdu,
      CreatedBy: item.createdBy,
      SvgFile: item.svgFile,
      AudioFile: null // User must re-upload
    });

    this.SVG_CONTENT = item.svgFile;
    this.AUDIO_PREVIEW_URL = item.audioFileUrl;
  }
  PERMANENTDELETE(id: number): void {
    if (confirm('Are you sure you want to permanently delete this letter?')) {
      this.API.PERMANENT_DELETE('CompoundLetters/permanent', id).subscribe({
        next: (response) => {
          this.NOTIFICATION_SERVICE.success(response.respMsg);
          this.LOADDATA();
        },
        error: (err) => {
          // this.NO.error('Failed to delete letter');
        }
      });
    }
  }
  DELETE(id: number): void {
    if (confirm('Are you sure you want to permanently delete this letter?')) {
      this.API.DELETE('CompoundLetters', id).subscribe({
        next: (response) => {
          this.NOTIFICATION_SERVICE.success(response.respMsg);
          this.LOADDATA();
        },
        error: () => {
          // this.NO.error('Failed to delete letter');
        }
      });
    }
  }
  TOGGLESTATUS(ID: number){

    this.API.DELETE('CompoundLetters', ID).subscribe({
      next: (response) => {
        this.NOTIFICATION_SERVICE.success(response.respMsg);
        // this.toastr.success(`Status updated to ${updatedLetter.status ? 'Active' : 'Inactive'}`);
        this.LOADDATA();
      },
      error: (err) => {
        // this.toastr.error('Failed to update status');
      }
    });
  }
  RESETFORM(): void {
    this.COMPOUND_FORM.reset();
    this.IS_EDITING = false;
    this.SELECTED_ID = null;
    this.SVG_CONTENT = null;
    this.AUDIO_PREVIEW_URL = null;
  }

  get F() {
    return this.COMPOUND_FORM.controls;
  }
}