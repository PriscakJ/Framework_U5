import { Component } from '@angular/core';
import {FormControl, Validators, NgForm, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  email_first = 'hello';
  password1 = '';
  password2 = '';

  password_comparison = new FormControl('', Validators.pattern('psd'));
  hide = true;

  onSubmit(form: NgForm){
    console.log(form.value);

  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
/*     if (this.password_comparison.hasError('pattern')){
      return 'doesnt match';
    } */
   if (this.password1 != this.password2){
    return 'Passwords dont match!'
   }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
