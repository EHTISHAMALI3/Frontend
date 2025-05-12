import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../Models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  
createUsers(user: User): Observable<User> {
return this.http.post<User>(`${environment.BASE_URL}/Users/register`, user);
}
  
}
