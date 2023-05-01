import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Asset } from 'src/app/model/asset';
import { AssetService } from 'src/app/service/asset.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnInit {

  constructor(
    private assetService: AssetService,
    public authService: AuthenticationService,
    private route: ActivatedRoute){}
    
    routeSub: Subscription = new Subscription;
    asset: Asset = new Asset()
    loaded: boolean = false
    edited: boolean = false
    path: string[] = []
    file: string = ""

    
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.assetService.getAssetById(params['id']).subscribe({
        next: (loadedAsset: Asset) => 
        {
          this.asset = loadedAsset;
          console.log(this.asset)
          
          let path: string[] = this.asset.filePath.split("src", 2)
          this.asset.filePath = path[1]
          this.file = this.asset.filePath.replace(/^.*[\\\/]/, '')
      
          if(this.asset.lastModifiedDate != null)
          
          this.edited = true
          this.loaded = true
        },
        error: () => {}
      })
    })
  }

  download(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '.' + this.asset.filePath);
    link.setAttribute('download', this.file);
    document.body.appendChild(link);
    link.click();
    link.remove();

    this.assetService.increaseDownloadsCount(this.asset.id).subscribe()
}

}
