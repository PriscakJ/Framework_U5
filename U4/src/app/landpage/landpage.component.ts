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
  highscores: any[] = [];
  
  ngOnInit(): void {
    this.loadHighscores();
  }
  loadHighscores(): void {
    this.backendService.getHighscores().subscribe(data => {
      this.highscores = data;
    });
  }
constructor(
  private backendService: BackendService,
  private fb: FormBuilder,
  private router: Router

){
  this.scoreForm = this.fb.group({
    score: ['', [Validators.required, Validators.min(0), Validators.pattern('[0-9]*')]]
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
logout(): void {
  // Implement logout functionality
  // E.g., this.authService.logout();
  this.router.navigate(['/login']);
}

displayList(): void {
  // Implement display list functionality
  // E.g., this.router.navigate(['/list']);
}
}
