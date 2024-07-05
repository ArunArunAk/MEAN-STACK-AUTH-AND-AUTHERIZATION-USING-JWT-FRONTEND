import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'authservices/auth.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  updatePasswordForm!: FormGroup;
  usertoken:any;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private authservices:AuthService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.usertoken = params['Token'];
      console.log("usertoken",this.usertoken)
    });

    this.updatePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      token:null
    }, {
      validator: this.passwordMatchValidator
    });

    
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
  
    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    this.updatePasswordForm.value.token=this.usertoken;
    if (this.updatePasswordForm.valid) {
      console.log(this.updatePasswordForm.value)
      this.authservices.resetpasswordbyemail(this.updatePasswordForm.value).subscribe(val=>{
        console.log('Password reset successfully:', val);
        alert("successfully password reset")
      },
      (error) => {
        console.error('Failed to reset password:', error);
        alert('Failed to reset password. Please try again later.');
      })
      console.log('Form submitted successfully!');
    } else {
      console.log('Form is invalid!');
      alert("both password is not match")
    }
  }
}
