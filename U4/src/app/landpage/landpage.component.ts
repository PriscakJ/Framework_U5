import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.css']
})
export class LandpageComponent {
  scoreForm: FormGroup;
  

constructor(
  private backendService: BackendService,
  private fb: FormBuilder,
  private router: Router

){
  this.scoreForm = this.fb.group({
    score: ['', [Validators.required, Validators.min(0)]]
  });
};

get form() {
  return this.scoreForm.controls;
}

updateScore(): void {
  if (this.scoreForm.valid) {
    this.backendService.update(
      this.form["score"]
    );
    
  }
}

}
