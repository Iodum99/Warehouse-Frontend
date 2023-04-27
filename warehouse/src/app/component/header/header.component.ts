import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    public authService: AuthenticationService){}

    user?: User
    loaded: boolean = false

    ngOnInit(): void {
      if(this.authService.token != null){ 
        console.log("Loading user.....")
        this.userService.getUser(this.authService.loggedUser?.id).subscribe({
          next: (user: User) => 
          {
            console.log("Loaded user!")
            this.user = user
            this.loaded = true
          },
          error: () => {}
        })     
      }
    } 
}
