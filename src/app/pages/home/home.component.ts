import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'authservices/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId:any;
  userData: any[] = []; // Array to store user data

  constructor(private route: ActivatedRoute,private authservice:AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      console.log("idididi",this.userId)
    });

    this.authservice.getUserById(this.userId).subscribe(
      (data: any) => {
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          this.userData = [data.user]; // Wrap the user object in an array
          console.log(this.userData)
        } else {
          console.error('Invalid data format:', data);
        }
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );

  }
}
