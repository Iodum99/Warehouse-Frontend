import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AssetService } from 'src/app/service/asset.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';
import { AssetType } from 'src/app/model/asset-type';
import { Asset } from 'src/app/model/asset';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent{

  constructor(
    private authService: AuthenticationService,
    private assetService: AssetService,
    private router: Router) { }
  
  id?: number
  user?: User
  assetName: string = ""
  assetDescription: string = ""
  assetType: string = ""
  tags: string[] = []
  newTag: string = ""
  nameError: string = ""
  fileError: string = ""
  imageError: string = ""
  assetTypeError: string = ""
  error: boolean = false

  file: any
  image: any
  gallery: File[] = []

  imageSrc: string = ""
  gallerySrc: string[] = []
  counter: number = 0

  types = AssetType;

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0)
      this.fileError = ""
    }
  }

  onImageInput(images: FileList | null): void {
    if (images) {
      this.image = images.item(0)
      
      if(this.image != null)
      this.imageSrc = URL.createObjectURL(this.image)
      
      this.imageError = ""
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

  upload(): void{

    this.validate()
  
    if(this.assetName != "" && this.assetType != "" && this.image != null && this.file != null) {
      var asset = {
        userId: this.authService.loggedUser?.id,
        name: this.assetName,
        description: this.assetDescription,
        assetType: this.assetType.toUpperCase(),
        tags: this.tags
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

      this.assetService.uploadAsset(formData).subscribe({
        next:(asset: Asset) => 
        { 
          alertify.notify("File Successfully Uploaded!", "", 5)
          this.router.navigate(['/asset/' + asset.id])
        },
        error:() => {}
      })
    }
  }

  validate(){
    
    if(this.assetName == "") {
      this.nameError = "Please enter a name for this asset..."
    }
    
    if (this.assetType == ""){
      this.assetTypeError = "Please select a type"
    }
    if (this.image == null){
      this.imageError = "Please select a main image for this asset..."
    }
    
    if(this.file == null){
      this.fileError = "Please select a zipped archive to upload..."
    }
  
  }

  addTag(newTag: string){
    if(newTag != "")
      this.tags.push(newTag)
  }

  removeTag(id: number){
    this.tags.splice(id,)
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

  changeType(event: any){
    this.assetType = event.target.value
    if(this.assetType != "")
      this.assetTypeError = ""
  }

}
