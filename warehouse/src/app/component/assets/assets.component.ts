import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetsListComponent } from '../assets-list/assets-list.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}
  
  @ViewChild('asset-list') assets!: AssetsListComponent;
  routeSub: Subscription = new Subscription;
  assetType: string = ""

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.assetType = params['type']
    })
  }

  gOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
