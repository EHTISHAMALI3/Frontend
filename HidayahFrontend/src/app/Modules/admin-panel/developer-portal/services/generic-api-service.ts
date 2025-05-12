import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";

@Injectable({
    providedIn:'root'
})
export class GenericApiService<T> {
    private headers = new HttpHeaders({ 'Accept': 'application/json' });
    constructor(private http:HttpClient) { }
  
    GET_ALL(endpoint: string): Observable<T[]> {
      return this.http.get<T[]>(`${environment.BASE_URL}/${endpoint}`, { headers: this.headers });
    }
  
    GETBY_ID(endpoint: string, id: number): Observable<T> {
      return this.http.get<T>(`${environment.BASE_URL}/${endpoint}/${id}`, { headers: this.headers });
    }
  
    CREATE(endpoint: string, data: T | FormData): Observable<any> {
      return this.http.post(`${environment.BASE_URL}/${endpoint}`, data, { headers: this.headers });
    }
  
    UPDATE(endpoint: string, id:number, data: T | FormData): Observable<any> {
      return this.http.put(`${environment.BASE_URL}/${endpoint}/${id}`, data, { headers: this.headers });
    }
  
    DELETE(endpoint: string, id: number): Observable<any> {
      return this.http.delete(`${environment.BASE_URL}/${endpoint}/${id}`, { headers: this.headers });
    }
    PERMANENT_DELETE(endpoint: string, id: number): Observable<any> {
      return this.http.delete(`${environment.BASE_URL}/${endpoint}/${id}`, { headers: this.headers });
    }
    // UPDATE_WITH_FORMDATA(endpoint: string, id: number, formData: FormData) {
    //     return this.http.put(`${environment.base_url}/${endpoint}/${id}`, formData);
    //   }
      
    //   CREATE_WITH_FORMDATA(endpoint: string, formData: FormData) {
    //     return this.http.post(`${environment.base_url}/${endpoint}`, formData);
    //   }
      GET_PAGINATED(endpoint: string, pageNumber: number, pageSize: number): Observable<any> {
        return this.http.get(`${environment.BASE_URL}/${endpoint}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
          headers: this.headers
        });
      }
      
  }
  