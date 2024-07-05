import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4800/users/login';
  private apiUrl2 = 'http://localhost:4800/users/register';
  private apiUrl3 = 'http://localhost:4800/usersdetails/';
  private apiUrl4 = 'http://localhost:4800/users/reset-password/';
  private apiUrl5 = 'http://localhost:4800/users/send-email';


//Bromag India
  private apiUrl6 = 'http://localhost:7800/api/users/singup';







  constructor(private http: HttpClient) { }

  login(datas: any): Observable<any> {
    console.log("hi arun")

    return this.http.post<any>(this.apiUrl, datas);
  }

  register(data: any): Observable<any> {
    console.log("hi nanba")
    return this.http.post<any>(this.apiUrl2, data);
  }

  registerOfBromag(data: any): Observable<any> {
    console.log("hi Bromag Users")
    return this.http.post<any>(this.apiUrl6, data);
  }

  getUserById(userId: any): Observable<any> {
    return this.http.get<any>(this.apiUrl3 + userId);
  }

  isloggedinmethod(){
    return localStorage.getItem('HungryHub')!=null;
}

resetpasswoed(){
  return localStorage.getItem('HungryHub')!=null;
}

logout(){
  console.log("logout1")
 localStorage.removeItem('HungryHub');
 localStorage.removeItem('id');

}

sendemail(data: any): Observable<any> {
  return this.http.post<any>(this.apiUrl5, {email:data});
}

resetpasswordbyemail(data: any): Observable<any> {
  return this.http.post<any>(this.apiUrl4,data);
}

}
 