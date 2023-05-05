import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private userService: UserService){}
  
  @Input() id?: number
  canEdit: boolean = false
  user?: User
  isAdmin:boolean = false
  avatarSource: string = ''

  ngOnInit(): void {
    this.userService.getUser(this.id).subscribe({
      next: (user: User) => 
      {
        console.log(user)
        this.user = user
        if(this.user.username === this.authService.loggedUser?.sub)
          this.canEdit = true;
        this.avatarSource = this.user.avatar.split('src\\')[1]
      },
      error: () => {}
    })   
  };
}
