/* import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password1: string = '';
  password2: string= '';
  address: string= '';
  city: string= '';
  state: string= '';
  postalCode: string= '';

  password_comparison = new FormControl('', Validators.pattern('psd'));



  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

   if (this.password1 != this.password2){
    return 'Passwords donts match!'
   }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(form: any) {
    if (form.valid && this.password1 === this.password2) {
      console.log('Form Submitted!', form.value);
    } else {
      console.log('Passwords do not match or form is invalid');
    }
  }
} */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private http: HttpClient){}
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  hide = true;

  // Create the form group with controls
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
    address: new FormControl('Getreidemarkt 1'),
    city: new FormControl(''),
    state: new FormControl(''),
    postalCode: new FormControl('94043', [Validators.required, Validators.maxLength(5)])
  });

  // Function to compare passwords
  get passwordsMatch(): boolean {
    return this.signupForm.get('password1')?.value === this.signupForm.get('password2')?.value;
  }

  // Function to return appropriate error messages
  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);

    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    
    if (controlName === 'email' && control?.hasError('email')) {
      return 'Not a valid email';
    }

    if (controlName === 'postalCode' && control?.hasError('maxlength')) {
      return 'Postal code cannot be more than 5 characters';
    }

    return '';
  }

  onSubmit(form: NgForm) {
    if (this.signupForm.valid && this.passwordsMatch) {
      console.log('Form Submitted!', this.signupForm.value);
      this.http.post<{ message: string}>('http://localhost:3000/login', form.value, this.httpOptions)
    } else {
      console.log('Passwords do not match or form is invalid');
    }
  }
}
