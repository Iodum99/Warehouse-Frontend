import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute){}
  
  users: User[] = []
  loaded: boolean = false
  sortByParam: string = ""
  
  ngOnInit(): void {

    this.route.queryParams.subscribe((queryParams:any) => {

      if(queryParams.sortBy)
        this.sortByParam = queryParams.sortBy;
      else
        this.sortByParam = "username_asc"

      this.userService.getAllActiveUsers(this.sortByParam).subscribe({
        next: (loadedUsers: User[]) => 
        {
          this.users = loadedUsers
          this.loaded = true
        },
        error:(error) => {alert(error.error.message)}
      }) 
     });  
  }

}
