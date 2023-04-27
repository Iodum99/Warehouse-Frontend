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
    private authenticationService: AuthenticationService,
    private userService: UserService){}
  
  @Input() id?: number
  canEdit: boolean = false
  isUserLoaded: boolean = false
  user?: User

  ngOnInit(): void {
    this.userService.getUser(this.id).subscribe({
      next: (user: User) => 
      {
        this.user = user
        this.isUserLoaded = true
        if(this.user.username === this.authenticationService.loggedUser?.sub)
          this.canEdit = true;
      },
      error: () => {}
    })   
  };
}
