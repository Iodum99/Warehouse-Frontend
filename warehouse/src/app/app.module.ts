import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { HeaderComponent } from './component/header/header.component';
import { UserComponent } from './component/user/user.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { AssetsListComponent } from './component/assets-list/assets-list.component';
import { AssetsComponent } from './component/assets/assets.component';
import { AssetDetailsComponent } from './component/asset-details/asset-details.component';
import { FavoriteAssetsComponent } from './component/favorite-assets/favorite-assets.component';
import { VerificationComponent } from './component/verification/verification.component';
import { AddAssetComponent } from './component/add-asset/add-asset.component';
import { EditAssetComponent } from './component/edit-asset/edit-asset.component';
import { UsersComponent } from './component/users/users.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegistrationComponent,
    LoginComponent,
    HomepageComponent,
    HeaderComponent,
    UserComponent,
    UserProfileComponent,
    AssetsListComponent,
    AssetsComponent,
    AssetDetailsComponent,
    FavoriteAssetsComponent,
    VerificationComponent,
    AddAssetComponent,
    EditAssetComponent,
    UsersComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
