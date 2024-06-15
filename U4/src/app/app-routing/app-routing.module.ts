import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LandpageComponent } from '../landpage/landpage.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'landpage', component: LandpageComponent}
  //{ path: 'signup', component: SignupComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
