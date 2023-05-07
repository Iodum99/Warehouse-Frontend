import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-user-sort-filter',
  templateUrl: './user-sort-filter.component.html',
  styleUrls: ['./user-sort-filter.component.css']
})
export class UserSortFilterComponent {

  constructor(
    public authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router){}

  changeQuery(event: any) {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: 
      {  
        sortBy: event.target.value
      }
    });
  }

}
