import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { countries } from 'src/app/model/countries-list';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router){}

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
