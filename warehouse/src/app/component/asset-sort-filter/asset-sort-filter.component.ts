import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FilterData } from 'src/app/model/filter-data';
import { AssetService } from 'src/app/service/asset.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-asset-sort-filter',
  templateUrl: './asset-sort-filter.component.html',
  styleUrls: ['./asset-sort-filter.component.css']
})
export class AssetSortFilterComponent implements OnChanges {

  constructor(
    public authService: AuthenticationService,
    private assetService: AssetService,
    private route: ActivatedRoute,
    private router: Router){}

    routeSub: Subscription = new Subscription;
    @Input() assetType?: string = ""
    filterText: string = ""
    tags: string[] = []
    extensions: string[] = []
    
    selectedExtensions: string[] = []

    ngOnChanges(): void {
      this.route.queryParams.subscribe((queryParams:any) => { 
        console.log("On change Extensions:")
        console.log(this.selectedExtensions)
        
        if(queryParams.filterByText) this.filterText = queryParams.filterByText
        
       
        this.assetService.getExtensionsAndTags(this.assetType).subscribe({
          next:(data: FilterData) => 
          {
            this.tags = data.tags
            this.extensions = data.extensions
            console.log(data)
          },
          error:() => {}

          })
      })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  changeSortQuery(event: any) {
    
    this.router.navigate(['.'], { relativeTo: this.route, 
      queryParams: 
      {  
        sortBy: event.target.value
      },
      queryParamsHandling: 'merge'
    });
  }

  changeTextQuery() {
    this.router.navigate(['.'], { relativeTo: this.route,
      queryParams: 
      {  
        filterByText: this.filterText
      },
      queryParamsHandling: 'merge'
    });
  }

  changeTagQuery(event: any) {
    this.router.navigate(['.'], { relativeTo: this.route, 
      queryParams: 
      {  
        filterByTags: event.target.value
      },
      queryParamsHandling: 'merge'
    });
  }

  changeExtensionQuery(event: any, extension: string) {
    if(event.target.checked){
      this.selectedExtensions.push(extension)
      this.router.navigate(['.'], { relativeTo: this.route, 
        queryParams: 
        {  
          filterByExtensions: this.selectedExtensions
        },
        queryParamsHandling: 'merge',
      });
    } else {
      var index = this.selectedExtensions.indexOf(extension)
      this.selectedExtensions.splice(index,1)
      this.router.navigate(['.'], { relativeTo: this.route, 
        queryParams: 
        {  
          filterByExtensions: this.selectedExtensions
        },
        queryParamsHandling: 'merge'
      });
    }
  }

}
