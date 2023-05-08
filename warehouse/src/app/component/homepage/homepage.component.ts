import { Component, OnInit } from '@angular/core';
import { Asset } from 'src/app/model/asset';
import { AssetService } from 'src/app/service/asset.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private assetService: AssetService,
    public authService: AuthenticationService){}

  popularAssets: Asset[] = []
  newestAssets: Asset[] = []
  
  ngOnInit(): void {
    this.assetService.getPopularAssets().subscribe({
      next:(popularAssets: Asset[]) => {
        this.popularAssets = popularAssets
        this.assetService.getRecentAssets().subscribe({
          next: (newestAssets: Asset[]) => {
            this.newestAssets = newestAssets
            console.log(this.newestAssets)
            console.log(this.popularAssets)
          },
          error: (error) => {alert(error.error.message)}
        })
      },
        error: (error) => {alert(error.error.message)}
    })
  }

  truncate(index: number, assets: Asset[]): string {
    if(assets[index].description.length > 100)
      return assets[index].description.slice(0, 100) + '...'
    else
      return assets[index].description
  }

}
