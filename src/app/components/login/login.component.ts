import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'authservices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  phone: string | null = null;


  constructor(private formBuilder: FormBuilder,private router: Router ,private authService:AuthService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || null;
      this.loginForm = this.formBuilder.group({
        phone: [{ value: this.phone, disabled: true }, Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]],
      });
    });
    // this.route.queryParams.subscribe(params => {
    //   this.phone = params['phone'] || null;
    //   console.log("phone number",this.phone)
    //   if (this.phone) {
    //     this.loginForm.patchValue({ phone: this.phone });
    //   }
    // });

    // this.loginForm = this.formBuilder.group({
    //   phone: [{ value: this.phone, disabled: true }],
    //   password: ['', [Validators.required, Validators.minLength(4)]],
    // });


  }



  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('login successful:', response.accessToken);
          console.log('login successful:',response);
          console.log('login successful:',response.user.username);

          localStorage.setItem("HungryHub",response.accessToken);
          localStorage.setItem("id",response.user._id);




          alert('login successful!');
          this.loginForm.reset();
          this.router.navigate(['/home'], { queryParams: { userId: response.user._id } });
        },
        error => {
          console.error('login error:', error);
          alert('login failed. Please try again.');
        }
      );
    }else { 
      alert('Please fill in all required fields correctly.');
    }
      console.log(this.loginForm.value);
    } 
  }

