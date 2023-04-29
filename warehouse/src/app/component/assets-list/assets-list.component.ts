import { Component, Input, OnInit } from '@angular/core';
import { AssetListView } from 'src/app/model/asset-list-view';
import { AssetService } from 'src/app/service/asset.service';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.css']
})
export class AssetsListComponent implements OnInit {

  constructor(private assetService: AssetService){}
  assets: AssetListView[] = []
  noAssetsFound: boolean = false

  @Input() id?: number = 0
  
  ngOnInit(): void {
    this.assetService.getAssets(this.id).subscribe({
      next: (loadedAssets: AssetListView[]) => 
      {
        this.assets = loadedAssets;
        if(this.assets.length == 0)
          this.noAssetsFound = true
          
        console.log(this.assets)
      },
      error: () => {}
    })   
  }
  

}
