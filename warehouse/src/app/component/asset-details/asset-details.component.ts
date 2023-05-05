import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Asset } from 'src/app/model/asset';
import { AssetService } from 'src/app/service/asset.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import * as alertify from 'alertifyjs'

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
    liked: boolean = false
    assetFound: boolean = true
    fileSize: string = ""

    
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.assetService.getAssetById(params['id']).subscribe({
        next: (loadedAsset: Asset) => 
        {
          this.asset = loadedAsset;
          console.log(this.asset)
          this.fileSize = this.getfileSizeString(this.asset.size)
          
          let path: string[] = this.asset.filePath.split("src", 2)
          this.asset.filePath = path[1]
          this.file = this.asset.filePath.replace(/^.*[\\\/]/, '')
      
          if(this.asset.lastModifiedDate != null){
            this.edited = true
          }
              
          if(this.asset.userIdLikes.length > 0){
            if(this.asset.userIdLikes.includes(this.authService.loggedUser?.id))
              this.liked = true
          }
                  
          this.loaded = true
        },
        error: (error) => {
          if(error.error.statusCode == 404)
            this.assetFound = false
        }
      })
    })
  }

  getfileSizeString(size: number): string{
    var sizeString = ""
    if ( size < 1000)
        sizeString = size + " bytes";
    else if(size < 1000000)
        sizeString = size/1000 + " kb";
    else 
        sizeString = size/1000000 + " Mb";
    return sizeString;
  }

  download(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '.' + this.asset.filePath);
    link.setAttribute('download', this.file);
    document.body.appendChild(link);
    link.click();
    link.remove();

    this.assetService.increaseDownloadsCount(this.asset.id).subscribe({
      next:() => 
      {
        this.ngOnInit() 
      },
      error:() => {}
    }
    )
  }

  like(){
    this.assetService.manageLikes(this.asset.id, this.authService.loggedUser?.id).subscribe({
      next:() => 
      {
        if(!this.asset.userIdLikes.includes(this.authService.loggedUser?.id)){
          alertify.success("Added this asset to favorites!")
          this.liked = true
        } else {
          alertify.error("Removed this asset from your favorites... :(")
          this.liked = false
        }
        this.ngOnInit() 
      },
      error:() => {}
    })
  }

  deleteAsset(): void{
    this.assetService.deleteAsset(this.asset.id).subscribe(() => {
      window.location.href='http://localhost:4200/' + this.asset.assetType
    })
  }

}
