import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    private authService: AuthenticationService){}
 
    private routeSub: Subscription = new Subscription;

  user?: User
  canEdit: boolean = false;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) 
      console.log(params['id'])
      this.userService.getUser(params['id']).subscribe({
        next: (user: User) => 
        {
          this.user = user
          console.log(this.user)
          if(params['id'] == this.authService.loggedUser?.id)
            this.canEdit = true;
        },
        error: () => {}
      })

      
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
