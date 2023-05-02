import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  public getAssets(authorId: any, type: any): Observable<any>{
    if(authorId != 0)
      return this.http.get(environment.baseUrlAssetService + "/user/" + authorId + "/type/" + type );
    else
      return this.http.get(environment.baseUrlAssetService + "/type/" + type);
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

}
