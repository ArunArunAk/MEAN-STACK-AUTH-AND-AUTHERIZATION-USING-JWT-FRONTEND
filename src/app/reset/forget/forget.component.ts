import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'authservices/auth.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private authservices:AuthService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
    
      this.authservices.sendemail(this.forgotPasswordForm.value.email).subscribe({
        next: (val) => {
          // Handle successful response
          alert("email sent successfully");
          this.forgotPasswordForm.reset();

        },
        error: (error) => {
          // Handle error
          console.error('Failed to send email:', error);
          alert("Failed to send the message. Please try again later.");
        }
      });
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }
}
