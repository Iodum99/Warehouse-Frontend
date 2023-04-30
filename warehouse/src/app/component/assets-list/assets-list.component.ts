import { Component, Input, OnInit } from '@angular/core';
import { AssetListView } from 'src/app/model/asset-list-view';
import { AssetService } from 'src/app/service/asset.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.css']
})
export class AssetsListComponent implements OnInit {

  constructor(
    private assetService: AssetService,
    public authService: AuthenticationService){}

  assets: AssetListView[] = []
  assetsExist: boolean  = true
  public numberOfItems: number = 0
  loaded: boolean = false

  @Input() id?: number = 0
  @Input() assetType?: string = ""
  
  ngOnInit(): void {
    console.log("Sending request to fetch assets...")
    this.assetService.getAssets(this.id, this.assetType).subscribe({
      next: (loadedAssets: AssetListView[]) => 
      {
        console.log("Got Assets!")
        this.assets = loadedAssets;
        
        if(this.assets.length < 1){
          this.assetsExist = false
        }  
        this.numberOfItems = this.assets.length
        this.loaded = true
        console.log(this.assets)
      },
      error: () => {}
    })   
  }
  

}
