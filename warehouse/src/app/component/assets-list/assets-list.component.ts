import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
    public authService: AuthenticationService){}

  assets: Asset[] = []
  assetsExist?: boolean
  public numberOfItems: number = 0
  loaded: boolean = false

  @Input() id?: number = 0
  @Input() assetType?: string = ""
  
  ngOnChanges(): void {
    console.log("Sending request to fetch assets...")
    this.assetService.getAssets(this.id, this.assetType).subscribe({
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
  }
  
}
