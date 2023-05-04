import { Component, Input, OnInit } from '@angular/core';
import { Asset } from 'src/app/model/asset';
import { AssetService } from 'src/app/service/asset.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-favorite-assets',
  templateUrl: './favorite-assets.component.html',
  styleUrls: ['./favorite-assets.component.css']
})
export class FavoriteAssetsComponent implements OnInit {

  constructor(
    private assetService: AssetService,
    public authService: AuthenticationService){}

  assets: Asset[] = []
  assetsExist: boolean  = true
  public numberOfItems: number = 0
  loaded: boolean = false

  @Input() id?: number = 0
  
  ngOnInit(): void {
    this.assetService.getFavoriteAssets(this.id).subscribe({
      next: (loadedAssets: Asset[]) => 
      {
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

  removeLike(assetId: number, index: number){
    this.assetService.manageLikes(assetId, this.authService.loggedUser?.id).subscribe({
      next:() => {
        alertify.error("Removed this asset from your favorites... :(")
        this.assets.splice(index, 1)
        if(this.assets.length == 0){
          this.assetsExist = false
        }
      },
      error:() => {}
    })
  }

}
