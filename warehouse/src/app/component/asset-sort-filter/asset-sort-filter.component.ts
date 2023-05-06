import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-asset-sort-filter',
  templateUrl: './asset-sort-filter.component.html',
  styleUrls: ['./asset-sort-filter.component.css']
})
export class AssetSortFilterComponent {

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
