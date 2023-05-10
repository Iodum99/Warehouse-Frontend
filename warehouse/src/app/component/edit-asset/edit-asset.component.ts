import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset } from 'src/app/model/asset';
import { AssetService } from 'src/app/service/asset.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AssetType } from 'src/app/model/asset-type';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit {

  constructor(
    private assetService: AssetService,
    public authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router){}

    routeSub: Subscription = new Subscription;
    asset: Asset = new Asset()

    assetName: string = ""
    assetDescription: string = ""
    tags: string[] = []
    newTag: string = ""
    nameError: string = ""

    file: any
    image: any
    gallery: File[] = []
  
    imageSrc: string = ""
    gallerySrc: string[] = []
    counter: number = 0
  
    types = AssetType;
  
    ngOnInit(): void {
      this.routeSub = this.route.params.subscribe(params => {
        this.assetService.getAssetById(params['id']).subscribe({
          next: (loadedAsset: Asset) => 
          {
            this.asset = loadedAsset;
            console.log(this.asset)

            this.assetName = this.asset.name
            this.assetDescription = this.asset.description
            this.tags = this.asset.tags
            this.file = this.asset.filePath
          },
          error: () => {}
        })
      })   
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0)
      console.log(this.file)
    }
  }

  onImageInput(images: FileList | null): void {
    if (images) {
      this.image = images.item(0)
      
      if(this.image != null)
      this.imageSrc = URL.createObjectURL(this.image)   
    }
  }

  onGalleryInput(gallery: FileList | null): void {
    if (gallery && gallery.length < 6 && this.gallery.length < 6) {
        this.counter = this.gallery.length
        for(let i=0; i<gallery.length; i++){

          if(this.gallery.length == 5){
            alertify.notify("You can select up to 5 pictures!", "", 5)
            return
          }
          this.gallerySrc.push(URL.createObjectURL(gallery[i]))
          this.gallery.push(gallery[i]) 
        }
        console.log(this.gallery)
    } else {
      alertify.notify("You can select up to 5 pictures!", "", 5)
      this.gallery = []
    } 
  }

  update(): void{

    this.validate()
  
    if(this.assetName != "") {
      var asset = {
        
        id: this.asset.id,
        userId: this.authService.loggedUser?.id,
        author: this.asset.author,
        name: this.assetName,
        description: this.assetDescription,
        assetType: this.asset.assetType,
        tags: this.tags,
        uploadDate: this.asset.uploadDate,
        filePath: this.asset.filePath,
        imagePaths: this.asset.imagePaths,
        userIdLikes: this.asset.userIdLikes,
        downloads: this.asset.downloads,
        lastModifiedDate: this.asset.lastModifiedDate,
        extensions: this.asset.extensions,
        size: this.asset.size
      }
      console.log(asset)

      const formData: FormData = new FormData();
      formData.append('asset', new Blob([JSON.stringify(asset)],{type: "application/json"}))
      formData.append('file',  this.file)
      formData.append('image', this.image)

      if(this.gallery != null){
        for(let i=0;i<this.gallery.length;i++){
          formData.append('gallery', this.gallery[i]);
        } 
      }

      this.assetService.updateAsset(formData).subscribe({
        next:() => 
        { 
         alertify.notify("File Successfully Updated!", "", 5)
         window.location.href="http://localhost:4200/asset/" + this.asset.id
        },
        error:(response) => {
  
          alertify.error(response.error.message)
        }
      })
    }
  }

  validate(){
    
    if(this.assetName == "") {
      this.nameError = "Please enter a name for this asset..."
    }
    
  }

  addTag(newTag: string){
    if(newTag != "")
      this.tags.push(newTag)
  }

  removeTag(id: number){
    this.tags.splice(id,1)
  }

  removeImage(){
    this.image = null
  }

  removeGalleryImage(index: number){
    this.gallerySrc.splice(index, 1)
    this.gallery.splice(index, 1)
    console.log("Removed")
  }

  updateName(){
    this.nameError = ""
  }

}
