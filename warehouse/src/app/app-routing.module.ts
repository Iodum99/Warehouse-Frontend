import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { UserComponent } from './component/user/user.component';
import { AssetsComponent } from './component/assets/assets.component';
import { AssetDetailsComponent } from './component/asset-details/asset-details.component';
import { VerificationComponent } from './component/verification/verification.component';
import { AddAssetComponent } from './component/add-asset/add-asset.component';
import { EditAssetComponent } from './component/edit-asset/edit-asset.component';
import { UsersComponent } from './component/users/users.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { AdminUserTableComponent } from './component/admin-user-table/admin-user-table.component';
import { authGuard } from './authentication/logged-in.guard';
import { NoAccessPageComponent } from './component/no-access-page/no-access-page.component';
import { hasRoleGuard } from './authentication/has-role.guard';

const routes: Routes = [
  {
    path: "",
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
  },
  {
    path: "verification/token/:id",
    component: VerificationComponent
  },
  {
    path: "user/:id/asset/add",
    component: AddAssetComponent,
    canActivate: [authGuard]
  },
  {
    path: "asset/:id/edit",
    component: EditAssetComponent,
    canActivate: [authGuard]
  },
  {
    path: "users/all",
    component: UsersComponent
  },
  {
    path: "user/:id/edit",
    component: EditProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: "admin/users",
    component: AdminUserTableComponent,
    canActivate: [authGuard, hasRoleGuard],
    data: {role: 'ADMIN'}
  },
  {
    path: "access/forbidden",
    component: NoAccessPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
