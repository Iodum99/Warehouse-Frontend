import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { UserComponent } from './component/user/user.component';
import { AssetsComponent } from './component/assets/assets.component';
import { AssetDetailsComponent } from './component/asset-details/asset-details.component';

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
    component: UserComponent
  },
  {
    path: ":type",
    component: AssetsComponent
  },
  {
    path: "asset/:id",
    component: AssetDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
