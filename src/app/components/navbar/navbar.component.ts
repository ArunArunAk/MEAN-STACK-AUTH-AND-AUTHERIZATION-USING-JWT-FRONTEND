import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'authservices/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  shownavbar:any;
  userData: any[] = []; // Array to store user data
  usernamer:any;

  constructor(private authservices:AuthService,private router: Router){}
  
  ngOnInit(): void {
    const id = localStorage.getItem('id');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const excludedRoutes = ['/login', '/register','/','/forgot','/reset'];
        this.shownavbar = !excludedRoutes.includes(event.url);
  
      } 
    });
  
    this.authservices.getUserById(id).subscribe(
      (data: any) => {
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          this.userData = [data.user]; 
          this.usernamer = this.userData[0].username;          console.log(this.userData)
        } else {
          console.error('Invalid data format:', data);
        }
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );

  }

  logout(){
    this.authservices.logout()
  }

 


}


