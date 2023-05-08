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
    @Input() id?: number = 0
    filterText: string = ""
    tags: string[] = []
    extensions: string[] = []
    
    selectedExtensions: string[] = []
    selectedTags: string[] = []

    ngOnChanges(): void {
      this.route.queryParams.subscribe((queryParams:any) => { 
        if(queryParams.filterByText) this.filterText = queryParams.filterByText
        
        this.assetService.getExtensionsAndTags(this.assetType, this.id).subscribe({
          next:(data: FilterData) => 
          {
            this.tags = data.tags
            this.extensions = data.extensions
          },
          error:(error) => {alert(error.error.message)}

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
    if(this.filterText != ""){
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

  changeTagQuery(event: any, tag: string) {
    if(event.target.checked){
      this.selectedTags.push(tag)
      this.router.navigate(['.'], { relativeTo: this.route, 
        queryParams: 
        {  
          filterByTags: this.selectedTags
        },
        queryParamsHandling: 'merge',
      });
    } else {
      var index = this.selectedTags.indexOf(tag)
      this.selectedTags.splice(index,1)
      this.router.navigate(['.'], { relativeTo: this.route, 
        queryParams: 
        {  
          filterByTags: this.selectedTags
        },
        queryParamsHandling: 'merge'
      });
    }
  }

}
