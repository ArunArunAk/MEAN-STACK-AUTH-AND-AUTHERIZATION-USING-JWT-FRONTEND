import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginprocessService {

  private apiUrl = 'http://localhost:4500/users/login';
  private apiUrl2 = 'http://localhost:4500/users/register';


  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl2, data);
  }}
