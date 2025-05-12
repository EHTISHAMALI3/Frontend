import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranscriptionServiceService {

 
  constructor(private http: HttpClient) { }


  transcribeAudio(formData: FormData) {
    const headers = new HttpHeaders({
      'lang': 'arabic'
    });
  
    return this.http.post<any>(environment.TRANSCRIPTION_API_URL, formData, { headers });
  }
  
}
