import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router){}

  username?: string;
  password?: string;
  submitted: boolean = false
  invalid: boolean = false
  error: string = ""

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login(): void{
    this.submitted = true
    if(this.loginForm.valid){

      var loginData = {
        username: this.username,
        password: this.password
        
      }
      console.log(loginData);
      this.authService.login(loginData).subscribe(
        {
          error: (response) => 
          { 
            if(response.error.message == "LOCKED" || response.error.message == "BAD_CREDENTIALS" || response.error.message == "DISABLED") 
              this.error = response.error.description
           else
            this.error = "Internal Error"
            this.invalid = true
            
          },
          next: () => {
            window.location.href="http://localhost:4200"
          }
        }
      )
      
    }
  }

}
