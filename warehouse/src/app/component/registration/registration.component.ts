import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/service/registration.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private registrationService: RegistrationService) { }

  username?: string
  password?: string
  confirmPassword?: string
  email?: string
  registrationSuccess?: boolean
  submitted?: boolean

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9.]{4,9}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
    confirmPassword: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.submitted = false
    this.registrationSuccess = false
  }

  register(): void {
    this.submitted = true;
    if (this.registrationForm.valid && (this.password === this.confirmPassword)) {
      var newUser = {
        username: this.username,
        password: this.password,
        email: this.email
      }

      console.log(newUser)

      this.registrationService.createUser(newUser).subscribe({
        next: () => {
          this.registrationSuccess = true
        },
        error: (response) => {
          console.log(response)
          alertify.notify(response.error.message, "", 5)
        }
      })
    }
  }

}
