import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient) { }

  getAllBranches():Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/Branch`)
  }
  getInstitutes():Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/Institution`)
  }
  saveBranch(reqBody:any){
    return this.http.post(`${environment.BASE_URL}/Branch`,reqBody)
  }
  getBranchById(id:number){
    return this.http.get(`${environment.BASE_URL}/Branch/${id}`)
  }
  updateBranch(reqBody:any){
    return this.http.put(`${environment.BASE_URL}/Barnch`,reqBody)
  }
}
