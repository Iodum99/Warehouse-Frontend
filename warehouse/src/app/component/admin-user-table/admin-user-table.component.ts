import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
  styleUrls: ['./admin-user-table.component.css']
})
export class AdminUserTableComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router){}
  
  users: User[] = []
  loaded: boolean = false
  sortByParam: string = ""
  selectedId: number = 0
  
  ngOnInit() {
    this.route.queryParams.subscribe((queryParams:any) => {

      this.router.events.subscribe(data => {
        if (data instanceof ActivationStart) {
          console.log(`Custom data`, data.snapshot.data);
        }
      });

      var isAdmin;
      (this.authService.loggedUser?.role == "ADMIN")? isAdmin = true : isAdmin = false
      
      this.userService.getAllUsers(queryParams, isAdmin).subscribe({
        next: (loadedUsers: User[]) => 
        {
          this.users = loadedUsers
          this.loaded = true
          console.log(loadedUsers)
        },
        error:(error) => {alert(error.error.message)}
      }) 
     });  
  }

  suspendUser(index: number, username: string){
    console.log(index)
    this.userService.toggleSuspension(index).subscribe({
      next:() => {
        alertify.error("Suspended " + username)
        this.redirectTo('/admin/users')
      },
      error: (response) => {alert(response.error.message)}
    })
  }

  activateUser(index: number, username: string){
    console.log(index)
    this.userService.toggleSuspension(index).subscribe({
      next:() => {
        alertify.success("Activated " + username)
        this.redirectTo('/admin/users')
      },
      error: (response) => {alert(response.error.message)}
    })
  }

  deleteUser(index: number, username: string){
    if(confirm("Are you sure you want to DELETE " + username +" ?")){

      this.userService.deleteUser(index).subscribe({
        next:() => {
          
          alertify.error("Deleted " + username)
          this.redirectTo('/admin/users')
        },
        error: (response) => {alert(response.error.message)}
      })

    }
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}

