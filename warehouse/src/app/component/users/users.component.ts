import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService){}
  
  users: User[] = []
  loaded: boolean = false
  
  ngOnInit(): void {
    this.userService.getAllActiveUsers().subscribe({
      next: (loadedUsers: User[]) => 
      {
        this.users = loadedUsers
        this.loaded = true
      },
      error: () => {}
    })
  }

}
