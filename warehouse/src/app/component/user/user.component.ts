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
    private userService: UserService,
    private authService: AuthenticationService){}
 
    private routeSub: Subscription = new Subscription;

  id?: number

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) 
      console.log(params['id'])
      this.id = params['id']
      
      
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
