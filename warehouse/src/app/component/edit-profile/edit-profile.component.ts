import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { countries } from 'src/app/model/countries-list';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';
import { ComponentCanDeactivate } from 'src/app/guard/pending-changes-guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, ComponentCanDeactivate {

  constructor(
    private userService: UserService,
    public authService: AuthenticationService,
    private router: Router){}
  
    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
      if (this.complete) return true
      else return this.checkIfEdited()
    }

  user?: User
  newAvatar: any
  avatarSource: string = ""
  removedAvatar: boolean = false
  avatarPath: string = ""

  newPassword: string = ""
  originalPassword: string = ""
  confirmNewPassword: string = ""
 
  email?: string
  name: string = ""
  surname: string = ""
  biography: string = ""
  interests: string = ""
  selectedCountry: string = ""

  changedPicture: boolean = false
  complete: boolean = false


  checkIfEdited(): boolean {
    
    if(this.updateProfileForm.dirty 
      || this.biography != this.user?.biography
      || this.interests != this.user.interests
      || this.name != this.user.name
      || this.surname != this.user.surname
      || this.changedPicture) return false

      else return true
  }


  public countries:any = countries


  registrationSuccess?: boolean
  submitted?: boolean

  updateProfileForm = new FormGroup({
    email: new FormControl('', Validators.email),
    newPassword: new FormControl('', Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')),
    confirmNewPassword: new FormControl(''),
    originalPassword: new FormControl('', Validators.required)

  })
  
  ngOnInit(): void {
    this.userService.getUser(this.authService.loggedUser?.id).subscribe({
      next:(loadedUser: User) => 
      {
        this.user = loadedUser
        this.email = loadedUser.email
        this.name = loadedUser.name
        this.surname = loadedUser.surname
        if(loadedUser.country) this.selectedCountry = loadedUser.country
        this.biography = loadedUser.biography
        this.interests = loadedUser.interests  
        this.avatarSource = loadedUser.avatar.split('src\\')[1]
        this.avatarPath = loadedUser.avatar
      },
      error:() => {}
    })
  }

  onImageInput(images: FileList | null): void {
    if (images) {
      this.changedPicture = true
      this.newAvatar = images.item(0)
      
      if(this.newAvatar != null)
      this.avatarSource = URL.createObjectURL(this.newAvatar)
      
    }
  }
  
  update(): void{

    if(this.removedAvatar)
      this.avatarPath = this.user?.avatar.split('assets\\')[0] + 'assets\\\\default_avatar.png'

    console.log(this.avatarPath)  
    this.submitted = true
    if(this.updateProfileForm.valid && this.newPassword == this.confirmNewPassword){
      var user = {
        id: this.user?.id,
        username: this.user?.username,
        email: this.user?.email,
        name: this.name,
        surname: this.surname,
        country: this.selectedCountry,
        biography: this.biography,
        interests: this.interests,
        newPassword: this.newPassword,
        password: this.originalPassword,
        avatar: this.avatarPath
      }
      console.log(user)
      const formData: FormData = new FormData();
      formData.append('user', new Blob([JSON.stringify(user)],{type: "application/json"}))
      formData.append('image',  this.newAvatar)

      this.userService.updateUser(formData).subscribe({
        next:() => 
        { 
          this.complete = true
          window.location.href="http://localhost:4200/user/" + this.authService.loggedUser?.id
        },
        error:(error) => {
          alertify.error(error.error.message)
        }
      })
    }
  }

  changeType(event: any){
    this.selectedCountry = event.target.value
    console.log(this.selectedCountry)
  }

  removeAvatar(): void{
    this.avatarSource = "assets/default_avatar.png"
    this.removedAvatar = true
  }

}
