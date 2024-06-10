import { Component } from '@angular/core';
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

  onSubmit(form: any) {
    if (form.valid && this.password1 === this.password2) {
      console.log('Form Submitted!', form.value);
    } else {
      console.log('Passwords do not match or form is invalid');
    }
  }
}