import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  isLoading = false;
  loginForm: FormGroup = this.fb.group({
    email: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl("", [
      Validators.required
    ])
  });

  constructor(private fb: FormBuilder, private backendService: BackendService, private router: Router) { }

  ngOnInit(): void { }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.backendService.login(
        this.form["email"].value, 
        this.form["password"].value
      ).subscribe(
        response => {
          this.isLoading = false;
          if ('Token' in response) {
            this.router.navigate(['/landpage']);
          } else {
            console.error('Login failed:', response.error);
            alert(response.error);
          }
        },
        error => {
          this.isLoading = false;
          console.error('Login failed', error);
          alert('An error occurred during login. Please try again.');
        }
      );
    }
  }

  get form(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }
}
