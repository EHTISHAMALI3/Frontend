import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http:HttpClient) { }

  getAllInstitutes():Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/Institution/`)
  }
  getAllInstituteTypes():Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/InstitutionType`)
  }
  getAllCity():Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/getCity`)
  }
  getAllCountry():Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/getCountry`)
  }
  saveInstitute(reqBody:any){
    return this.http.post(`${environment.BASE_URL}/Institution/`,reqBody)
  }
    /**
   * Update Institution
   * @param id Institution ID
   * @param institution Institution object
   */
  updateInstitute(id: number, institution: any){
   return this.http.put(`${environment.BASE_URL}/Institution/${id}`,institution)
  }

}
