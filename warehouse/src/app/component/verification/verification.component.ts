import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit{

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService){}
 
    private routeSub: Subscription = new Subscription;

    id?: number
    successfulVerif: boolean = false

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']

      this.userService.verify(this.id).subscribe({
        next: () => 
        {
          this.successfulVerif = true;
        },
        error: () => {}
      })
    });
  }

}
