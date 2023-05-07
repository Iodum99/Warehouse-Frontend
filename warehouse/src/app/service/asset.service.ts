import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment.development';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient, private helperService: HelperService) { }

  public getAssets(authorId: any, type: any, sort: string): Observable<any>{
    
    let params = this.helperService.getQueryParams(sort)
    
    if(authorId != 0)
      return this.http.get(environment.baseUrlAssetService + "/user/" + authorId + "/type/" + type, {params});
    else
      return this.http.get(environment.baseUrlAssetService + "/type/" + type, {params} );
  }

  public getAssetById(id: number): Observable<any>{
    return this.http.get(environment.baseUrlAssetService + "/" + id);  
  }

  public increaseDownloadsCount(id: number): Observable<any>{
    return this.http.put(environment.baseUrlAssetService + "/downloads/" + id, null);  
  }

  public manageLikes(assetId: number, userId: number): Observable<any>{
    return this.http.put(environment.baseUrlAssetService + "/likes/" + assetId + "_" + userId, null);  
  }

  public getFavoriteAssets(id: any): Observable<any>{
    return this.http.get(environment.baseUrlAssetService + "/favorites/" + id);  
  }

  public uploadAsset(data: FormData): Observable<any>{
    return this.http.post(environment.baseUrlAssetService, data)
  }

  public updateAsset(data: FormData): Observable<any>{
    return this.http.put(environment.baseUrlAssetService, data)
  }

  public deleteAsset(id: number): Observable<any>{
    return this.http.delete(environment.baseUrlAssetService + "/" + id)
  }

}
