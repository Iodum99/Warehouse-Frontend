import { Component, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-sort-filter',
  templateUrl: './user-sort-filter.component.html',
  styleUrls: ['./user-sort-filter.component.css']
})
export class UserSortFilterComponent implements OnChanges {

  constructor(
    public authService: AuthenticationService,
    private userSerice: UserService,
    private route: ActivatedRoute,
    private router: Router){}

    filterText: string = ""

    ngOnChanges(): void {
      this.route.queryParams.subscribe((queryParams:any) => { 
        if(queryParams.filterByText) this.filterText = queryParams.filterByText
        
      })
  }

  changeQuery(event: any) {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: 
      {  
        sortBy: event.target.value
      }
    });
  }

  changeTextQuery() {
    if(this.filterText != ''){
      this.router.navigate(['.'], { relativeTo: this.route,
        queryParams: 
        {  
          filterByText: this.filterText
        },
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate(['.'], { relativeTo: this.route,
        queryParams: 
        {  
          filterByText: null
        },
        queryParamsHandling: 'merge'
      });
    }
    
  }

}
