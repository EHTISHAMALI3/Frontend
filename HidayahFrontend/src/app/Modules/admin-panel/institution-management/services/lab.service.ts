import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabService {

 constructor(private http:HttpClient) { }
 
   getAllLabs():Observable<any>{
     return this.http.get<any>(`${environment.BASE_URL}/Lab/`)
   }
   getLabById(id:number){
    return this.http.get(`${environment.BASE_URL}/Lab/${id}`)
   }
   saveLab(reqBody:any){
     return this.http.post(`${environment.BASE_URL}/Lab/`,reqBody)
   }
     /**
    * Update Institution
    * @param id Institution ID
    * @param institution Institution object
    */
   updateInstitute(reqBody: any){
    return this.http.put(`${environment.BASE_URL}/Lab/`,reqBody)
   }
  }