


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { AuthService } from 'authservices/auth.service';
import { Observable } from 'rxjs';

// import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private router: Router,private authservices:AuthService){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      console.log('CanActivate called');
    if ( this.authservices.isloggedinmethod()){

      return true
    } else {
       this.router.navigate(['/login']);
       alert("you have no Access")


      return false;
    }
  }
  
} 