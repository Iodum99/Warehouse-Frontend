import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ProfileComponent } from './component/profile/profile.component';

const routes: Routes = [
  {
    path: "home",
    component: HomepageComponent
  },
  {
    path: "register",
    component: RegistrationComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "user/:id",
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
