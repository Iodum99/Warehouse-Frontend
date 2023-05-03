import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssetType } from 'src/app/model/asset-type';
import { User } from 'src/app/model/user';
import { AssetService } from 'src/app/service/asset.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent{

  constructor(
    private authService: AuthenticationService,
    private assetService: AssetService) { }
 
  id?: number
  user?: User
  assetName: string = ""
  assetDescription: string = ""
  assetType: AssetType = AssetType.OBJECT
  error: string = ""

  file: any
  image: any
  gallery: any

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0)
      console.log("File: \n")
      console.log(this.file)
    }
  }

  onImageInput(images: FileList | null): void {
    if (images) {
      this.image = images.item(0)
      console.log("Image: \n")
      console.log(this.image)
    }
  }

  onGalleryInput(gallery: FileList | null): void {
    if (gallery && gallery.length < 4) {
      this.gallery = gallery
      console.log("Gallery: \n")
      console.log(this.gallery)
    } else alert("You can only select 3 images")
  }

  upload(): void{
    if(this.file == null){
      this.error = "Please select a zipped archive to upload..."
    }
    else if (this.image == null){
      this.error = "Please select a main image for this asset..."
    }
    else {

      var asset = {
        userId: this.authService.loggedUser?.id,
        name: this.assetName,
        description: this.assetDescription,
        assetType: this.assetType
      }

      const formData: FormData = new FormData();
      formData.append('asset', new Blob([JSON.stringify(asset)],{type: "application/json"}))
      formData.append('file',  this.file)
      formData.append('image', this.image)

      if(this.gallery != null){
        for(let i=0;i<this.gallery.length;i++){
          formData.append('gallery', this.gallery[i]);
        } 
      }

      this.assetService.uploadAsset(formData).subscribe({
        next:() => {},
        error:() => {}
      })

    }
  }

}
