import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asset } from 'src/app/model/asset';
import { AssetService } from 'src/app/service/asset.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.css']
})
export class AssetsListComponent implements OnChanges {

  constructor(
    private assetService: AssetService,
    public authService: AuthenticationService,
    private route: ActivatedRoute){}

  assets: Asset[] = []
  assetsExist?: boolean
  public numberOfItems: number = 0
  loaded: boolean = false
  
  @Input() id?: number = 0
  @Input() assetType?: string = ""
  
  ngOnChanges(): void {

    this.route.queryParams.subscribe((queryParams:any) => {

      console.log("Sending request to fetch assets...")
      this.assetService.getAssets(this.id, this.assetType, queryParams).subscribe({
      next: (loadedAssets: Asset[]) => 
      {
        console.log("Got Assets!")
        this.assets = loadedAssets;
        
        if(this.assets.length < 1){
          this.assetsExist = false
        } else {
          this.assetsExist = true
        } 
        this.numberOfItems = this.assets.length
        this.loaded = true
        
        console.log(this.assets)

      },
      error: () => {}
    }) 
     })

      
  }

  truncate(index: number): string {
    if(this.assets[index].description.length > 100)
      return this.assets[index].description.slice(0, 100) + '...'
    else
      return this.assets[index].description
  }
  
  
}
