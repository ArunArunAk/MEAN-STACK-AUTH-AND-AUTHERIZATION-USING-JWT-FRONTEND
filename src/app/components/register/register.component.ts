import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'authservices/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private authservices:AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    if (this.registerForm.valid) {
       console.log(this.registerForm.value);
       this.authservices.registerOfBromag(this.registerForm.value).subscribe(value=>{
        console.log(value)
       })
   

       this.registerForm.reset()

    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }


  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     console.log(this.registerForm.value)
  //     this.authservices.registerOfBromag(this.registerForm.value).subscribe(
  //       value => {
  //         console.log(value);
  //         this.showSuccess();
  //         this.registerForm.reset();
  //         alert("Registration succesfully...!")
  //         this.router.navigate(['/login'], { queryParams: { phone: this.registerForm.value.phone } });
  //       },
  //       error => {
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     this.markFormGroupTouched(this.registerForm);
  //   }
  // }

  showSuccess() {
    this.toastr.success('singup Succefully!', 'enter Otp !');
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
