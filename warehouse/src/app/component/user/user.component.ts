import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthenticationService,
    private userService: UserService){}
 
    private routeSub: Subscription = new Subscription;

  id?: number
  username?: string
  user?: User
  isUserLoaded: boolean = false;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']

      this.userService.getUser(this.id).subscribe({
        next: (user: User) => 
        {
          this.username = user.username
          this.isUserLoaded = true;
        },
        error: () => {}
      })
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
